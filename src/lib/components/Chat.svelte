<script lang="ts">
  import type { ComponentEvents } from "svelte";

  import { onMount } from "svelte";

  import Icon from "@iconify/svelte";
  import MenuButton from "./MenuButton.svelte";
  import Textinput from "./Textinput.svelte";
  import ChatBubble from "./ChatBubble.svelte";
  import InfiniteScroll from "./InfiniteScroll.svelte";

  import { ACCESS_TOKEN } from "../scripts/constants";
  import { currentRoomStore } from "../scripts/auth";
  import api from "../scripts/api";

  const limit = 10;

  let messages: any = [];
  let chat: HTMLElement;
  let chatSocket: WebSocket | null;
  let next: string | null = "";

  $: console.log("messages:", messages);

  async function fetchData(room: string) {
    const nextUrl = `/api/messages/${room}/?limit=${limit}&offset=${messages.length}`;

    const response = await api.get(nextUrl);

    messages = [...messages, ...response.data.results];
    next = response.data.next;
  }

  currentRoomStore.subscribe((room) => {
    chatSocket?.close();
    messages = [];
    if (room) {
      fetchData(room);

      const token = localStorage.getItem(ACCESS_TOKEN);
      chatSocket = new WebSocket(
        "ws://" +
          import.meta.env.VITE_API_URL +
          "/ws/chat/" +
          room +
          "/?token=" +
          token,
      );
      chatSocket.onmessage = (event) => {
        console.log("message");
        const data = JSON.parse(event.data);
        messages = [data, ...messages];
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
</script>

{#if $currentRoomStore}
  <!-- content here -->
  <div class="flex h-svh flex-col">
    <header class="navbar shrink-0 gap-2 border-b border-neutral bg-base-200">
      <label for="my-drawer-2" class="btn btn-ghost drawer-button lg:hidden">
        <Icon icon="ci:chevron-left" class="size-6" />
      </label>
      <div class="flex-1 text-sm font-bold sm:text-base md:text-xl lg:ms-2">
        @
        {#if $currentRoomStore}
          {$currentRoomStore}
        {:else}
          <div class="skeleton ms-2 h-4 w-full max-w-md"></div>
        {/if}
      </div>
      <div>
        <ul class="menu menu-horizontal">
          <li>
            <MenuButton icon="ci:user-add" />
          </li>
          <li>
            <MenuButton icon="ci:more-vertical" />
          </li>
        </ul>
      </div>
    </header>
    <section
      bind:this={chat}
      class="flex w-full grow flex-col-reverse overflow-x-scroll p-4 ps-10"
    >
      <InfiniteScroll
        hasMore={next != null}
        threshold={100}
        on:loadMore={() => {
          fetchData($currentRoomStore);
        }}
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
{:else}
  <div class="grid h-full place-items-center">
    <div class="badge badge-accent badge-lg pb-0.5">
      Chose a room or create new to start messaging
    </div>
  </div>{/if}
