<template>
	<div>
		<FileContentElementDisplay
			v-if="!isEditMode"
			:caption="modelValue.caption"
		></FileContentElementDisplay>
		<FileContentElementEdit
			v-if="isEditMode"
			:autofocus="isAutoFocus"
			:caption="modelValue.caption"
			@update:caption="($event) => (modelValue.caption = $event)"
		></FileContentElementEdit>
	</div>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { defineComponent, PropType } from "vue";
import { useContentElementState } from "../state/ContentElementState.composable";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";

export default defineComponent({
	name: "FileContentElement",
	components: {
		FileContentElementDisplay,
		FileContentElementEdit,
	},
	props: {
		element: { type: Object as PropType<FileElementResponse>, required: true },
		isEditMode: { type: Boolean, required: true },
	},
	setup(props) {
		const { modelValue, isAutoFocus } = useContentElementState(props);
		const fileRecordModel = true;
		return { modelValue, isAutoFocus, fileRecordModel };
	},
});
</script>
