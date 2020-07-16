<template>
	<empty-state
		:image="require('@assets/img/edusharing/SC_Search-Results_Empty-State.svg')"
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
};
</script>
