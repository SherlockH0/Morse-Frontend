<script lang="ts">
  import RegisterForm from "./RegisterForm.svelte";
  import LoginForm from "./LoginForm.svelte";
  import { isAuthenticatdStore } from "../scripts/auth";

  // Toggle modal state using <dialog> element's builtin .showModal and .close
  let dialog: HTMLDialogElement;

  const toggleModal = (isOpen: boolean) =>
    isOpen ? dialog.showModal() : dialog.close();

  $: if (dialog != null) toggleModal(!$isAuthenticatdStore);
</script>

<dialog class="modal" bind:this={dialog} on:cancel|preventDefault>
  <div class="modal-box max-w-md">
    <div role="tablist" class="tabs tabs-lifted tabs-lg">
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        class="tab"
        aria-label="Login"
        checked
      />
      <div
        role="tabpanel"
        class="tab-content rounded-box border-base-300 bg-base-100 p-6"
      >
        <LoginForm />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        class="tab"
        aria-label="Register"
      />
      <div
        role="tabpanel"
        class="tab-content rounded-box border-base-300 bg-base-100 p-6"
      >
        <RegisterForm />
      </div>
    </div>
  </div>
</dialog>
