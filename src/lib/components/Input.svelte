<script>
  export let name;
  export let args;
  export let error;
  export let value;
</script>

<label class="form-control w-full">
  <div class="label">
    <span class="label-text">{args.placeholder}</span>
  </div>
  <input
    {name}
    {...args}
    bind:value
    class="input input-bordered w-full"
    class:input-error={error != undefined}
  />
  {#if error}
    <div class="label">
      <span class="label-text-alt">{error}</span>
    </div>
  {/if}
</label>
