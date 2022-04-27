<script lang="ts">
import UsersTable from "@components/users/tables/UsersTable.svelte";
import { invoke } from "@tauri-apps/api/tauri";
import { onMount } from "svelte";
import type {User} from "@src/types";
let users : User[] = []
onMount(async  () => {
 const res : User[] = await invoke("init_users");
 users = [...res]
})
</script>

<section>
  <UsersTable users={users}/>
</section>