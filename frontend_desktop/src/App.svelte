<script lang="ts">
  import { Router,Route} from "svelte-navigator";
  import appStore,{updateApp} from '@lib/stores/app'
  import Orders from '@views/Orders.svelte'
  import Order from "@components/orders/modals/Order.svelte";
  import Invoices from '@views/Invoices.svelte'
  import Users from '@views/Users.svelte'
  import Header from "./lib/components/app/Header.svelte";
  import { onMount } from "svelte";
  import { invoke } from "@tauri-apps/api/tauri";
  import { TauriCommands,AppState } from "./types";
import type { IJsonErrorResponse } from "@lib/models";
import LoginForm from "@components/app/login/LoginForm.svelte";
 
  onMount(async () => {
    try {
      if($appStore.state === "pending") {
     await invoke(TauriCommands.INIT_APPLICATION_CONFIG)
     await invoke(TauriCommands.IS_AUTHENTICATED)
    }
    } catch (err : unknown) {
      const jsonErrResponse = err as IJsonErrorResponse<AppState> 

      if(jsonErrResponse.error) {
        updateApp(jsonErrResponse.error)
      }
    }
   
  })
</script>

<Router >
  <Header/>
	<main>
    <!-- <Route path="invoices" component={Invoices} /> -->
    <Route path="orders/:id" let:params>
      <Order orderId={params.id} />
    </Route>
    <Route path="/orders" component={Orders} />

		<!-- <Route path="users" component={Users} /> -->
  </main>
</Router>
{#if $appStore.state === "unauthorized" }
<LoginForm /> 
{/if}
<style lang="scss">
  @import "./assets/scss/"
</style>