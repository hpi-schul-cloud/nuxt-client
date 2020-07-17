<template>
	<empty-state
		:image="image"
		:image-alt="$t('pages.content.empty_state.error.img_alt')"
		:title="$t('pages.content.empty_state.error.title')"
	>
		<template v-slot:description>
			<span v-html="$t('pages.content.empty_state.error.message')" />
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
			required: false
		}
	}
};
</script>
