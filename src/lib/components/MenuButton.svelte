<script lang="ts">
  import Icon from "@iconify/svelte";
  export let icon: string;
  let clazz = "";
  export { clazz as class };
</script>

<li>
  <button class="group btn btn-ghost">
    <Icon {icon} class="size-5 transition-transform {clazz}" />
  </button>
</li>
