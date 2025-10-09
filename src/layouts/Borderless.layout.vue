<template>
	<div>
		<SkipLink />
		<VMain id="main-content">
			<ApplicationError>
				<AlertContainer />
				<RouterView />
			</ApplicationError>
		</VMain>
		<LoadingStateDialog />
		<KeepAlive>
			<AutoLogoutWarning />
		</KeepAlive>
	</div>
</template>

<script setup lang="ts">
import AlertContainer from "@/components/molecules/AlertContainer.vue";
import ApplicationError from "@/components/molecules/ApplicationError.vue";
import { AutoLogoutWarning } from "@feature-auto-logout";
import { LoadingStateDialog } from "@ui-loading-state-dialog";
import { SkipLink } from "@ui-skip-link";
import { RouterView } from "vue-router";
</script>
