<template>
	<ContentElementBar>
		<template #display>
			<div
				:class="{
					'interactive-cursor': isEditMode,
					'content-element-display-activatable': isEditMode,
				}"
				@click="onActivate"
			>
				<v-img :src="imageSrc" alt="" cover :aria-label="ariaLabel" />
			</div>
		</template>
		<template v-if="showMenu" #menu><slot /></template>
	</ContentElementBar>
</template>

<script setup lang="ts">
import image from "@/assets/img/collabora.svg";
import { ContentElementBar } from "@ui-board";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	showMenu: boolean;
	isEditMode: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "activate", event: Event): void;
}>();

const { t } = useI18n();
const imageSrc = image;

const ariaLabel = computed(
	() => `${t("components.cardElement.fileElement.collaboraFile")}, ${t("common.ariaLabel.newTab")}`
);

const onActivate = (event: Event) => {
	if (!props.isEditMode) {
		return;
	}

	event.stopPropagation();
	emit("activate", event);
};
</script>

<style scoped>
.interactive-cursor {
	cursor: pointer;
}
</style>
