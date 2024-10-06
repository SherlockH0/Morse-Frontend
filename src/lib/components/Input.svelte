<!--
@component
Input field.

@prop name;
@prop args;
@prop errors: string[];
@prop value: string;
@prop join = false;
 -->
<script lang="ts">
  export let name;
  export let args;
  export let errors: string[];
  export let value: string;
  export let join = false;
</script>

<label class="form-control" class:join-item={join}>
  <input
    {name}
    {...args}
    bind:value
    class="input input-bordered w-full"
    class:input-error={errors != undefined}
  />
  {#if errors}
    <div class="label">
      <span class="label-text-alt">
        <ul>
          {#each errors as error}
            <li>{error}</li>
          {/each}
        </ul>
      </span>
    </div>
  {/if}
</label>
