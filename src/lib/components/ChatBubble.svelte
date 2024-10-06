<!--
@component
Chat bubble component
---
@prop message: Record<string, any>
@prop previous_user: string. An id of the author of the previous message in the chat. If it is equal to the current message's user's id, the username above the bubble isn't shown
-->
<script lang="ts">
  import { is_emoji, unicode2LottieUrl } from "../scripts/utils";
  import { DotLottieSvelte } from "@lottiefiles/dotlottie-svelte";

  import { onMount } from "svelte";

  import { cubicOut } from "svelte/easing";
  import { blur } from "svelte/transition";

  import { getRelativeTimeString } from "../scripts/utils";
  import { userStore } from "../scripts/auth";

  export let message: Record<string, any>;

  let time = Date.now();

  let user = message.user;
  let body = message.body;
  let avatar: string;

  $: me = message.user.id == $userStore.id;
  $: sent = getRelativeTimeString(new Date(message.datetime_sent), time);

  onMount(() => {
    const interval = setInterval(
      () => {
        time = Date.now();
      },
      1000 * 60 * 2,
    );

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div
  class="chat chat-start"
  transition:blur={{ easing: cubicOut, duration: 800 }}
>
  <div class="avatar chat-image">
    <div class="w-10 rounded-full">
      <img
        alt="{user} avatar"
        src={avatar ||
          "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/599e3b95636919.5eb96c0445ea7.jpg"}
      />
    </div>
  </div>
  <div class="chat-header">
    {user.username}
    <time class="text-xs opacity-50">{sent}</time>
  </div>
  {#if is_emoji(body)}
    <div class="mx-4 mt-1 size-36">
      <DotLottieSvelte src={unicode2LottieUrl(body)} autoplay loop />
    </div>
  {:else}
    <div class="chat-bubble" class:chat-bubble-accent={me}>
      {body}
    </div>
  {/if}
</div>
