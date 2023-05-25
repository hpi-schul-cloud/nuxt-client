<template>
	<empty-state
		image="content-initial"
		:alt="$t('pages.content.init_state.img_alt').toString()"
		:title="$t('pages.content.init_state.title').toString()"
	>
		<template #description>
			<div class="initial-state-description">
				<RenderHTML
					:html="$t('pages.content.init_state.message').toString()"
					component="span"
				/>
			</div>
		</template>
	</empty-state>
</template>

<script lang="ts">
import EmptyState from "@/components/molecules/EmptyState.vue";
import RenderHTML from "@/components/render-html/RenderHTML.vue";

export default {
	components: {
		EmptyState,
		RenderHTML,
	},
};
</script>

<style scoped>
.initial-state-description {
	text-align: left;
}
</style>
