<template>
	<div>
		<SkipLink />
		<VMain id="main-content">
			<ApplicationErrorWrapper>
				<AlertContainer />
				<RouterView />
			</ApplicationErrorWrapper>
		</VMain>
		<LoadingStateDialog />
		<KeepAlive>
			<AutoLogoutWarning />
		</KeepAlive>
	</div>
</template>

<script setup lang="ts">
import AlertContainer from "@/components/molecules/AlertContainer.vue";
import ApplicationErrorWrapper from "@/components/molecules/ApplicationErrorWrapper.vue";
import { AutoLogoutWarning } from "@feature-auto-logout";
import { LoadingStateDialog } from "@ui-loading-state-dialog";
import { SkipLink } from "@ui-skip-link";
import { RouterView } from "vue-router";
</script>
