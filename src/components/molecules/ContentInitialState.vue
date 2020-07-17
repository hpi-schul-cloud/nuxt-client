<template>
	<empty-state
		:image="image"
		:alt="$t('pages.content.init_state.img_alt')"
		:title="$t('pages.content.init_state.title')"
	>
			<template v-slot:description>
				<div class="initial-state-description">
					<span  v-html="$t('pages.content.init_state.message')" />
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
			required: false
		}
	}
};
</script>
<style scoped>
	.initial-state-description{
		text-align: left;
	}
</style>
