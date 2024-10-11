<script lang="ts">
  import api from "../scripts/api";
  import { userStore } from "../scripts/auth";
  import Dialog from "./Dialog.svelte";

  let errors: string[] = [];
  export let open = () => {};
  export let close = () => {};
  export let title: string;
  export let value = $userStore.username;
  userStore.subscribe((user) => {
    value = user.username;
  });

  function handleSubmit() {
    errors = [];
    api
      .patch(`/api/users/${$userStore.id}/`, {
        username: value,
      })
      .then((response) => {
        $userStore.username = response.data.username;
        close();
      })
      .catch((err) => {
        if (err != "Field error" && err.request) {
          errors = err.response.data.username;
        }
        console.log(errors.length > 0);
      });
  }
</script>

<Dialog bind:open bind:close small>
  <h4 class="mb-4 font-bold">{title}</h4>
  <form on:submit|preventDefault={handleSubmit} class="relative flex flex-col">
    <div class="form-control">
      <slot {errors} />
      {#if errors.length > 0}
        <ul class="label">
          {#each errors as error}
            <li class="label-text-alt">{error}</li>
          {/each}
        </ul>
      {/if}
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-sm">Cancel</button>
      </form>
      <button class="btn btn-primary btn-sm">Save</button>
    </div>
  </form>
</Dialog>
