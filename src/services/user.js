import axios from 'axios';

const URL = process.env.SERVER_URL;

export function getCurrentUser() {
  return axios.get(`${URL}/api/user`, {
    headers: { Authorization: localStorage.userToken },
  });
}

export function getUserByRole(role) {
  return axios.get(`${URL}/api/user/roles`, {
    params: {
      role,
    },
    headers: { Authorization: localStorage.userToken },
  });
}
