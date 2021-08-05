import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

class AuthService {
  login(username, password) {
    return axios.post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        console.log(response.data)
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, firstname, lastname, phone, email, gender, password) {
    return axios.post(API_URL + "signup", {
      username,
      firstname,
      lastname,
      phone,
      email,
      gender,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
