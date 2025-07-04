<template>
	<ContentElementBar>
		<template #display>
			<v-img :src="imageSrc" alt="" cover />
		</template>
	</ContentElementBar>
</template>

<script setup lang="ts">
import image from "@/assets/img/tldraw.svg";
import { ContentElementBar } from "@ui-board";

const imageSrc = image;
</script>
