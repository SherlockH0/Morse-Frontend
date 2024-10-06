<script lang="ts">
  import Icon from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";

  let clazz = "";

  export { clazz as class };
  export let icon: string;

  const dispatch = createEventDispatcher();

  function onClick(event: any) {
    dispatch("click", event.detail);
  }
</script>

<button class="group btn btn-ghost" on:click={onClick}>
  <Icon {icon} class="size-5 transition-transform {clazz}" />
</button>
