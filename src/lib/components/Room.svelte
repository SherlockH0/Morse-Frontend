<script lang="ts">
  import { IMAGE_PREFIX } from "../scripts/constants";
  export let room: Record<string, any>;
  console.log(room);
</script>

<button
  class="btn btn-ghost btn-block flex h-auto flex-nowrap items-stretch justify-start gap-4 p-2 text-start"
>
  <div class="avatar">
    <div class="w-14 rounded-full">
      <img src={IMAGE_PREFIX + room.room.avatar} alt="" />
    </div>
  </div>
  <div
    class="flex flex-auto flex-col items-start justify-between overflow-hidden whitespace-nowrap"
  >
    <div class="w-full overflow-hidden overflow-ellipsis text-xl font-semibold">
      {room.room.name}
    </div>
    <div class="w-full overflow-hidden overflow-ellipsis text-base-content/60">
      <span class="font-bold">
        {room.last_message.user.username}:
      </span>
      <span>{room.last_message.body}</span>
    </div>
  </div>
</button>
