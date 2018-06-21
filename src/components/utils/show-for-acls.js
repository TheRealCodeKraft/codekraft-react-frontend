import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Show children only if acls match current user grant grant_level
 * eg :
    <ShowForAcls grants={["staff"]}>
        <OtherComponents />
        ...
    </ShowForAcls>
 * @note You can pass a needAuthenticated param to the component to check if user is logged too
 *       If your url is already protected against not connected user you can leave it ;)
 */
class ShowForAcls extends Component {
    render() {
			console.log("ACLS")
        const self = this;
        if((!this.props.authenticated && this.props.needAuthenticated === true) || !this.props.userGrant) {
            return false
        }
console.log("1")

        const found = this.props.grants ? this.props.grants.filter(gl => gl === self.props.userGrant) : ["ok"]
        if(found.length === 0) {
            return false
        }
console.log("2")
        return React.Children.only(this.props.children);
    }
}

function mapStateToProps(state) {
    return { 
        userGrant: (state.userState.me ? state.userState.me.role : null)
    };
}

export default connect(mapStateToProps, )(ShowForAcls);
