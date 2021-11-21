// Author: Daksh Patel

import React, {Component, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Footer from '../Common/Footer';
import auth from '../../authentication/Auth';
import Loading from "../Common/Loading";

// This class returns the component of navbar when user is not logged in.
const NavBar = () => {
	useEffect(() => {
		const mainNav = document.querySelector(".main-nav");
		const navbarToggle = document.querySelector(".navbar-toggle");
		navbarToggle.addEventListener('click', () => {
			mainNav.classList.toggle('active');
		});
	});

	return (
		<header>
			<nav className="navbar light-navbar">
                <span className="navbar-toggle">
                    <i className="fas fa-bars"></i>
                </span>
				<Link to="/" className="logo"><i className="logo-icon fas fa-terminal"></i>stacklearner</Link>
				<ul className="main-nav">
					<li><a href="/" className="nav-links" aria-label="Go back to home page">Home</a></li>
					<li><Link to="/signup" className="nav-links text-link text-link-blue" aria-label="Sign up with stacklearner">Sign
						Up</Link></li>
				</ul>
			</nav>
		</header>
	);
}

// This class returns the component of signin form.

class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			confirmPassword: '',
			error: false,
			success: false,
			message: "",
			showLoading: false
		}
		// this.passwordField = React.createRef();
		this.toggleButton = React.createRef();
	}

	successCallback = (response) => {
		console.log(response);
		setTimeout(() => {
			this.setState({
				showLoading: true
			});
			setTimeout(() => {
				this.setState({
					success: true,
					message: response.data.message,
					error: false,
					showLoading: false
				});
			}, 1000);
		}, 500);
		setTimeout(() => {
			// this.setState({showLoading: true});
			this.props.history.push('/signin')
		}, 2000);
	}

	failureCallback = (error) => {
		console.log(error);
		console.log(error.response.data.message);
		this.setState({
			error: true,
			message: error.response.data.message,
			success: false
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const {password, confirmPassword} = this.state;
		if (password !== confirmPassword) {
			this.setState({message: "Password and Confirm password did not match", error: true});
		} else {
			console.log(window.location.search.split("=", 2)[1]);
			const token = window.location.search.split("=")[1];
			const body = {
				newPassword: password,
				token: token
			}
			auth.changePassword(body, this.successCallback, this.failureCallback);
		}
	}

	handleChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value,
			error: false
		});
	}

	closeBanner = (event) => {
		const bannerIcon = event.target;
		const banner = bannerIcon.parentNode;
		banner.classList.remove('visible');
		banner.classList.add('hidden');
		this.setState({
			updated: 'NotYet'
		});
	}

	render() {
		const {email, password, confirmPassword} = this.state;

		return (
			<>
				<NavBar/>
				<main className="gray-background">
					<section className="container">
						<div className="grid">
							<div className="col-md-8 col-sm-12 offset-md-2 forgotpassword-form-container">
								<h1>Create new password</h1>
								<form onSubmit={this.handleSubmit}>
									<fieldset>
										<div className="form-controls-group-outer last-form-controls-group-outer">
											<div className="form-controls-group-inner" id="forgot-password-control">
												<label htmlFor="user-password">New Password</label>
												<input type="password" name="password" id="user-password" value={password}
															 onChange={this.handleChange}
															 autoComplete="on" required disabled={this.state.success}/>
												<label htmlFor="confirm-password">Confirm Password</label>
												<input type="password" name="confirmPassword" id="confirm-password" value={confirmPassword}
															 onChange={this.handleChange}
															 autoComplete="on" required disabled={this.state.success}/>
											</div>
										</div>
									</fieldset>
									<div className="form-button-container">
										<button type="submit" className="button button-medium button-accent-outline"
														disabled={this.state.success}>Submit
										</button>
										<div className="banner-container">
											{
												this.state.showLoading ? <p><Loading message="Processing..."/></p> : null

											}
											<p
												className={this.state.success ? "visible flash-banner green-background" : "hidden"}>{this.state.message}<i
												className="fas fa-times" onClick={this.closeBanner}/></p>
											<p
												className={this.state.error ? "visible flash-banner pink-background" : "hidden"}>{this.state.message}<i
												className="fas fa-times" onClick={this.closeBanner}/></p>
										</div>
									</div>
								</form>
							</div>
						</div>
					</section>
				</main>
				<Footer/>
			</>
		);
	}
}

export default ChangePassword;
