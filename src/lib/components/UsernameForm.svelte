<script lang="ts">
  import UserUpdateForm from "./UserUpdateForm.svelte";
  import { userStore } from "../scripts/auth";
  import type { SvelteComponent } from "svelte";

  export let dialog: SvelteComponent;

  let value = $userStore.username;

  userStore.subscribe((user) => {
    value = user.username;
  });
</script>

<UserUpdateForm
  title="Username"
  fieldname="username"
  bind:dialog
  let:errors
  bind:value
>
  <label
    class="input input-sm input-bordered flex items-center gap-2"
    class:input-error={errors.length > 0}
  >
    @
    <input type="text" class="grow" bind:value />
  </label>
</UserUpdateForm>
