<script lang="ts">
  import UserUpdateForm from "./UserUpdateForm.svelte";
  import { CldImage } from "svelte-cloudinary";
  import { userStore } from "../scripts/auth";
  import type { SvelteComponent } from "svelte";

  export let dialog: SvelteComponent;
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const url = "/api/avatar/";
  let value: Blob;
  let avatar, fileinput;

  const onFileSelected = (e) => {
    value = e.target.files[0];

    let reader = new FileReader();

    reader.readAsDataURL(value);
    reader.onload = (e) => {
      avatar = e.target.result;
    };
  };
</script>

<UserUpdateForm
  title="Avatar"
  bind:dialog
  let:errors
  bind:value
  fieldname="avatar"
  {headers}
  {url}
  put
>
  <div class="flex flex-col items-center gap-4">
    <button
      class="avatar"
      type="button"
      on:click={() => {
        fileinput.click();
      }}
    >
      <span class="sr-only">Choose image</span>
      <div class="w-40 rounded-full">
        {#if avatar}
          <img src={avatar} alt="avatar" />
        {:else if $userStore.avatar}
          <CldImage
            src={$userStore.avatar}
            alt="avatar"
            width="160"
            height="160"
          />
        {/if}
      </div>
    </button>
    <input
      type="file"
      accept=".jpg, .jpeg, .png"
      on:change={(e) => onFileSelected(e)}
      bind:this={fileinput}
      class="file-input file-input-bordered file-input-sm w-full max-w-xs"
      class:input-error={errors.length > 0}
    />
  </div>
</UserUpdateForm>
