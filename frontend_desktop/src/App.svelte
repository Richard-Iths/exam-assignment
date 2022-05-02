<script context="module" lang="ts" >
	import type {IJsonErrorResponse} from "@lib/models"
	import type {AppState} from '@src/types'

</script>

<script lang="ts">
import { onMount } from "svelte";
import {invoke} from '@tauri-apps/api'
import Router from 'svelte-spa-router';
import routes from "@lib/routes/routes";
import AppConfig from "@components/app/configs/AppConfig.svelte";
import appStore, {updateApp} from "@lib/stores/app"
import AsideNav from "@components/app/nav/AsideNav.svelte";
import { TauriCommands } from "./types";
import Login from "@lib/components/app/login/Login.svelte";

	onMount(async () => {
		try {
			await invoke(TauriCommands.INIT_APPLICATION_CONFIG)
			await invoke(TauriCommands.IS_AUTHENTICATED)
		} catch (err : unknown) {
			const {error} = err as IJsonErrorResponse<AppState>;
			if(error === "uninitialized") {
				updateApp("uninitialized")
			}
			if(error === "unauthorized") {
				updateApp("unauthorized")
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
	{#if $appStore.state === "unauthorized"}
	<Login />
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