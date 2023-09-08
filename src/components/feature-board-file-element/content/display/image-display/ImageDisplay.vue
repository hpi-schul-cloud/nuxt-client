<template>
	<div>
		<v-img class="rounded-t-sm" :src="previewUrl" :alt="alternativeText">
			<div v-if="isEditMode" class="menu-background"></div>
		</v-img>
		<AlternativeText v-if="isEditMode" :element="element"></AlternativeText>
	</div>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { computed, defineComponent, PropType } from "vue";
import AlternativeText from "./AlternativeText.vue";

export default defineComponent({
	name: "ImageDisplay",
	components: {
		AlternativeText,
	},
	props: {
		previewUrl: { type: String, required: true },
		name: { type: String, required: true },
		isEditMode: { type: Boolean, required: true },
		element: { type: Object as PropType<FileElementResponse>, required: true },
	},
	setup(props) {
		const alternativeText = computed(() => {
			return props.element.content.alternativeText
				? props.element.content.alternativeText
				: `Hier ist ein Bild mit folgendem Namen ${props.name}`;
		});

		return {
			alternativeText,
		};
	},
});
</script>

<style scoped>
.menu-background {
	position: absolute;
	width: 100%;
	height: 52px;
	background-color: var(--v-white-base);
	opacity: 80%;
}
</style>
