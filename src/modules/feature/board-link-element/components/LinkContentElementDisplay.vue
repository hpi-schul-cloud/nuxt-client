<template>
	<div
		data-testid="board-link-element"
		ref="linkContentElementDisplay"
		tabindex="-1"
	>
		<ContentElementBar
			:hasGreyBackground="true"
			:icon="mdiLink"
			:hasRowStyle="!!imageUrl && isSmallorLargerListBoard"
		>
			<template #display v-if="imageUrl">
				<v-img :src="imageUrl" alt="" class="rounded-t" />
			</template>
			<template #title>
				{{ title }}
			</template>
			<template #subtitle>
				{{ hostname }}
			</template>
			<template #menu v-if="isEditMode">
				<slot />
			</template>
		</ContentElementBar>
	</div>
</template>

<script setup lang="ts">
import { ComputedRef, computed, ref } from "vue";
import { mdiLink } from "@mdi/js";
import { ContentElementBar } from "@ui-board";
import { injectStrict } from "@/utils/inject";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";

const props = defineProps({
	url: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		require: true,
	},
	imageUrl: {
		type: String,
		required: false,
	},
	isEditMode: { type: Boolean, required: true },
});

const hostname: ComputedRef<string> = computed(() => {
	try {
		const urlObject = new URL(props.url);
		return urlObject.hostname;
	} catch (e) {
		return "";
	}
});

const linkContentElementDisplay = ref(null);

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();

const isSmallorLargerListBoard = computed(() => {
	return smAndUp.value && isListLayout.value;
});
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
