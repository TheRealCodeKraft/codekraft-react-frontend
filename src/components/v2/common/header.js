var React = require("react")
import { connect } from 'react-redux'

import { withRouter } from 'react-router'
import { NavLink, Link, Redirect } from 'react-router-dom'

import { Navbar } from 'react-bootstrap';
import BaseHeader from '../../common/header'
import ShowForAcls from '../../utils/show-for-acls'
import HeaderLink from './header/link'

class Header extends BaseHeader {

  constructor(props) {
    super(props)
    this.state = {
      sideMenuOpen: true
    }

    this.handleShowSideMenu = this.handleShowSideMenu.bind(this)
  }

  render() {
    var menu_entries = this.buildItemsFor("default")
    var side_menu_entries = this.buildItemsFor("side")

    return (
      <div className={"header " + this.props.name + (this.state.sideMenuOpen ? " side-menu-toggle" : "")}>
  	    <header id="mu-header" className="" role="banner">
	  	    <div className="container">
		  	    <nav className="navbar navbar-default mu-navbar">
			    	    <div className="container-fluid">

				          <div className="navbar-header">
			      	      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				              <span className="sr-only">Toggle navigation</span>
				              <span className="icon-bar"></span>
    				          <span className="icon-bar"></span>
		    		          <span className="icon-bar"></span>
  				          </button>

                    <div className="side-menu-admin">
                      <button type="button" onClick={this.handleShowSideMenu}><i className={"fa fa-chevron-" + (this.state.sideMenuOpen ? "left" : "down")} /></button>
                      <ul className="side-menu">{side_menu_entries}</ul>
                    </div>
  
	  			          <Link className="navbar-brand" to="/">
                      <i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;
                      {/*<img src="/assets/img/logo-white-inline.png" height="30" style={{display: "inline-block"}} /> */}
                      {this.props.mainTitle ? this.props.mainTitle : "CodeKraft Boiler"}
                    </Link>

	  			        </div>

		  		        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			  	          	<ul className="nav navbar-nav mu-menu navbar-right">
                        {menu_entries}
				        	    </ul>
				          </div>

  			  	    </div>
	  		    </nav>
		      </div>
	      </header>
      	<section id="mu-hero">
		      <div className="container">
      			<div className="row">

      				<div className="col-md-6 col-sm-6 col-sm-push-6">
      					<div className="mu-hero-right" style={{marginTop: 0}}>
      					</div>
      				</div>

			      	<div className="col-md-6 col-sm-6 col-sm-pull-6">
      					<div className="mu-hero-left">
			      			<h2><i className="fa fa-chevron-right" /> {this.props.name}</h2>
      					</div>
			      	</div>	

      			</div>
      		</div>
      	</section>
      </div>
    )
  }

  buildItem(nav, item, route) {
    return <HeaderLink item={item} pathname={this.props.location.pathname} route={route} active={this.props.location.pathname === route} />
  }
      
  handleShowSideMenu() {
    this.setState({sideMenuOpen: !this.state.sideMenuOpen})
  }
}

export default Header
