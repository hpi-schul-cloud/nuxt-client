<template>
	<v-custom-empty-state
		image="content-empty"
		:title="$t('pages.content.empty_state.error.title').toString()"
	>
		<template #description>
			<RenderHTML
				:html="$t('pages.content.empty_state.error.message').toString()"
				component="span"
			/>
		</template>
	</v-custom-empty-state>
</template>

<script lang="ts">
import vCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import { RenderHTML } from "@feature-render-html";

export default {
	components: {
		RenderHTML,
		vCustomEmptyState,
	},
};
</script>
