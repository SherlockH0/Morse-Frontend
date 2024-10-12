<!--
@component

Authorization wrapper. If user is not logged in, covers wrapped content with an `AuthorizationDialog`.
If access token is present but is expired, an api call will be made to refresh access token.
-->

<script lang="ts">
  import AuthorizationDialog from "./AuthorizationDialog.svelte";
  import Loading from "./Loading.svelte";

  import { jwtDecode } from "jwt-decode";

  import { ACCESS_TOKEN } from "../scripts/constants";
  import { isAuthenticatedStore } from "../scripts/auth";
  import { refreshToken } from "../scripts/api";

  auth().catch(() => {
    $isAuthenticatedStore = false;
  });

  async function auth() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      $isAuthenticatedStore = false;
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration && tokenExpiration < now) {
      await refreshToken();
    } else {
      $isAuthenticatedStore = true;
    }
  }
</script>

{#if $isAuthenticatedStore === null}
  <Loading />
{:else if $isAuthenticatedStore === true}
  <slot />
{:else}
  <AuthorizationDialog />
{/if}
