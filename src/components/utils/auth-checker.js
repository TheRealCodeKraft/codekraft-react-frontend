import React from "react"
import { connect } from 'react-redux'

export default function(ComposedComponent, offline=false) {

  class AuthChecker extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        loggingIn: false,
        refreshing: false,
        resetting: false,
        checking: false,
        connectionOk: false
      }

      this.handleRefresh = this.handleRefresh.bind(this)
    }

    componentWillMount() {

      const Auth = this.props.clients.AuthClient
      const UserClient = this.props.clients.UserClient

      if (this.props.location.search.indexOf("stamp") !== -1) {
        var self = this
        this.setState({loggingIn: true}, function() {
          var splitted = this.props.location.search.replace("?", "").split("&")
          var emailSplit = splitted[0].split("=")
          var stampSplit = splitted[1].split("=")
          if (!this.props.me || this.props.me.email !== emailSplit[1]) {
            Auth.login({email: emailSplit[1], password: stampSplit[1]}, function(data) {
              UserClient.me()
/*
            if (data.error) {
              self.props.history.push("/")
            } else {
              self.setState({checking: true}, function () {
                UserClient.me()
                self.props.history.push(self.props.location.pathname)
              })
            }
*/
            })
          } else {
            this.props.history.push(this.props.location.pathname)
          }
        })
      } else if (!this.state.loggingIn) {
        if (Auth.checkForToken() === true) {
          // I HAVE A TOKEN
          if (offline) { 
            // I NEED OFFLINE GRANTS
            this.props.history.push("/dashboard") 
          }
          else { 
            // I NEED ONLINE GRANTS
            if (this.props.me === null) {
              // NOT ME DATA
              this.setState({checking: true}, function () {
                UserClient.me()
              })
            } else {
             // RESETTING ME DATA
              this.setState({resetting: true}, function() {
                UserClient.resetMe()
              })
            }
          }
        } else {
          // I HAVE NO TOKEN
          if (offline) { 
            // I NEED OFFLINE GRANTS
            this.setState({connectionOk: true}) 
          }
          else {
            // I NEED ONLINE GRANTS
            this.props.history.push('/login')
          }
        }
      }
    }

    componentWillReceiveProps(props) {
      const Auth = this.props.clients.AuthClient
      const UserClient = this.props.clients.UserClient

      if (this.state.resetting && props.me == null) {
        // SESSION HAS BEEN RESET
        this.setState({resetting: false, checking: true}, function() {
          UserClient.me()
        })
      } else if (this.state.checking) {
        // I AM CHECKING FOR ME DATA
        if (props.notFound === false) {
          // I AM LOGGED IN
          this.setState({checking: false, connectionOk: true})
        } else {
          // CONNECTION FAILED
          this.props.history.push("/login")
        }
      } else if (this.state.loggingIn && props.token) {
/*
        if (!props.token) {
          console.log("BLUP")
          Auth.getToken()
        }
        this.props.history.push(this.props.location.pathname)
*/
        this.setState({loggingIn: false})
      }
    }

    render() {
      if (!this.state.connectionOk || this.state.loggingIn === true) {
        return (
          <section className="content">
            <div className="loader-dots"></div>
          </section>
        )
        
      }

      return <ComposedComponent {...this.props} />
    }

    handleRefresh(data) {
      if (data.error) {
        const Auth = this.props.clients.AuthClient
        Auth.logout()
      }
      this.setState({refreshing: false})
    }

  }

  return connect(mapStateToProps)(AuthChecker)
}

function mapStateToProps(state) {
  return {
    me: state.userState.me,
    notFound: state.userState.notFound || false,
    token: state.authState.token || null,
    clients: state.bootstrap.clients || {}
  }
}
