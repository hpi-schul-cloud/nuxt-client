<template>
	<div>
		<SkipLink />
		<VMain id="main-content">
			<ApplicationError>
				<AlertContainer />
				<RouterView />
			</ApplicationError>
		</VMain>
		<KeepAlive>
			<AutoLogoutWarning />
		</KeepAlive>
	</div>
</template>

<script setup lang="ts">
import { AutoLogoutWarning } from "@feature-auto-logout";
import { AlertContainer, ApplicationError } from "@ui-layout";
import { SkipLink } from "@ui-skip-link";
import { RouterView } from "vue-router";
</script>
