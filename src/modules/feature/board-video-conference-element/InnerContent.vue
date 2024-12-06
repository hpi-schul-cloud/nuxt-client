<template>
	<ContentElementBar
		:hasGreyBackground="true"
		:icon="mdiVideo"
		:has-row-style="isSmallOrLargerListBoard"
	>
		<template #display>
			<v-img :src="imageSrc" alt="" cover />
		</template>
		<template #title>
			{{ title }}
		</template>
		<template #menu>
			<slot />
		</template>
	</ContentElementBar>
</template>

<script setup lang="ts">
import image from "@/assets/img/videoConference.svg";
import { mdiVideo } from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { computed, ref } from "vue";
import { injectStrict } from "@/utils/inject";
import { useDisplay } from "vuetify";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";

const imageSrc = image;

defineProps({
	title: {
		type: String,
		require: true,
	},
});

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();

const isSmallOrLargerListBoard = computed(() => {
	return smAndUp.value && isListLayout.value;
});
</script>
