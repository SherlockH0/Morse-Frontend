<script lang="ts">
  import Sidebar from "./lib/components/Sidebar.svelte";
  import Chat from "./lib/components/Chat.svelte";
  let roomName = "Me and friends and thier friends and their friend's friends";
</script>

<div class="">
  <main class="flex-1">
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content h-full">
        <Chat {roomName} />
      </div>
      <aside class="drawer-side">
        <label
          for="my-drawer-2"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <Sidebar />
      </aside>
    </div>
  </main>
</div>

<style>
</style>
