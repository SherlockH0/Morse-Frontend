import { writable } from "svelte/store";
import { ACCESS_TOKEN } from "./constants";
import { jwtDecode } from "jwt-decode";
import api from "./api";

interface JwtPayload {
  user_id: string;
}

export let isAuthenticatedStore = writable<boolean | null>(null);

export const userStore = writable<Record<string, string>>({
  username: "",
  id: "",
  avatar: "aibz4iotlv3ia8cpawo0",
});

export let currentRoomStore = writable<string | null>(null);

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
        userStore.set(response.data);
      })
      .catch(() => {
        isAuthenticatedStore.set(false);
      });
  } else {
    userStore.set({
      username: "",
      id: "",
      avatar: "",
    });
  }
});
