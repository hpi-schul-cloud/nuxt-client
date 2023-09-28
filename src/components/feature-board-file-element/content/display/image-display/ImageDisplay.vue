<template>
	<div class="image-wrapper">
		<img
			class="rounded-t-sm image"
			loading="lazy"
			:src="previewUrl"
			:alt="alternativeText"
		/>
		<v-app-bar flat color="rgba(0, 0, 0, 0)" class="menu w-100">
			<v-spacer></v-spacer>
			<slot></slot>
		</v-app-bar>
	</div>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
	name: "ImageDisplay",
	props: {
		previewUrl: { type: String, required: true },
		name: { type: String, required: true },
		isEditMode: { type: Boolean, required: true },
		element: { type: Object as PropType<FileElementResponse>, required: true },
	},
	setup(props) {
		const i18n = injectStrict(I18N_KEY);

		const alternativeText = computed(() => {
			const altTranslation = i18n.t(
				"components.cardElement.fileElement.emptyAlt"
			);
			const altText = props.element.content.alternativeText
				? props.element.content.alternativeText
				: `${altTranslation} ${props.name}`;

			return altText;
		});

		return {
			alternativeText,
		};
	},
});
</script>

<style scoped>
.image-wrapper {
	min-height: 52px;
	display: flex;
	align-items: center;
}
.image {
	pointer-events: none;
	display: block;
	margin-right: auto;
	margin-left: auto;
}
.menu {
	position: absolute;
	top: 0px;
}
</style>
