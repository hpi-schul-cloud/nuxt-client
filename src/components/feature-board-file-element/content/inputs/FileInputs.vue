<template>
	<div v-if="isEditMode">
		<CaptionText
			:caption="fileProperties.element.content.caption"
			@update:caption="onUpdateCaption"
		></CaptionText>
		<AlternativeText
			v-if="fileProperties.previewUrl"
			:text="fileProperties.element.content.alternativeText"
			@update:text="onUpdateText"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FileProperties } from "../../shared/types/file-properties";
import AlternativeText from "./alternative-text/AlternativeText.vue";
import CaptionText from "./caption/CaptionText.vue";

export default defineComponent({
	name: "FileInputs",
	components: {
		AlternativeText,
		CaptionText,
	},
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: ["update:alternativeText", "update:caption"],
	setup(props, { emit }) {
		const onUpdateCaption = (value: string) => emit("update:caption", value);
		const onUpdateText = (value: string) =>
			emit("update:alternativeText", value);

		return { onUpdateText, onUpdateCaption };
	},
});
</script>
