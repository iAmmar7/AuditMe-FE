import axios from 'axios';

const URL = process.env.SERVER_URL;

function signup(data) {
  return axios.post(`${URL}/api/auth/user/signup`, {
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.userType,
  });
}

function login(data) {
  return axios.post(`${URL}/api/auth/user/login`, {
    email: data.email,
    password: data.password,
  });
}

const authService = { signup, login };

export default authService;
