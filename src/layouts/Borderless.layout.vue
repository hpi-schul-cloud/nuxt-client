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
			<LoggedOutDialog />
		</KeepAlive>
	</div>
</template>

<script setup lang="ts">
import { AutoLogoutWarning, LoggedOutDialog } from "@feature-auto-logout";
import { AlertContainer, ApplicationError } from "@ui-layout";
import { LoadingStateDialog } from "@ui-loading-state-dialog";
import { SkipLink } from "@ui-skip-link";
import { RouterView } from "vue-router";
</script>
