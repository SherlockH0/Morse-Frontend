import { writable, type Writable } from "svelte/store";
import { ACCESS_TOKEN } from "./constants";
import { jwtDecode } from "jwt-decode";
import api from "./api";

interface JwtPayload {
  user_id: string;
}

export const isAuthenticatedStore: Writable<boolean> | Writable<null> =
  writable(null);
export const userStore: Writable<Record<string, any>> = writable({
  username: "",
  id: "",
});

async function retreiveUser() {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    const userId: string = (jwtDecode(token) as JwtPayload).user_id;
    const userInfo = await api.get("/api/users/" + userId);

    return userInfo;
  }
  throw "Token is invalid";
}

isAuthenticatedStore.subscribe((isAuthenticated) => {
  if (isAuthenticated) {
    retreiveUser()
      .then((response) => {
        userStore.set({
          username: response.data.username,
          id: response.data.id,
        });
      })
      .catch(() => {
        isAuthenticatedStore.set(false);
      });
  } else {
    userStore.set({
      username: "",
      id: "",
    });
  }
});
userStore.subscribe((value) => {
  console.log(value);
});
