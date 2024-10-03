<!--
@component
Textarea for sending messages with emoji select.
Dispatches a `message` event when the message is sent.
-->

<script lang="ts">
  import "emoji-picker-element";

  import Icon from "@iconify/svelte";

  import { tick, createEventDispatcher } from "svelte";

  let textarea: HTMLTextAreaElement;
  let value = "";

  const dispatch = createEventDispatcher();

  async function choseEmoji(event: any) {
    let emoji: string = event.detail.unicode;
    let selectionStart = textarea.selectionStart;
    let selectionEnd = textarea.selectionEnd;

    value =
      textarea.value.substring(0, selectionStart) +
      emoji +
      textarea.value.substring(selectionEnd);

    await tick();
    textarea.selectionEnd = textarea.selectionStart =
      selectionStart + emoji.length;
  }

  function sendMessage() {
    dispatch("message", {
      text: value,
    });
    value = "";
  }

  function handleEnter(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="flex items-center gap-1">
  <textarea
    class="textarea textarea-bordered w-full resize-none"
    placeholder="Write a message..."
    rows="1"
    bind:this={textarea}
    on:keydown={handleEnter}
    bind:value
  ></textarea>
  <div class="dropdown dropdown-end dropdown-top dropdown-hover">
    <div tabindex="0" role="button" class="btn text-lg">
      <Icon icon="ri:emoji-sticker-line" class="size-6" />
    </div>
    <div class="dropdown-content -me-16 p-4">
      <emoji-picker on:emoji-click={choseEmoji}></emoji-picker>
    </div>
  </div>
  <button class="btn" on:click={sendMessage}
    ><Icon icon="ci:check-big" class="size-6" /></button
  >
</div>

<style>
  emoji-picker {
    --background: oklch(var(--b1));
    --tw-border-opacity: 1;
    --border-color: var(
      --fallback-b2,
      oklch(var(--b2) / var(--tw-border-opacity))
    );
    --border-size: 2px;
    --border-radius: var(--rounded-box);
    --button-active-background: var(--fallback-bc, oklch(var(--bc) / 0.2));
    --button-hover-background: var(--fallback-bc, oklch(var(--bc) / 0.2));
    --category-font-color: oklch(var(--bc));
    --category-emoji-size: 2rem;
    --emoji-size: 1.5rem;
    --indicator-color: oklch(var(--a));
    --input-border-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
    --input-border-radius: var(--rounded-btn, 0.5rem);
    --input-font-color: oklch(var(--bc));
    --input-font-size: 0.875rem;
    --input-line-height: 2rem;
    --input-padding: 0 0.75rem;
    --input-placeholder-color: #9ca3af;
    --outline-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
    --outline-size: 2px;
    --skintone-border-radius: var(--rounded-btn, 0.5rem);
    --emoji-font-family: "Noto Color Emoji", "Twemoji Mozilla",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "EmojiOne Color",
      "Android Emoji", sans-serif;
  }
  @media screen and (max-width: 400px) {
    emoji-picker {
      --num-columns: 6;
      --category-emoji-size: 1.125rem;
    }
  }
</style>
