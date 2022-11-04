<template>
	<empty-state
		:image="emptyStateImage"
		:image-alt="$t('pages.content.empty_state.error.img_alt')"
		:title="$t('pages.content.empty_state.error.title')"
	>
		<template #description>
			<!-- eslint-disable vue/no-v-html -->
			<span v-html="$t('pages.content.empty_state.error.message')" />
		</template>
	</empty-state>
</template>

<script>
import EmptyState from "@/components/molecules/EmptyState";
import emptyStateImage from "@/assets/img/empty-state/content-empty.svg";
export default {
	components: {
		EmptyState,
	},
	data() {
		return {
			emptyStateImage,
		};
	},
};
</script>
