<script lang="ts">
  import RegisterForm from "./RegisterForm.svelte";
  import LoginForm from "./LoginForm.svelte";
</script>

<section class="grid h-svh w-full place-items-center">
  <div class="w-80 md:w-96">
    <h1 class="mb-6 text-3xl font-bold">Login or Register to&nbsp;Continue</h1>
    <div role="tablist" class="tabs tabs-lifted tabs-lg">
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        class="tab"
        aria-label="Login"
        checked
      />
      <div
        role="tabpanel"
        class="tab-content rounded-box border-base-300 bg-base-100 p-6"
      >
        <LoginForm />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        class="tab"
        aria-label="Register"
      />
      <div
        role="tabpanel"
        class="tab-content rounded-box border-base-300 bg-base-100 p-6"
      >
        <RegisterForm />
      </div>
    </div>
  </div>
</section>
