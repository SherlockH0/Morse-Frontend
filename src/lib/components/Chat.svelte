<script lang="ts">
  import Icon from "@iconify/svelte";
  import MenuButton from "./MenuButton.svelte";
  import Textinput from "./Textinput.svelte";
  import ChatBubble from "./ChatBubble.svelte";

  export let roomName = "";

  let messages = [];
</script>

<div class="flex h-svh flex-col">
  <header class="navbar gap-2 border-b border-neutral bg-base-200">
    <label for="my-drawer-2" class="btn btn-ghost drawer-button lg:hidden">
      <Icon icon="ci:chevron-left" class="size-6" />
    </label>
    <div class="flex-1 text-sm font-bold sm:text-base md:text-xl lg:ms-2">
      @
      {#if roomName}
        {roomName}
      {:else}
        <div class="skeleton ms-2 h-4 w-full max-w-md"></div>
      {/if}
    </div>
    <div>
      <ul class="menu menu-horizontal">
        <MenuButton icon="ci:user-add" />
        <MenuButton icon="ci:more-vertical" />
      </ul>
    </div>
  </header>
  <section class="flex w-full grow flex-col justify-end p-4">
    {#each messages as { user, time, message, avatar, me }}
      <ChatBubble {user} {time} {message} {avatar} {me} />
    {/each}
  </section>
  <footer class="p-4">
    <Textinput />
  </footer>
</div>
