import { writable, type Writable } from "svelte/store";

export let isAuthenticatdStore: Writable<boolean> | Writable<null> =
  writable(null);

export let usernameStore: Writable<string> | Writable<null> = writable(null);
