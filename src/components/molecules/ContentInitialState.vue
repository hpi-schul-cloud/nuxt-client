<template>
	<empty-state
		image="@assets/img/empty-state/content-initial.svg"
		:alt="$t('pages.content.init_state.img_alt')"
		:title="getTitle"
	>
		<template v-slot:description>
			<div class="initial-state-description">
				<!-- eslint-disable vue/no-v-html -->
				<span v-html="getDescription" />
			</div>
		</template>
	</empty-state>
</template>

<script>
import EmptyState from "@components/molecules/EmptyState";
export default {
	components: {
		EmptyState,
	},
	computed: {
		getTitle() {
			return this.$t("pages.content.init_state.title");
		},
		getDescription() {
			return this.$t("pages.content.init_state.message");
		},
	},
};
</script>
<style scoped>
.initial-state-description {
	text-align: left;
}
</style>
