<script lang="ts">
  import { ACCESS_TOKEN, REFRESH_TOKEN } from "../scripts/constants";
  import { isAuthenticatedStore } from "../scripts/auth";
  import Icon from "@iconify/svelte";

  async function logout() {
    localStorage.setItem(ACCESS_TOKEN, "");
    localStorage.setItem(REFRESH_TOKEN, "");

    $isAuthenticatedStore = false;
  }
</script>

<button class="btn btn-outline btn-error btn-sm w-full" on:click={logout}>
  <Icon icon="ci:log-out" class="size-5" />
  Logout</button
>
