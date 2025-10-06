<template>
	<div ref="linkContentElementDisplay" data-testid="board-link-element" tabindex="-1">
		<ContentElementBar
			:has-grey-background="true"
			:icon="mdiLink"
			:has-row-style="!!imageUrl && isSmallOrLargerListBoard"
		>
			<template v-if="imageUrl" #display>
				<v-img
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
import { computed, ComputedRef, ref } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
	url: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		default: undefined,
	},
	isEditMode: { type: Boolean, required: true },
});

const hostname: ComputedRef<string> = computed(() => {
	try {
		const urlObject = new URL(props.url);
		return urlObject.hostname;
	} catch {
		return "";
	}
});

const linkContentElementDisplay = ref(null);

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();

const isSmallOrLargerListBoard = computed(() => smAndUp.value && isListLayout.value);
</script>

<style scoped>
a {
	text-decoration: none;
}
.menu {
	position: absolute;
	right: 10px;
	top: 10px;
	z-index: 100;
}
</style>
