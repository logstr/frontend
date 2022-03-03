import storage from "utils/storage";
import { proxy } from "valtio";
import { getCurrentUser } from "./api/auth";

const getInitialState = () => {
  let state = { user: null, token: null };

  try {
    state.token = storage.get("token");
  } catch (e) {}

  return state;
};
export const session = proxy(getInitialState());

export function signIn({ token, status }) {
  storage.save("token", { token, status });
  return fetchUser().then(user => {
    session.token = { token, status };
    return user;
  });
}

export function fetchUser() {
  return getCurrentUser()
    .then((user) => {
      session.user = user;
      return user;
    })
    .catch((e) => {
      logout();
      return Promise.reject(e);
    });
}

function logout() {
  storage.remove("token");
  session.token = null;
  session.user = null;
}
