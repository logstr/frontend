import HttpClient from "services/http/api";

export function login(email, password) {
  return HttpClient.post('/security/login', {email, password}).then(({data}) => data)
}

export function getCurrentUser() {
  return HttpClient.get('/user/current');
}