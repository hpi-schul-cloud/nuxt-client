<template>
	<empty-state
		image="content-empty"
		:image-alt="$t('pages.content.empty_state.error.img_alt')"
		:title="$t('pages.content.empty_state.error.title').toString()"
	>
		<template #description>
			<RenderHTML
				:html="$t('pages.content.empty_state.error.message').toString()"
				component="span"
			/>
		</template>
	</empty-state>
</template>

<script lang="ts">
import EmptyState from "@/components/molecules/EmptyState.vue";
import RenderHTML from "@/components/common/render-html/RenderHTML.vue";

export default {
	components: {
		EmptyState,
		RenderHTML,
	},
};
</script>
