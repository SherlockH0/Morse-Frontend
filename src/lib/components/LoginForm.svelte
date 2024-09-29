<script lang="ts">
  import type { AxiosResponse } from "axios";
  import Form from "./Form.svelte";

  import { ACCESS_TOKEN, REFRESH_TOKEN } from "../scripts/constants";
  import { isAuthenticatdStore } from "../scripts/auth";

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
  };

  async function onValid(res: AxiosResponse) {
    localStorage.setItem(ACCESS_TOKEN, res.data.access);
    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

    $isAuthenticatdStore = true;
  }
</script>

<Form route="/api/token/" name="Login" {fields} {onValid} />
