<template>
	<div data-testid="board-link-element" tabindex="-1">
		<ContentElementBar :icon="mdiLink" :has-row-style="!!imageUrl && isSmallOrLargerListBoard">
			<template v-if="imageUrl" #display>
				<!-- img only: object, embed, and iframe would run script in a stored SVG (SVSDEV-470). -->
				<img
					class="link-preview-image"
					:class="{ 'link-preview-image--cover': isSmallOrLargerListBoard }"
					:src="imageUrl"
					alt=""
					data-testid="link-preview-image"
				/>
			</template>
			<template #title>
				{{ title }}
			</template>
			<template #subtitle>
				{{ hostname }}
			</template>
			<template v-if="isEditMode" #menu>
				<slot />
			</template>
		</ContentElementBar>
	</div>
</template>

<script setup lang="ts">
import { injectStrict } from "@/utils/inject";
import { mdiLink } from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps<{
	url: string;
	title: string;
	imageUrl?: string;
	isEditMode: boolean;
	isDetailView?: boolean;
}>();

const hostname = computed<string>(() => {
	try {
		const urlObject = new URL(props.url);
		return urlObject.hostname;
	} catch {
		return "";
	}
});

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();

const isSmallOrLargerListBoard = computed(() => smAndUp.value && (isListLayout.value || props.isDetailView));
</script>

<style scoped lang="scss">
.link-preview-image {
	display: block;
	width: 100%;
	height: auto;
}

.link-preview-image--cover {
	aspect-ratio: 1.77777;
	object-fit: cover;
}
</style>
