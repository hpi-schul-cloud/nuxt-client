<template>
	<VBtn
		class="color-swatch rounded-circle elevation-3 ma-1 d-flex justify-center align-items-center"
		:class="`room-color--${color}`"
		:data-testid="`color-swatch-${color}`"
		role="radio"
		:aria-label="ariaLabel"
		:aria-checked="isSelected"
		@click="emit('update:color', color)"
	>
		<VIcon v-if="isSelected" :icon="mdiCheckCircleOutline" color="white" />
	</VBtn>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { mdiCheckCircleOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
import { RoomColor } from "@/types/room/Room";

const props = defineProps({
	color: {
		type: String as PropType<RoomColor>,
		default: RoomColor.BlueGrey,
	},
	isSelected: {
		type: Boolean,
	},
});

const emit = defineEmits<{
	(e: "update:color", color: RoomColor): void;
}>();

const { t } = useI18n();

const ariaLabel = computed(() => {
	const translatedColor = t(`common.words.color.${props.color}`);
	return `${t("common.words.color")} ${translatedColor}`;
});
</script>

<style scoped>
.color-swatch {
	width: 40px;
	min-width: 40px;
	height: 40px;
}
</style>
