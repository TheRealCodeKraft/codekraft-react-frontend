import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Route, Switch } from 'react-router-dom'

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
		this.props.clients.UserClient.me(function(me) {
			if (me && !me.error) {
				self.props.clients.ApiClient.getToken()
			}
			self.setState({loaded: true})
		})
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
		if (!this.state.loaded) {
			return null
		}

		let CableWrapper = ({ children }) => (children)
		let url
		if (this.props.token && (this.props.config.websocket || this.props.config.websocket == undefined)) {
			CableWrapper = ActionCableProvider
			url = process.env.CABLE_URL + "/?token=" + this.props.token.access_token
		}

		let footer
		if (this.props.navigation.footer) {
			footer = (<this.props.navigation.footer />)
		}

		return (
			<this.props.navigation.mainWrapper navigation={this.props.navigation} location={this.props.location}>
				<CableWrapper url={url}>
					<Switch>
						<Route path="/dashboard" render={() => <Header menu={this.props.navigation.dashboard.menu} root={this.props.navigation.dashboard.root} custom={this.props.navigation.dashboard.header} location={this.props.location} name="dashboard" mainTitle={this.props.config.mainTitle} />} />
						<Route path="/admin" render={() => <Header menu={this.props.navigation.admin.menu} root={this.props.navigation.admin.root} custom={this.props.navigation.admin.header} location={this.props.location} admin={true} name="admin" mainTitle={this.props.config.mainTitle} />} />
						<Route path="/" render={() => <Header menu={false ? this.props.navigation.dashboard.menu : this.props.navigation.offline.menu} root={this.props.navigation.offline.root} custom={this.props.navigation.offline.header} location={this.props.location} token={this.props.token} name="offline" mainTitle={this.props.config.mainTitle} />} />
					</Switch>
				</CableWrapper>
				<CableWrapper url={url}>
					<Switch>
						<Route path="/dashboard" component={Root("dashboard", this.props.navigation.dashboard)} />
						<Route path="/admin" component={Root("admin", this.props.navigation.admin)} />
						<Route path="/" component={Root("offline", this.props.navigation.offline, this.props.location)} />
					</Switch>
				</CableWrapper>
				{footer}
			</this.props.navigation.mainWrapper>
		)
	}
}

function mapStateToProps(state) {
	return {
		clients: state.bootstrap.clients,
		token: state.authState.token || null,
		navigation: state.bootstrap.navigation,
	}
}

export default withRouter(connect(mapStateToProps)(App))
