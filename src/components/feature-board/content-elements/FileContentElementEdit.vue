<template>
	<vTextField v-model="modelCaption" label="Caption"></vTextField>
</template>
<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent } from "vue";

export default defineComponent({
	name: "FileContentElementEdit",
	props: {
		caption: {
			type: String,
			required: true,
		},
		autofocus: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["update:caption"],
	setup(props, { emit }) {
		const modelCaption = useVModel(props, "caption", emit);
		return { modelCaption };
	},
});
</script>
