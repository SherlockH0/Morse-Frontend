<script lang="ts">
  import type { ComponentEvents } from "svelte";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import MenuButton from "./MenuButton.svelte";
  import Textinput from "./Textinput.svelte";
  import ChatBubble from "./ChatBubble.svelte";
  import { ACCESS_TOKEN } from "../scripts/constants";
  import { isAuthenticatdStore } from "../scripts/auth";
  import api from "../scripts/api";
  import InfiniteScroll from "./InfiniteScroll.svelte";

  export let roomName = "test";

  let messages: any = [];
  let newBatch: any = [];
  let newMessage: any = [];
  let chat: HTMLElement;

  let chatSocket: WebSocket | null;
  let nextUrl = `/api/messages/${roomName}/`;

  async function fetchData() {
    const response = await api.get(nextUrl);

    newBatch = response.data.results;
    nextUrl = response.data.next;
    console.log(response);
  }
  onMount(() => {
    fetchData();
  });

  isAuthenticatdStore.subscribe((value) => {
    if (value) {
      const token = localStorage.getItem(ACCESS_TOKEN);
      chatSocket = new WebSocket(
        "ws://" +
          import.meta.env.VITE_API_URL +
          "/ws/chat/" +
          roomName +
          "/?token=" +
          token,
      );
      chatSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        newMessage = [data];
      };
    } else {
      chatSocket = null;
    }
  });

  function sendMessage(event: ComponentEvents<Textinput>["message"]) {
    if (chatSocket) {
      chat.scroll({
        top: 0,
        behavior: "smooth",
      });

      const body = event.detail.text;
      chatSocket.send(
        JSON.stringify({
          body: body,
        }),
      );
    }
  }

  $: (messages = [...newMessage, ...messages, ...newBatch]),
    (newBatch = []),
    (newMessage = []);
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
    class="flex w-full grow flex-col-reverse overflow-x-scroll p-4 ps-10"
  >
    <InfiniteScroll
      hasMore={nextUrl != null}
      threshold={100}
      on:loadMore={fetchData}
      reverse
    />
    {#each messages as message (message.id)}
      <ChatBubble {message} />
    {/each}
  </section>
  <footer class="p-4">
    <Textinput on:message={sendMessage} />
  </footer>
</div>
