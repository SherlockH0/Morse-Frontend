<script lang="ts">
  let dialog: HTMLDialogElement;

  export const open = () => {
    dialog.showModal();
  };
  export const close = () => {
    dialog.close();
  };
  export let small = false;
</script>

<dialog
  id="modal"
  class="modal"
  bind:this={dialog}
  class:sm:modal-middle={!small}
  class:modal-bottom={!small}
>
  <div class="modal-box {small ? 'max-w-sm' : 'sm:max-w-md'}">
    {#if !small}
      <form method="dialog">
        <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          >✕</button
        >
      </form>
    {/if}
    <slot />
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
