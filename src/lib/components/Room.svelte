<script lang="ts">
  import { IMAGE_PREFIX } from "../scripts/constants";
  import { currentRoomStore } from "../scripts/auth";

  export let room: Record<string, any>;

  $: isCurrent = room.room.name == $currentRoomStore;
  $: unread = room.unread_messages;
  $: console.log(room);
</script>

<button
  class="btn btn-ghost btn-block flex h-auto flex-nowrap items-stretch justify-start gap-4 rounded-full p-1 text-start"
  class:btn-active={isCurrent}
  on:click={() => {
    $currentRoomStore = room.room.name;
  }}
>
  <div class="avatar">
    <div class="w-14 rounded-full">
      <img src={IMAGE_PREFIX + room.room.avatar} alt="" />
    </div>
  </div>
  <div
    class="flex flex-auto flex-col items-start justify-around overflow-hidden whitespace-nowrap"
  >
    <div class="flex w-full items-center">
      <div
        class="w-full overflow-hidden overflow-ellipsis text-lg font-semibold"
      >
        {room.room.name}
      </div>
      {#if unread > 0}
        <div class="badge badge-info badge-sm me-6 ms-auto">
          {unread > 99 ? "99+" : unread}
        </div>
      {/if}
    </div>
    <div class="overflow-hidden overflow-ellipsis text-xs text-base-content/80">
      <span class="font-bold">
        {room.last_message.user.username}:
      </span>
      <span>{room.last_message.body}</span>
    </div>
  </div>
</button>
