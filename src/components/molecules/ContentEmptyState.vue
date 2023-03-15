<template>
	<empty-state
		image="content-empty"
		:image-alt="$t('pages.content.empty_state.error.img_alt')"
		:title="$t('pages.content.empty_state.error.title')"
	>
		<template #description>
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
		return {};
	},
};
</script>
