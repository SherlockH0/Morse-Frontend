<script lang="ts">
  import AuthorizationDialog from "./AuthorizationDialog.svelte";
  import Loading from "./Loading.svelte";
  import { ACCESS_TOKEN, REFRESH_TOKEN } from "../scripts/constants";
  import { jwtDecode } from "jwt-decode";
  import api from "../scripts/api";
  import { onMount } from "svelte";
  export let isAuthorized: boolean | null = null;

  onMount(() => {
    auth().catch(() => {
      isAuthorized = false;
    });
  });

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        isAuthorized = true;
      } else {
        isAuthorized = false;
      }
    } catch (error) {
      isAuthorized = false;
      console.log(error);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      isAuthorized = false;
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration && tokenExpiration < now) {
      await refreshToken();
    } else {
      isAuthorized = true;
    }
  };
</script>

{#if isAuthorized === null}
  <Loading />
{:else}
  <AuthorizationDialog {isAuthorized} />
  <slot />
{/if}
