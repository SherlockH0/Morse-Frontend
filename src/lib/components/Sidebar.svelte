<script lang="ts">
  import MenuButton from "./MenuButton.svelte";
  import RoomSceleton from "./RoomSceleton.svelte";
  import ThemeController from "./ThemeController.svelte";
</script>

<div
  class="min-h-full w-80 space-y-4 border-r border-neutral bg-base-200 p-4 text-base-content"
>
  <!-- Sidebar content here -->
  <ul class="menu menu-horizontal w-full justify-between">
    <MenuButton icon="ci:settings" class="group-hover:rotate-[60deg]" />

    <ThemeController />

    <MenuButton icon="ci:chat-add" class="group-hover:translate-x-0.5" />
  </ul>
  <ul id="rooms" class="flex flex-col space-y-4">
    <RoomSceleton />
    <RoomSceleton />
    <RoomSceleton />
  </ul>
</div>
