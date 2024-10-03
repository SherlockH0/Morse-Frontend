<script lang="ts">
  import { onDestroy, createEventDispatcher } from "svelte";

  export let threshold = 0;
  export let horizontal = false;
  export let elementScroll = null;
  export let hasMore = true;
  export let reverse = false;

  const dispatch = createEventDispatcher();
  let isLoadMore = false;
  let component: any = null;

  $: {
    if (elementScroll || component) {
      const element = elementScroll ? elementScroll : component.parentNode;
      element.addEventListener("scroll", onScroll);
      element.addEventListener("resize", onScroll);
    }
  }

  const onScroll = (e: any) => {
    const isReverse = (-1) ** (reverse ? 0 : 1);
    const offset = horizontal
      ? e.target.scrollWidth -
        e.target.clientWidth +
        e.target.scrollLeft * isReverse
      : e.target.scrollHeight -
        e.target.clientHeight +
        e.target.scrollTop * isReverse;

    console.log(
      offset,
      e.target.scrollHeight,
      e.target.clientHeight,
      e.target.scrollTop,
    );

    if (offset <= threshold) {
      if (!isLoadMore && hasMore) {
        dispatch("loadMore");
      }
      isLoadMore = true;
    } else {
      isLoadMore = false;
    }
  };

  onDestroy(() => {
    if (elementScroll || component) {
      const element = elementScroll ? elementScroll : component.parentNode;
      element.removeEventListener("scroll", null);
      element.removeEventListener("resize", null);
    }
  });
</script>

<div bind:this={component} style="width:0px" />
