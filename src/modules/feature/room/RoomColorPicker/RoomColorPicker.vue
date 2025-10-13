<template>
	<div :id="roomColorLabelId" class="d-flex mb-2">
		{{ t("common.words.color") }}
	</div>
	<VRadioGroup v-model="currentColor" :aria-labelledby="roomColorLabelId" inline>
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
import { RoomColor } from "@/types/room/Room";
import { mdiCheckCircleOutline } from "@icons/material";
import { PropType } from "vue";
import { useI18n } from "vue-i18n";

const roomColorLabelId = "room-color-label";

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
