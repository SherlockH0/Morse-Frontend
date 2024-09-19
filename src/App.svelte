<script lang="ts">
  import Counter from "./lib/Counter.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Textinput from "./lib/Textinput.svelte";
</script>

<Navbar />
<main>
  <div class="p-2 pb-4">
    <Counter />
    <Textinput />
  </div>
</main>

<style>
</style>
