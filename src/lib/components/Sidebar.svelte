<script lang="ts">
  import MenuButton from "./MenuButton.svelte";
  import RoomSceleton from "./RoomSceleton.svelte";
  import ThemeController from "./ThemeController.svelte";
  import Icon from "@iconify/svelte";
</script>

<div
  class="min-h-full w-80 space-y-4 border-r border-neutral bg-base-200 p-4 text-base-content"
>
  <!-- Sidebar content here -->
  <ul class="menu menu-horizontal w-full justify-between">
    <details class="dropdown">
      <summary class="group btn btn-ghost m-1">
        <Icon
          icon="ci:settings"
          class="size-5 transition-transform group-hover:rotate-[60deg]"
        />
      </summary>
      <ul
        class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ul>
    </details>

    <ThemeController />

    <MenuButton icon="ci:chat-add" class="group-hover:translate-x-0.5" />
  </ul>
  <ul id="rooms" class="flex flex-col space-y-4">
    <RoomSceleton />
    <RoomSceleton />
    <RoomSceleton />
  </ul>
</div>
