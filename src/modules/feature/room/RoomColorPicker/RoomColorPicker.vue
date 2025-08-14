<template>
	<div role="radiogroup" aria-labelledby="room-color-label">
		<!-- Todo: clarify with UX if this should be a div or h2 -->
		<div id="room-color-label" class="d-flex mb-2">
			{{ t("common.words.color") }}
		</div>
		<div class="d-flex flex-wrap">
			<VBtn
				v-for="swatchColor in RoomColor"
				:key="swatchColor"
				class="rounded-circle elevation-3 ma-1 d-flex justify-center align-items-center"
				:class="`room-color--${swatchColor}`"
				height="40px"
				width="40px"
				min-width="40px"
				:data-testid="`color-swatch-${swatchColor}`"
				role="radio"
				:aria-label="ariaLabel"
				:aria-checked="isSelected(swatchColor)"
				@click="onUpdateColor(swatchColor)"
			>
				<VIcon
					v-if="isSelected(swatchColor)"
					:icon="mdiCheckCircleOutline"
					color="white"
				/>
			</VBtn>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { RoomColor } from "@/types/room/Room";
import { useI18n } from "vue-i18n";
import { mdiCheckCircleOutline } from "@icons/material";

const currentColor = defineModel("color", {
	type: String as PropType<RoomColor>,
	default: RoomColor.BlueGrey,
});

const { t } = useI18n();

const onUpdateColor = (color: RoomColor) => {
	currentColor.value = color;
};

const isSelected = (color: RoomColor) => {
	return color === currentColor.value;
};

const ariaLabel = computed(() => {
	const translatedColor = t(`common.words.color.${currentColor.value}`);
	return `${t("common.words.color")} ${translatedColor}`;
});
</script>
