<script lang="ts">
  import Form from "./Form.svelte";
  import type { AxiosResponse } from "axios";
  import { ACCESS_TOKEN, REFRESH_TOKEN } from "../scripts/constants";
  import api from "../scripts/api";
  import { isAuthenticatedStore } from "../scripts/auth";

  const fields: any = {
    username: {
      placeholder: "Username",
      type: "text",
      required: true,
    },
    password: {
      placeholder: "Password",
      type: "password",
      required: true,
    },
    confirm_password: {
      placeholder: "Confirm Password",
      type: "password",
      required: true,
    },
  };
  let errors: Record<string, string[]> = {};
  let values: Record<string, any> = {};

  function clean(formData: Record<string, any>): object {
    let password = formData.password;
    let username = formData.username;
    let passwordConfirmation = formData.confirm_password;

    if (passwordConfirmation != password) {
      errors.confirm_password = [];
      errors.confirm_password[0] = "The password confirmation does not match";

      throw "Field error";
    }

    localStorage.setItem(ACCESS_TOKEN, "");
    localStorage.setItem(REFRESH_TOKEN, "");

    return { password, username };
  }

  async function onValid(res: AxiosResponse) {
    let login = await api.post("/api/token/", values);

    localStorage.setItem(ACCESS_TOKEN, login.data.access);
    localStorage.setItem(REFRESH_TOKEN, login.data.refresh);

    $isAuthenticatedStore = true;
  }
</script>

<Form
  route="/api/user/register/"
  name="Register"
  {fields}
  {errors}
  {values}
  {clean}
  {onValid}
/>
