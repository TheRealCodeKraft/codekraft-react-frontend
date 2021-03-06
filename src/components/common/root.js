var React = require("react")
import { connect } from 'react-redux'

import {Switch, Route} from "react-router"

import AuthChecker from '../utils/auth-checker'
import CheckForAcls from '../utils/check-for-acls'

import AdminPage from '../admin/utils/admin-page'
import NotFound from './not-found'

export default function(name, config) {

  class Root extends React.Component {

    constructor(props) {
      super(props)
      this.state = {}
    }

    componentWillMount() {

      if (this.props.location.search.indexOf("stamp") !== -1) {
				const Auth = this.props.clients.ApiClient
				const UserClient = this.props.clients.UserClient
				var splitted = this.props.location.search.replace("?", "").split("&")
				var emailSplit = splitted[0].split("=")
				var stampSplit = splitted[1].split("=")
				Auth.login({email: emailSplit[1], password: stampSplit[1]}, (data) => {
					UserClient.me()
					if (data.error) {
						this.props.history.push("/")
					} else {
						this.props.history.push(this.props.location.pathname)
					}
				})
			}

      var groups = config.menu
      var pages = [], pageIndex=0
      for (var index in groups) {
        if (groups[index]) {
					if (groups[index].items && !groups[index].items.error) {
						for (var pIndex in groups[index].items) {
							pages.push(groups[index].items[pIndex])
							if (!(pages[pageIndex].client instanceof Object)) {
								pages[pageIndex].client = this.props.clients[pages[pageIndex].client]
							}
							pageIndex++
						}
					}

					if (groups[index].groups) {
						for (var gIndex in groups[index].groups) {
							for (var pi in groups[index].groups[gIndex].items) {
								pages.push(groups[index].groups[gIndex].items[pi])
								if (!(pages[pages.length - 1].client instanceof Object)) {
									pages[pages.length - 1].client = this.props.clients[pages[pages.length - 1].client]
								}
								pageIndex++
							}
						}
					}
        }
      }
      this.setState({pages: pages})

    }

    render() {

      var content = null
      if (this.state.me && this.state.me.temp) {
      } else {
        content = <Switch>
                   {this.state.pages.map(item => {
                     var url = config.root + ((item.route && item.route !== "") ? ((config.root !== "/" ? "/" : "") + item.route) : "")
                     var component = null
                     if (item.component) {
                       component = item.component
                     } else if (item.client) {
                       component = AdminPage(item, config)
                     }
 
                     if (component) {
  
                       if (config.grants) {
                         component = CheckForAcls(config.grants, component)
                       }

                       if (item.grants) {
                         component = CheckForAcls(item.grants, component)
                       }
 
                       if ((config.restricted || item.restricted) && !item.discardOnLogin) {
                         component = AuthChecker(component)
                       }

                       if (item.discardOnLogin) {
                         component = AuthChecker(component, true)
                       }

                       return <Route key={url} exact path={url} component={component} />

                     } else {
                       return null
                     }
                   })}
                   <Route path="*" component={NotFound} />
                 </Switch>
      }

      if (config.wrapper === null) {
        return content
      }

      if (config.wrapper) {
        return (
          <config.wrapper.component config={config.wrapper.config}>
            {content}
          </config.wrapper.component>
        )
      } else {
        return (
          <div className="Page">
          {/*<section className={config.mainSectionClass ? config.mainSectionClass : "content"}>*/}
            {content}
          {/*</section>*/}
          </div>
        );
      }
    }

  }

  return connect(mapStateToProps)(Root)

}

function mapStateToProps(state) {
  return {
		//me: state.userState.me,
    clients: state.bootstrap.clients || {},
    navigation: state.bootstrap.navigation || {dashboard: {items: []}}
  }
}

