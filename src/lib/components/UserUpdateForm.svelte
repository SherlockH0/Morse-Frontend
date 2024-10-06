<script lang="ts">
  import Input from "./Input.svelte";

  function handleSubmit(event) {
    return;
  }
</script>

<h4 class="mb-4 font-bold">Username</h4>
<form on:submit|preventDefault={handleSubmit} class="relative flex flex-col">
  <label class="input input-sm input-bordered flex items-center gap-2">
    @
    <input type="text" class="grow" value="sherlock" />
  </label>
  <div class="modal-action">
    <form method="dialog">
      <button class="btn btn-sm">Cancel</button>
    </form>
    <button class="btn btn-primary btn-sm">Save</button>
  </div>
</form>
