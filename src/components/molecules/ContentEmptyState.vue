<template>
	<empty-state
		:image="image"
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
	props: {
		image: {
			type: String,
			default: "@assets/img/empty-state/content-empty.svg",
			required: false,
		},
		title: {
			type: String,
			default: null,
			required: false,
		},
		description: {
			type: String,
			default: null,
			required: false,
		},
	},
	computed: {
		getTitle() {
			return this.title || this.$t("pages.content.empty_state.error.title");
		},
		getDescription() {
			return (
				this.description || this.$t("pages.content.empty_state.error.message")
			);
		},
	},
};
</script>
