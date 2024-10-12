<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import api from "../scripts/api";
  import { userStore } from "../scripts/auth";
  import Dialog from "./Dialog.svelte";

  let errors: string[] = [];

  export let title: string;
  export let value: any;
  export let fieldname: string;
  export let url: string | null = null;
  export let headers: object = {};
  export let put = false;

  export let dialog: SvelteComponent;

  function handleSubmit() {
    errors = [];
    let data: Record<string, any> = {};
    data[fieldname] = value;

    const func = put ? api.put : api.patch;

    func(url || `/api/users/${$userStore.id}/`, data, { headers: headers })
      .then((response) => {
        $userStore[fieldname] = response.data[fieldname];
        dialog.close();
      })
      .catch((err) => {
        if (err != "Field error" && err.request) {
          errors = err.response.data[fieldname];
        }
      });
  }
</script>

<Dialog bind:this={dialog} small>
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
