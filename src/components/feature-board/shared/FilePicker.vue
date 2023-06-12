<template>
	<div>
		<v-file-input v-show="false" ref="inputRef" v-model="modelFile" />
	</div>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
	name: "FilePicker",
	components: {},
	props: {
		isFilePickerOpen: { type: Boolean, required: true },
	},
	emits: ["update:file"],
	setup(props, { emit }) {
		const inputRef = ref();
		const modelFile = ref();
		const isFilePickerOpen = useVModel(props, "isFilePickerOpen", emit);

		onMounted(() => {
			inputRef.value.$refs.input.onclick = (e: Event) => {
				e.stopPropagation();
			};
		});

		watch(
			() => props.isFilePickerOpen,
			(newValue: boolean) => {
				if (newValue) {
					inputRef.value.$refs.input.click();
				}

				isFilePickerOpen.value = false;
			}
		);

		watch(modelFile, (newValue) => {
			if (newValue) {
				emit("update:file", newValue);
			}
		});

		return {
			inputRef,
			modelFile,
		};
	},
});
</script>
