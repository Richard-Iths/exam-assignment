<script context="module" lang="ts" >
	import type {ErrorResponse, IAppConfig,IJsonApiBase} from "@lib/models"

</script>

<script lang="ts">
import { onMount } from "svelte";
import {invoke} from '@tauri-apps/api'
import { ErrorCodes } from "@lib/models/errors";
import Router from 'svelte-spa-router';
import routes from "@lib/routes/routes";
import AppConfig from "@components/app/configs/AppConfig.svelte";
import appStore, {updateApp} from "@lib/stores/app"
import AsideNav from "@components/app/nav/AsideNav.svelte";
import { TauriCommands } from "./types";

	onMount(async () => {
		try {
			const res = await invoke<IJsonApiBase<IAppConfig>>(TauriCommands.INIT_APPLICATION_CONFIG)

			console.log(res.data);			
			
		} catch (err : unknown) {
			const {data} = err as IJsonApiBase<ErrorResponse>;
				console.log(data,"err");
			if(data.some(e => e.attributes.statusCode == ErrorCodes.EMPTY_CONFIG_FILE)) {
				updateApp("uninitialized")
			}
		}
	})

</script>
<div class="wrapper">

	<AsideNav/>
	<main>
		<Router {routes} />
	</main>
	{#if $appStore.state === "uninitialized"}
	<AppConfig />
	{/if}
</div>


<style lang="scss">
	@import "./assets/scss";
	.wrapper {
		display: grid;
		grid-template-columns: 10rem auto;
		grid-template-rows: 100%;
		border:2px solid #000;
		min-height: 100vh;
		main {
			min-height: 99%;
		}
	}
</style>