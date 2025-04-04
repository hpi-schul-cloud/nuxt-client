<template>
	<ContentElementBar
		:has-grey-background="true"
		:icon="mdiPresentation"
		:has-row-style="isSmallOrLargerListBoard"
	>
		<template #display>
			<v-img :src="imageSrc" alt="" cover />
		</template>
		<template #title>
			{{ $t("components.cardElement.drawingElement") }}
		</template>
		<template #menu>
			<slot />
		</template>
	</ContentElementBar>
</template>

<script setup lang="ts">
import image from "@/assets/img/tldraw.svg";
import { mdiPresentation } from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { computed, ref } from "vue";
import { injectStrict } from "@/utils/inject";
import { useDisplay } from "vuetify";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";

const imageSrc = image;

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();

const isSmallOrLargerListBoard = computed(() => {
	return smAndUp.value && isListLayout.value;
});
</script>
