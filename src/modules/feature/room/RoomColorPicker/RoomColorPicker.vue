<template>
	<div id="room-color-label" class="d-flex mb-2">
		{{ t("common.words.color") }}
	</div>
	<VRadioGroup v-model="currentColor" aria-labelledby="room-color-label" inline>
		<VRadio
			v-for="swatchColor in RoomColor"
			:key="swatchColor"
			:value="swatchColor"
			:aria-label="t(`common.words.color.${swatchColor}`)"
			:data-testid="`color-swatch-${swatchColor}`"
			class="color-swatch-option rounded-circle elevation-3 ma-1 d-flex justify-center align-items-center"
			:class="`room-color--${swatchColor}`"
			color="white"
			:true-icon="mdiCheckCircleOutline"
			false-icon=""
		/>
	</VRadioGroup>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { RoomColor } from "@/types/room/Room";
import { useI18n } from "vue-i18n";
import { mdiCheckCircleOutline } from "@icons/material";

const currentColor = defineModel("color", {
	type: String as PropType<RoomColor>,
	default: RoomColor.BlueGrey,
});

const { t } = useI18n();
</script>
<style lang="scss" scoped>
.color-swatch-option:has(input:focus) {
	outline: 5px auto Highlight; // Firefox
	outline: 5px auto -webkit-focus-ring-color; // Chrome/Safari
	outline-offset: 2px;
}
</style>
