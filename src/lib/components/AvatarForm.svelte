<script lang="ts">
  import UserUpdateForm from "./UserUpdateForm.svelte";
  export let open = () => {};
  export let close = () => {};
  let value: string;
</script>

<UserUpdateForm title="Username" bind:open bind:close let:errors bind:value>
  <label
    class="input input-sm input-bordered flex items-center gap-2"
    class:input-error={errors.length > 0}
  >
    @
    <input type="text" class="grow" bind:value />
  </label>
</UserUpdateForm>
