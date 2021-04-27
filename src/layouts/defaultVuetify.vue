<template>
	<legacy-logged-in>
		<v-app class="content">
			<v-main>
				<Nuxt />
			</v-main>
		</v-app>
	</legacy-logged-in>
</template>

<script>
import LegacyLoggedIn from "@layouts/legacyLoggedIn";
import { VApp, VMain } from "vuetify/lib";

export default {
	components: {
		LegacyLoggedIn,
		VApp,
		VMain,
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
