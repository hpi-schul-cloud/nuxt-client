<template>
	<div v-if="isEditMode" class="px-4 pt-4">
		<CaptionText
			:caption="fileProperties.element.content.caption"
			@update:caption="onUpdateCaption"
		/>
		<AlternativeText
			v-if="fileProperties.previewUrl && !hasPdfMimeType"
			:alternativeText="fileProperties.element.content.alternativeText"
			@update:alternativeText="onUpdateText"
		/>
	</div>
</template>

<script lang="ts">
import { isPdfMimeType } from "@/utils/fileHelper";
import { computed, defineComponent, PropType } from "vue";
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

		const hasPdfMimeType = computed(() =>
			isPdfMimeType(props.fileProperties.mimeType)
		);

		return { onUpdateText, onUpdateCaption, hasPdfMimeType };
	},
});
</script>
