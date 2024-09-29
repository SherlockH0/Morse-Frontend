<script lang="ts">
  import AuthorizationDialog from "./AuthorizationDialog.svelte";
  import Loading from "./Loading.svelte";

  import { jwtDecode } from "jwt-decode";
  import { onMount } from "svelte";

  import { ACCESS_TOKEN, REFRESH_TOKEN } from "../scripts/constants";
  import { isAuthenticatdStore } from "../scripts/auth";
  import api from "../scripts/api";

  onMount(() => {
    auth().catch(() => {
      $isAuthenticatdStore = false;
    });
  });

  async function refreshToken() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        $isAuthenticatdStore = true;
      } else {
        $isAuthenticatdStore = false;
      }
    } catch (error) {
      $isAuthenticatdStore = false;
      console.log(error);
    }
  }

  async function auth() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      $isAuthenticatdStore = false;
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration && tokenExpiration < now) {
      await refreshToken();
    } else {
      $isAuthenticatdStore = true;
    }
  }
</script>

{#if $isAuthenticatdStore === null}
  <Loading />
{:else}
  <AuthorizationDialog />
  <slot />
{/if}
