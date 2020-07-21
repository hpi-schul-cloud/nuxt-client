<template>
	<empty-state
		image="@assets/img/empty-state/content-initial.svg"
		:alt="$t('pages.content.init_state.img_alt')"
		:title="getTitle"
	>
		<template v-slot:description>
			<div class="initial-state-description">
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
	props: {
		image: {
			type: String,
			default: "@assets/img/empty-state/content-initial.svg",
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
			return this.title || this.$t("pages.content.init_state.title");
		},
		getDescription() {
			return this.description || this.$t("pages.content.init_state.message");
		},
	},
};
</script>
<style scoped>
.initial-state-description {
	text-align: left;
}
</style>
