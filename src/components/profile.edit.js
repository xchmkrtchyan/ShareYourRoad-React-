import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import CheckButton from "react-validation/build/button";
import "./profile.edit.css"

const required = value => {
	if (!value) {
	  return (
		<div className="alert alert-danger" role="alert">
		  This field is required!
		</div>
	  );
	}
  };
  
  const email = value => {
	if (!isEmail(value)) {
	  return (
		<div className="alert alert-danger" role="alert">
		  This is not a valid email.
		</div>
	  );
	}
  };
  
  const vusername = value => {
	if (value.length < 3 || value.length > 20) {
	  return (
		<div className="alert alert-danger" role="alert">
		  The username must be between 3 and 20 characters.
		</div>
	  );
	}
  };
  
  
  const vfirstname = value => {
	if (value.length < 3 || value.length > 20) {
	  return (
		<div className="alert alert-danger" role="alert">
		  The firstname must be between 3 and 20 characters.
		</div>
	  );
	}
  };
  
  
  const vlastname = value => {
	if (value.length < 3 || value.length > 20) {
	  return (
		<div className="alert alert-danger" role="alert">
		  The lastname must be between 3 and 20 characters.
		</div>
	  );
	}
  };
  
  const vphone = value => {
	if (value.length < 3 || value.length > 20) {
	  return (
		<div className="alert alert-danger" role="alert">
		  The phone must be between 3 and 20 characters.
		</div>
	  );
	}
  };
  
  const vpassword = value => {
	if (value.length < 8 || value.length > 40) {
	  return (
		<div className="alert alert-danger" role="alert">
		  The password must be between 6 and 40 characters.
		</div>
	  );
	}
  };

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
	this.handleUpdate = this.handleUpdate.bind(this);
	this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
		username: "",
		email: "",
		password: "",
		firstname:"",
		lastname:"",
		phone:"",
		successful: false,
		message: ""
		}
    };
  
	onChangeUsername(e) {
		this.setState({
		username: e.target.value
		});
	}

	onChangeEmail(e) {
		this.setState({
		email: e.target.value
		});
	}

	onChangePassword(e) {
		this.setState({
		password: e.target.value
		});
	}

	onChangeFirstName(e){
		this.setState({
		firstname: e.target.value
		})
	}

	onChangeLastName(e){
		this.setState({
		lastname: e.target.value
		})
	}

	onChangePhone(e){
		this.setState({
		phone: e.target.value
		})
	}


	componentDidMount() {
		const currentUser = AuthService.getCurrentUser();
		console.log("currentUser", currentUser)
		if (!currentUser) this.setState({ redirect: "/home" });
		this.setState({ currentUser: currentUser, userReady: true })
	}


	handleUpdate(e) {
		e.preventDefault();

		this.setState({
		message: "",
		successful: false
		});

		this.form.validateAll();

		if (this.checkBtn.context._errors.length === 0) {
		AuthService.update(
			this.state.username,
			this.state.firstname,
			this.state.lastname,
			this.state.phone,
			this.state.email,
			this.state.password
		).then(
			this.props.history.push("/profile"),
         	window.location.reload(),
			response => {
			this.setState({
				message: response.data.message,
				successful: true
			});
			},
			error => {
			const resMessage =
				(error.response &&
				error.response.data &&
				error.response.data.message) ||
				error.message ||
				error.toString();

			this.setState({
				successful: false,
				message: resMessage
			});
			}
		);
		}
	}
	

	render() {

		return (
			<div class="container">
				<div class="row gutters">
				<Form
					onSubmit={this.handleUpdate}
					ref={c => {
					this.form = c;
					}}	
				>
					<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
						<div class="card h-100">
							<div class="card-body">
								<div class="row gutters">
									<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<h6 class="mb-2 text-primary">Personal Details</h6>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="form-group">
											<label for="username">Username</label>
											<Input
												type="text"
												className="form-control"
												name="username"
												placeholder="Enter username"
												value={this.state.username}
												onChange={this.onChangeUsername}
												validations={[required, vusername]}
											/>
										</div>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="form-group">
											<label for="name">Name</label>
											<Input
												type="text"
												className="form-control"
												name="firstname"
												placeholder="Enter name"
												value={this.state.firstname}
												onChange={this.onChangeFirstName}
											/>
										</div>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="form-group">
											<label for="surname">Surname</label>
											<Input
												type="text"
												className="form-control"
												name="surname"
												placeholder="Enter surname"
												value={this.state.lastname}
												onChange={this.onChangeLastName}
											/>
										</div>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="form-group">
											<label for="password">Password</label>
											<Input
												type="password"
												className="form-control"
												name="password"
												placeholder="Enter password"
												value={this.state.password}
												onChange={this.onChangePassword}
											/>
										</div>
									</div>
								</div>
								<div class="row gutters">
									<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<h6 class="mt-3 mb-2 text-primary">More</h6>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="form-group">
											<label for="phone">Phone</label>
											<Input
												type="text"
												className="form-control"
												name="phone"
												placeholder="Enter phone"
												value={this.state.phone}
												onChange={this.onChangePhone}
											/>
										</div>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="form-group">
											<label for="email">Email</label>
											<Input
												type="text"
												className="form-control"
												name="email"
												placeholder="Enter email"
												value={this.state.email}
												onChange={this.onChangeEmail}
											/>
										</div>
									</div>
								</div>
								<div class="row gutters">
									<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<div class="text-right">
											<button class="btn btn-primary btn-block">Update</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<CheckButton
						style={{ display: "none" }}
							ref={c => {
								this.checkBtn = c;
							}}
					/>
					</Form>
				</div>
			</div>
		);
	}
}
