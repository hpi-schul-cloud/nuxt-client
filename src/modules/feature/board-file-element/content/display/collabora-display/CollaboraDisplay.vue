<template>
	<ContentElementBar>
		<template #display>
			<v-img :src="imageSrc" alt="" cover :aria-label="ariaLabel" />
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
};

defineProps<Props>();

const { t } = useI18n();
const imageSrc = image;

const ariaLabel = computed(
	() => `${t("components.cardElement.fileElement.collaboraFile")}, ${t("common.ariaLabel.newTab")}`
);
</script>
