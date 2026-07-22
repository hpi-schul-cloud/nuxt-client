<template>
	<div data-testid="board-link-element" tabindex="-1">
		<ContentElementBar :icon="mdiLink" :has-row-style="!!imageUrl && isSmallOrLargerListBoard">
			<template v-if="imageUrl" #display>
				<VImg
					:src="imageUrl"
					alt=""
					:aspect-ratio="isSmallOrLargerListBoard ? 1.77777 : undefined"
					:cover="isSmallOrLargerListBoard"
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

const isSmallOrLargerListBoard = computed(() => smAndUp.value && isListLayout.value);
</script>
