<template>
	<empty-state
		image="content-initial"
		:alt="$t('pages.content.init_state.img_alt')"
		:title="$t('pages.content.init_state.title')"
	>
		<template #description>
			<div class="initial-state-description">
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
		return {};
	},
};
</script>
<style scoped>
.initial-state-description {
	text-align: left;
}
</style>
