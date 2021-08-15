import React, { Component } from "react";
import Form from "react-validation/build/form";
import AuthService from "../services/auth.service";
import CheckButton from "react-validation/build/button";
import "./profile.delete.css"

export default class ProfileDelete extends Component {
  constructor(props) {
    super(props);
	this.handleDelete = this.handleDelete.bind(this);

    this.state = {
        redirect: null,
        userReady: false,
        currentUser: { username: "" }
      };
    }

	componentDidMount() {
		const currentUser = AuthService.getCurrentUser();
		console.log("currentUser", currentUser)
		if (!currentUser) this.setState({ redirect: "/home" });
		this.setState({ currentUser: currentUser, userReady: true })
	}



	handleDelete(e) {
		e.preventDefault();

		this.setState({
		message: "",
		successful: false
		});

        const { currentUser } = this.state;


		if (this.checkBtn.context._errors.length === 0) {
		AuthService.delete(
			currentUser.username
		).then(
			this.props.history.push("/home"),
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
        const { currentUser } = this.state;

		return (
			<div className="container">
                <Form
                onSubmit={this.handleDelete}
                ref={c => {
                this.form = c;
                }}>
                <h1>Are you Suuuure? {currentUser.username}</h1>
                <div class="button">
					<div>
						<div id="button">
							<button class="btn btn-primary btn-block">Yees</button>
						</div>
					</div>
                </div>    
                    {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>: null}
                <CheckButton
						style={{ display: "none" }}
							ref={c => {
								this.checkBtn = c;
							}}
				/>
                </Form>
            </div>
		);
	}
}
