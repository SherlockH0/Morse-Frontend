import { writable, type Writable } from "svelte/store";

export let isAuthenticatdStore: Writable<boolean> | Writable<null> =
  writable(false);
