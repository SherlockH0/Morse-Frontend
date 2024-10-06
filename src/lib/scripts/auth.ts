import { writable, type Writable } from "svelte/store";

export let isAuthenticatedStore: Writable<boolean> | Writable<null> =
  writable(null);

export let usernameStore: Writable<string> | Writable<null> = writable(null);
