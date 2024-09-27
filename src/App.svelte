<script lang="ts">
  import Sidebar from "./lib/components/Sidebar.svelte";
  import Chat from "./lib/components/Chat.svelte";
  import Authorization from "./lib/components/Authorization.svelte";
  let isAuthorized: boolean;
</script>

<Authorization bind:isAuthorized>
  <main class="flex-1">
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content h-full">
        <Chat />
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
</Authorization>

<style>
</style>
