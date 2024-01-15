<template>
	<v-custom-empty-state
		image="content-initial"
		:title="$t('pages.content.init_state.title').toString()"
	>
		<template #description>
			<div class="d-flex justify-center">
				<RenderHTML
					:html="$t('pages.content.init_state.message').toString()"
					component="span"
					class="initial-state-description"
				/>
			</div>
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

<style scoped>
.initial-state-description {
	text-align: left;
	width: calc(2 * var(--size-content-width-min));
}
</style>
