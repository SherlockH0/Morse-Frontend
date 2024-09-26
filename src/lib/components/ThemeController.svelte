<script>
  import Icon from "@iconify/svelte";
</script>

<label class="swap swap-rotate">
  <!-- this hidden checkbox controls the state -->
  <input type="checkbox" class="theme-controller" value="retro" />
  <Icon icon="ci:sun" class="swap-off size-6" />
  <Icon icon="ci:moon" class="swap-on size-6" />
</label>
