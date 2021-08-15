import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import "./profile.component.css"

export default class Profile extends Component {
  constructor(props) {
    super(props);

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

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        <div>
          {currentUser.img}
          <div className="card card-container">
          <img
            src="https://www.traileronline.ru/uploads/thumbs/4e01499ad-1.jpg"
            alt="profile-img"
            className="profile-img-card"
          /></div>
          </div>
        {(this.state.userReady) ?
        <div>
          <div>
            <form action="http://localhost:8081/editprofile">
              <input type="submit" value="Edit Profile" />
            </form>
          </div>
          <div>
            <form action="http://localhost:8081/deleteprofile">
              <input type="submit" value="Delete Profile"/>
            </form>
          </div>
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
      </div>
    );
  }
}
