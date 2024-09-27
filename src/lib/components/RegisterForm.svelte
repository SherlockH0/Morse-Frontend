<script>
  import Form from "./Form.svelte";
</script>

<Form>
  <input
    type="text"
    placeholder="Username"
    name="username"
    class="input input-bordered w-full"
  />
  <input
    type="password"
    placeholder="Password"
    name="password"
    class="input input-bordered w-full"
  />
  <input
    type="password"
    placeholder="Confirm Password"
    name="confirm_password"
    class="input input-bordered w-full"
  />
  <button class="btn btn-neutral w-full">Register</button>
</Form>
