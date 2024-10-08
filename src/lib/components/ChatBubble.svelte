<!--
@component
Chat bubble component
---
@prop message: Record<string, any>
@prop previous_user: string. An id of the author of the previous message in the chat. If it is equal to the current message's user's id, the username above the bubble isn't shown
-->
<script lang="ts">
  import { getLottieJSONOfEmoji } from "../scripts/utils";
  import { DotLottieSvelte } from "@lottiefiles/dotlottie-svelte";
  import { dateTimeStore } from "../scripts/utils";

  import { cubicOut } from "svelte/easing";
  import { blur } from "svelte/transition";

  import { getRelativeTimeString } from "../scripts/utils";
  import { userStore } from "../scripts/auth";

  export let message: Record<string, any>;

  let user = message.user;
  let body = message.body;
  let avatar: string;

  const now: number = new Date(message.datetime_sent).getTime();
  $dateTimeStore = Date.now();

  $: me = message.user.id == $userStore.id;
  $: sent = getRelativeTimeString(now, $dateTimeStore);

  let animation: string | null = null;
  getLottieJSONOfEmoji(body).then((response) => {
    animation = response;
  });
</script>

<div class="chat chat-start" in:blur={{ easing: cubicOut, duration: 800 }}>
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
    <span class:font-semibold={me}>{user.username}</span>
    <time class="text-xs opacity-50">{sent}</time>
  </div>
  {#if animation}
    <div class="mx-4 mt-1 size-36">
      <DotLottieSvelte data={animation} autoplay loop />
    </div>
  {:else}
    <div
      class="chat-bubble text-pretty break-words"
      class:chat-bubble-accent={me}
    >
      {body}
    </div>
  {/if}
</div>
