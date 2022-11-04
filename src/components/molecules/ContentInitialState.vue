<template>
	<empty-state
		:image="contentInitialImage"
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
import contentInitialImage from "@/assets/img/empty-state/content-initial.svg";
export default {
	components: {
		EmptyState,
	},
	data() {
		return {
			contentInitialImage,
		};
	},
};
</script>
<style scoped>
.initial-state-description {
	text-align: left;
}
</style>
