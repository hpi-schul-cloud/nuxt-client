<template>
	<ContentElementBar>
		<template #display>
			<v-img :src="imageSrc" alt="" cover />
		</template>
		<template v-if="showMenu" #menu><slot /></template>
	</ContentElementBar>
</template>

<script setup lang="ts">
import image from "@/assets/img/collabora.svg";
import { ContentElementBar } from "@ui-board";

type Props = {
	showMenu: boolean;
};

defineProps<Props>();

const imageSrc = image;
</script>
