<template>
	<v-overlay z-index="1000" :value="isLightBoxOpen">
		<div class="d-flex flex-column align-items-center justify-content-center">
			<img
				style="max-height: 90vh; max-width: 90vw"
				loading="lazy"
				:src="url"
				:alt="alt"
				v-click-outside="close"
			/>
		</div>
	</v-overlay>
</template>

<script lang="ts">
import { mdiClose } from "@mdi/js";
import { computed, defineComponent } from "vue";
import { useInternalLightBox } from "./LightBox.composable";

export default defineComponent({
	name: "LightBox",
	setup() {
		const { close, isLightBoxOpen, lightBoxOptions } = useInternalLightBox();

		const url = computed(() =>
			lightBoxOptions.value ? lightBoxOptions.value.url : ""
		);

		const alt = computed(() =>
			lightBoxOptions.value ? lightBoxOptions.value.alt : ""
		);

		const name = computed(() =>
			lightBoxOptions.value ? lightBoxOptions.value.name : ""
		);

		return {
			alt,
			close,
			isLightBoxOpen,
			mdiClose,
			name,
			url,
		};
	},
});
</script>

<style scoped>
.container {
	width: 100vw;
	height: 100vh;
	padding: 5vh 5vw;
}
</style>
