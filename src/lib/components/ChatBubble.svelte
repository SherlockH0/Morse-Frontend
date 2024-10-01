<script lang="ts">
  import { is_emoji, unicode2LottieUrl } from "../scripts/utils";
  import { DotLottieSvelte } from "@lottiefiles/dotlottie-svelte";
  import { cubicOut, expoOut } from "svelte/easing";
  import { fade, fly, scale, blur, draw, crossfade } from "svelte/transition";

  export let user: string;
  export let previous_user: string = "";
  export let time: string;
  export let message: string;
  export let avatar: string;
  export let me: boolean = false;
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
    {previous_user !== user ? user : ""}
    <time class="text-xs opacity-50">{time}</time>
  </div>
  {#if is_emoji(message)}
    <div class="mx-4 mt-1 size-36">
      <DotLottieSvelte src={unicode2LottieUrl(message)} autoplay loop />
    </div>
  {:else}
    <div
      class="chat-bubble"
      class:chat-bubble-accent={me}
      transition:scale={{ easing: cubicOut, duration: 1000 }}
    >
      {message}
    </div>
  {/if}
</div>
