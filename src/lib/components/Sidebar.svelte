<script lang="ts">
  import MenuButton from "./MenuButton.svelte";
  import RoomSceleton from "./RoomSceleton.svelte";
  import ThemeController from "./ThemeController.svelte";
  import Dialog from "./Dialog.svelte";
  import Logout from "./Logout.svelte";
  import UsernameForm from "./UsernameForm.svelte";
  import Room from "./Room.svelte";
  import { userStore } from "../scripts/auth";
  import api from "../scripts/api";
  import { dateTimeStore } from "../scripts/utils";
  import Icon from "@iconify/svelte";

  let open = () => {};
  let openUsernameForm = () => {};
  let rooms: any[];
  function compareByLastMessage(
    a: Record<string, any>,
    b: Record<string, any>,
  ) {
    if (a.last_message.datetime_sent < b.last_message.datetime_sent) {
      return 1;
    } else if (a.last_message.datetime_sent > b.last_message.datetime_sent) {
      return -1;
    } else {
      return 0;
    }
  }

  $: fetchData().then((r) => {
    rooms = r.sort(compareByLastMessage);
  }),
    $dateTimeStore;

  async function fetchData() {
    const response = await api.get(`/api/rooms/`);
    return response.data.results;
  }
</script>

<div
  class="min-h-full w-screen space-y-4 border-r border-neutral bg-base-200 p-3 text-base-content md:w-80"
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
    {#if rooms}
      {#each rooms as room (room.id)}
        <li>
          <Room {room} />
        </li>
      {/each}
    {:else}
      <li>
        <RoomSceleton />
      </li>
      <li>
        <RoomSceleton />
      </li>
    {/if}
  </ul>
</div>

<Dialog bind:open>
  <h3 class="text-lg font-bold">Profile Settings</h3>
  <div class="divider"></div>
  <div class="flex flex-col items-center gap-2">
    <div class="grid place-items-center">
      <div class="avatar relative">
        <button
          on:click={() => open()}
          class="btn btn-circle btn-primary btn-sm absolute -right-1 -top-1 outline outline-base-100"
        >
          <Icon icon="ci:edit" class="size-4" />
        </button>
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
      on:click={openUsernameForm}
    >
      @{$userStore.username}
    </button>
  </div>
  <div class="divider"></div>

  <Logout />
</Dialog>
<UsernameForm bind:open={openUsernameForm} />
