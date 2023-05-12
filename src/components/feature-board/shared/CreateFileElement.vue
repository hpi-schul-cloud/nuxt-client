<template>
	<v-file-input v-show="false" ref="openFilePicker" v-model="file" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
	name: "CreateFileELement",
	components: {},
	props: {
		show: { type: Boolean, required: true },
	},
	setup(props) {
		const isFilePickerOpen = ref(props.show);
		const openFilePicker: any = ref(null);
		const file = ref(null);

		watch(
			() => props.show,
			(newValue: boolean) => {
				if (newValue) {
					openFilePicker.value.$refs.input.click();
					isFilePickerOpen.value = false;
				}
			}
		);

		return {
			openFilePicker,
			file,
		};
	},
});
</script>
