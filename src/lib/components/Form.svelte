<!--
@component

Generic form component.

# Props:
- `route: string` - **required**. The api route the data will be posted to.
- `name: string` - **required**. The form name
- `fields: Record<string, any>` - **required**. The form fields that will be displayed:
```js
fields = {
  field_name: {
    placeholder: "Field Name",
    type: "text",
    required: true,
  },
}
```
- `errors: Record<string, any>`. All the fields' errors. Key `detail` is used to display form errors (not bound to a specific field) (for django compatibility)
- `values: Record<string, any>`. Values of form fields.

- `clean: Function`. Will be run before sending the form data to the backend and can be use to validate form data. If there are any validation errors, should raise a `ValidationError` error Returns clean form data of type `object`
- `onValid: Function`. Will be run after reciving the response from the server. It recieves the response object and can be used, for example, to save user data to local storage.
-->

<script lang="ts">
  import type { AxiosResponse } from "axios";

  import Icon from "@iconify/svelte";

  import Input from "./Input.svelte";

  import api from "../scripts/api";

  export let route: string;
  export let name: string;

  export let fields: Record<string, any>;
  export let errors: Record<string, any> = {};
  export let values: Record<string, any> = {};

  export let clean = (formData: object): object => {
    return formData;
  };

  export let onValid = async (res: AxiosResponse) => {};

  let loading: boolean;

  async function handleSubmit() {
    loading = true;
    errors = {};

    try {
      let cleanData = clean(values);

      const res = await api.post(route, cleanData);

      onValid(res);
    } catch (err: any) {
      if (err != "Field error" && err.request) {
        errors = JSON.parse(err.request.response);
      } else {
        console.log(err);
      }
    } finally {
      loading = false;
    }
  }
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="relative flex flex-col gap-4"
>
  {#if loading}
    <div
      class="absolute inset-0 z-50 grid place-items-center bg-base-100/30 p-6"
    >
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  {/if}
  {#if errors.detail}
    <div role="alert" class="alert alert-error">
      <Icon icon="ci:close-circle" class="h-6 w-6 shrink-0 stroke-current" />
      <span>{errors.detail}</span>
    </div>
  {/if}
  {#each Object.entries(fields) as [name, args]}
    <Input {name} {args} error={errors[name]} bind:value={values[name]} />
  {/each}
  <button class="btn btn-neutral w-full">{name}</button>
</form>
