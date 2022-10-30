<template>
	<empty-state
		image="@/assets/img/empty-state/content-initial.svg"
		:alt="$t('pages.content.init_state.img_alt')"
		:title="$t('pages.content.init_state.title')"
	>
		<template #description>
			<div class="initial-state-description">
				<!-- eslint-disable vue/no-v-html -->
				<span v-html="$t('pages.content.init_state.message')" />
			</div>
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
<style scoped>
.initial-state-description {
	text-align: left;
}
</style>
