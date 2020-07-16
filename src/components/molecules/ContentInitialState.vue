<template>
	<empty-state
		:image="require('@assets/img/edusharing/ContentInitialState.jpg')"
		:image-alt="$t('pages.content.init_state.img_alt')"
		:title="$t('pages.content.init_state.title')"
	>
		<template v-slot:description>
			<span v-html="$t('pages.content.init_state.message')" />
		</template>
	</empty-state>
</template>

<script>
import EmptyState from "@components/molecules/EmptyState";
export default {
	components: {
		EmptyState,
	},
};
</script>
