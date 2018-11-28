import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Route, Switch } from 'react-router-dom'
import ProfileFiller from './common/profile-filler'

import ActionCableProvider from 'react-actioncable-provider'

import Header from './common/header'
import Root from './common/root'

/**
 * OBL Main App Container
 **/
class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			token: null
		}
	}

	componentWillMount() {
		var self = this
		if (!this.props.me) {
			this.props.clients.UserClient.me(function(me) {
				if (me && !me.error) {
					self.props.clients.ApiClient.getToken()
				}
				self.setState({me, loaded: true})
			})
		}
	}

	componentWillReceiveProps(props) {
		if (props.location && (props.location.pathname === '/logout' || this.props.location.pathname === '/logout')) {
			var self = this
			this.props.clients.ApiClient.logout(function(data) {
				self.props.history.push("/")
			})
		}
	}

	render() {
		if (!this.state.loaded) return null

		const cable_url = `${process.env.CABLE_URL}${this.props.token ? "/?token=" + this.props.token.access_token : ""}`

		return (
			<this.props.navigation.mainWrapper navigation={this.props.navigation} location={this.props.location}>
				  <ActionCableProvider url={cable_url}>
						<Switch>
							 <Route path="/dashboard" render={() => <Header menu={this.props.navigation.dashboard.menu} root={this.props.navigation.dashboard.root} custom={this.props.navigation.dashboard.header} location={this.props.location} name="dashboard" mainTitle={this.props.config.mainTitle} />} />
							 <Route path="/admin" render={() => <Header menu={this.props.navigation.admin.menu} root={this.props.navigation.admin.root} custom={this.props.navigation.admin.header} location={this.props.location} admin={true} name="admin" mainTitle={this.props.config.mainTitle} />} />
							 <Route path="/" render={() => <Header menu={false ? this.props.navigation.dashboard.menu : this.props.navigation.offline.menu} root={this.props.navigation.offline.root} custom={this.props.navigation.offline.header} location={this.props.location} token={this.props.token} name="offline" mainTitle={this.props.config.mainTitle} />} />
						</Switch>
					</ActionCableProvider>

				{ this.state.me.no_password
					? this.buildProfileFiller()
					: 
						  <ActionCableProvider url={cable_url}>
								 <Switch>
									 <Route path="/dashboard" component={Root("dashboard", this.props.navigation.dashboard)} />
									 <Route path="/admin" component={Root("admin", this.props.navigation.admin)} />
									 <Route path="/" component={Root("offline", this.props.navigation.offline)} />
								 </Switch>
							 </ActionCableProvider>
				}
				{this.props.navigation.footer
				 ? <this.props.navigation.footer />
				 : null}
			</this.props.navigation.mainWrapper>
		);
	}

	buildProfileFiller() {
		var Component = this.props.config.profileFiller
		if (Component) {
			return (
				<Component 
					onFinished={this._handleFillerFinished}	
				/>
			)
		} else {
			return (
				<ProfileFiller
					onFinished={this._handleFillerFinished}	
			  />
			)
		}
	}

	_handleFillerFinished = (me) => {
		this.setState({me})
	}

}

function mapStateToProps(state, ownProps) {
	var result = {
		clients: state.bootstrap.clients,
		token: state.authState.token || null,
		navigation: state.bootstrap.navigation,
	}
	/*
	console.log(ownProps)
	console.log(state)
	if (!ownProps.me || state.userState.me.id !== ownProps.me.id) {
		result.me = state.userState.me
	}
	*/
	return result
}

export default withRouter(connect(mapStateToProps)(App))
