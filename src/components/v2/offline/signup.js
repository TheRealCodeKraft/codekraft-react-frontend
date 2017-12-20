import React from "react"

import { Link } from 'react-router-dom'
import SignupForm from "../../offline/signup"

class Signup extends React.Component {
  render() {
    return (
      <div className="signup">
      <section id="mu-hero">
		    <div className="container">
			    <div className="row">

				<div className="col-md-6 col-sm-6 col-sm-push-6 mu-contact-form">
          <SignupForm labels="off" showLoseLinks={false} submitClass="mu-primary-btn submit" />
				</div>

				<div className="col-md-6 col-sm-6 col-sm-pull-6">
					<div className="mu-hero-left">
						<h1>Inscrivez-vous !</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam saepe, recusandae quidem nulla! Eveniet explicabo perferendis aut, ab quos omnis labore laboriosam quisquam hic deserunt ipsum maxime aspernatur velit impedit.</p>
						<Link to="/login" className="mu-primary-btn">J'ai déjà un compte</Link>
						<span>* Service disponible uniquement pour les foyers concernés</span>
					</div>
				</div>	

			</div>
		</div>

      </section>
		<section id="mu-counter">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="mu-counter-area">

							<div className="mu-counter-block">
								<div className="row">

									<div className="col-md-3 col-sm-6">
										<div className="mu-single-counter">
											<i className="fa fa-building-o" aria-hidden="true"></i>
											<div className="counter-value" data-count="650">370</div>
											<h5 className="mu-counter-name">Bâtiments</h5>
										</div>
									</div>

									<div className="col-md-3 col-sm-6">
										<div className="mu-single-counter">
											<i className="fa fa-home" aria-hidden="true"></i>
											<div className="counter-value" data-count="422">5k</div>
											<h5 className="mu-counter-name">Logements</h5>
										</div>
									</div>

									<div className="col-md-3 col-sm-6">
										<div className="mu-single-counter">
											<i className="fa fa-users" aria-hidden="true"></i>
											<div className="counter-value" data-count="1055">12k</div>
											<h5 className="mu-counter-name">Connectés</h5>
										</div>
									</div>

									<div className="col-md-3 col-sm-6">
										<div className="mu-single-counter">
											<i className="fa fa-trophy" aria-hidden="true"></i>
											<div className="counter-value" data-count="03">0</div>
											<h5 className="mu-counter-name">Got Awards</h5>
										</div>
									</div>

								</div>
							</div>


						</div>
					</div>
				</div>
			</div>
		</section>

		<section id="mu-video-review">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="mu-video-review-area">

							<div className="mu-heading-area">
								<h2 className="mu-heading-title">Koontoo Home c'est quoi ?</h2>
								<span className="mu-header-dot"></span>
								<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever</p>
							</div>

							<div className="mu-video-review-content">
								<iframe className="mu-video-iframe" width="100%" height="480" src="https://www.youtube.com/embed/T4ySAlBt2Ug" frameborder="0" allowfullscreen></iframe>
							</div>

						</div>
					</div>
				</div>
			</div>
		</section>


      </div>
    )
  }
}

export default Signup
