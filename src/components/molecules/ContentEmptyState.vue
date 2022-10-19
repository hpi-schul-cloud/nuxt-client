<template>
	<empty-state
		image="@assets/img/empty-state/content-empty.svg"
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
export default {
	components: {
		EmptyState,
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>
