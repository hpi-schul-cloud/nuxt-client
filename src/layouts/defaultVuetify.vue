<template>
	<legacy-logged-in>
		<v-app class="content">
			<v-main>
				<v-container>
					<Nuxt />
				</v-container>
			</v-main>
		</v-app>
	</legacy-logged-in>
</template>

<script>
import LegacyLoggedIn from "@layouts/legacyLoggedIn";
import { VApp, VMain, VContainer } from "vuetify/lib";

export default {
	components: {
		LegacyLoggedIn,
		VApp,
		VMain,
		VContainer,
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.content {
	grid-area: content;
	width: inherit;
}
</style>
