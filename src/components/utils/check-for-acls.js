import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
 * Allow access to specifics url depending on the user grant level and the authorized ones.
 * @param array grantLevels 
 * @param {*} ComposedComponent 
 * 
 * @eg
   <Route exact path={match.url+"/stats-admin"} component={CheckForAcls(["staff_admin"], Statistic)}/>
   @eg
   Directly in a component you can do something like :
   export default translate("Statistic")(CheckForAcls(["staff"], Statistic));
 */
export default function(grantLevels, ComposedComponent) {
  class CheckForAcls extends Component {
        render() {
            const self = this;
            if(!this.props.authenticated || !this.props.userGrant) {
                return <Redirect to="/"/>
            }

            const found = grantLevels.filter(gl => gl === self.props.userGrant);
            if(found.length === 0) {
                return <Redirect to="/"/>
            }

            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return { 
            authenticated: state.userState.authenticated,
            userGrant: (state.userState.me ? state.userState.me.role : null)
        };
    }

    return connect(mapStateToProps)(CheckForAcls);
}
