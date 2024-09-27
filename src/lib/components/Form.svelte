<script>
  export let action;
  export let method;
</script>

<form {action} {method} class="form-control gap-4">
  <slot />
</form>
