<script lang="ts">
  export let user: string;
  export let previous_user: string = "";
  export let time: string;
  export let message: string;
  export let avatar: string;
  export let me: boolean = false;
  import { is_emoji, unicode2LottieUrl } from "../scripts/utils";
  import { DotLottieSvelte } from "@lottiefiles/dotlottie-svelte";
</script>

<div class="chat chat-start">
  <div class="avatar chat-image">
    <div class="w-10 rounded-full">
      <img alt="{user} avatar" src={avatar} />
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
    <div class="chat-bubble" class:chat-bubble-accent={me}>{message}</div>
  {/if}
</div>
