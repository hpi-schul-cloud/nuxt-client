<template>
	<empty-state
		image="@assets/img/empty-state/content-empty.svg"
		:image-alt="$t('pages.content.empty_state.error.img_alt')"
		:title="getTitle"
	>
		<template v-slot:description>
			<!-- eslint-disable vue/no-v-html -->
			<span v-html="getDescription" />
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
			return this.$t("pages.content.empty_state.error.title");
		},
		getDescription() {
			return this.$t("pages.content.empty_state.error.message");
		},
	},
};
</script>
