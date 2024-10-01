<script lang="ts">
  import type { ComponentEvents } from "svelte";
  import Icon from "@iconify/svelte";
  import MenuButton from "./MenuButton.svelte";
  import Textinput from "./Textinput.svelte";
  import ChatBubble from "./ChatBubble.svelte";
  import { ACCESS_TOKEN } from "../scripts/constants";

  export let roomName = "test";

  let messages: any[] = [];
  let chat: HTMLElement;

  const token = localStorage.getItem(ACCESS_TOKEN);
  const chatSocket = new WebSocket(
    "ws://" +
      import.meta.env.VITE_API_URL +
      "/ws/chat/" +
      roomName +
      "/?token=" +
      token,
  );

  chatSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    messages.push(data);
    messages[messages.length - 1].id = messages.length;
    messages = messages;
  };

  function sendMessage(event: ComponentEvents<Textinput>["message"]) {
    chat.scroll({
      top: 0,
      behavior: "smooth",
    });
    const message = event.detail.text;
    chatSocket.send(
      JSON.stringify({
        message: message,
      }),
    );
  }
</script>

<div class="flex h-svh flex-col">
  <header class="navbar shrink-0 gap-2 border-b border-neutral bg-base-200">
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
  <section
    bind:this={chat}
    class="flex w-full grow flex-col-reverse overflow-y-auto p-4 ps-10"
  >
    <div class="transition duration-1000">
      {#each messages as message (message.id)}
        <ChatBubble {...message} />
      {/each}
    </div>
  </section>
  <footer class="p-4">
    <Textinput on:message={sendMessage} />
  </footer>
</div>
