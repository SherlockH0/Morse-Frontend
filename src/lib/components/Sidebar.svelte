<script lang="ts">
  import MenuButton from "./MenuButton.svelte";
  import RoomSceleton from "./RoomSceleton.svelte";
  import ThemeController from "./ThemeController.svelte";
  import Dialog from "./Dialog.svelte";
  import Logout from "./Logout.svelte";
  import UserUpdateForm from "./UserUpdateForm.svelte";
  import { userStore } from "../scripts/auth";

  let open = () => {};
  let openSmall = () => {};

  let username = "sherlock";
</script>

<div
  class="min-h-full w-80 space-y-4 border-r border-neutral bg-base-200 p-4 text-base-content"
>
  <!-- Sidebar content here -->
  <ul class="menu menu-horizontal w-full justify-between">
    <li>
      <MenuButton
        icon="ci:settings"
        class="group-hover:rotate-[60deg]"
        on:click={open}
      />
    </li>
    <ThemeController />
    <li>
      <MenuButton icon="ci:chat-add" class="group-hover:translate-x-0.5" />
    </li>
  </ul>
  <ul id="rooms" class="flex flex-col space-y-4">
    <RoomSceleton />
    <RoomSceleton />
    <RoomSceleton />
  </ul>
</div>

<Dialog bind:open>
  <h3 class="text-lg font-bold">Profile Settings</h3>
  <div class="divider"></div>
  <div class="flex flex-col items-center gap-2">
    <div class="grid place-items-center">
      <div class="avatar">
        <div class="w-24 rounded-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt=""
          />
        </div>
      </div>
    </div>
    <button
      class="btn btn-ghost join-item btn-sm text-center"
      on:click={openSmall}
    >
      @{$userStore.username}
    </button>
  </div>
  <div class="divider"></div>

  <Logout />
</Dialog>

<Dialog bind:open={openSmall} small>
  <UserUpdateForm />
</Dialog>
