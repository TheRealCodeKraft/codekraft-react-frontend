import React from "react"

export default function(item, config) {

  class Page extends React.Component {

    render() {
      return (
        <div className="login">
          <section id="mu-hero">
		        <div className="container">
			        <div className="row">

        				<div className="col-md-6 col-sm-6 col-sm-push-6 mu-contact-form">
				        </div>

        				<div className="col-md-6 col-sm-6 col-sm-pull-6">
        					<div className="mu-hero-left">
				        	</div>
        				</div>	

        			</div>
        		</div>
          </section>
          <main dangerouslySetInnerHTML={{__html: item.body}} />
        </div>
      )
    }
  }

  return Page
}
