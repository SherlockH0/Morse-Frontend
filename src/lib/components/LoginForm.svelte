<script>
  import Form from "./Form.svelte";
</script>

<Form>
  <input
    type="text"
    placeholder="Username"
    name="username"
    class="input input-bordered w-full"
    required
  />
  <input
    type="password"
    placeholder="Password"
    name="password"
    class="input input-bordered w-full"
    required
  />
  <button class="btn btn-neutral w-full">Login</button>
</Form>
