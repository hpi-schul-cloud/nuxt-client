<template>
	<Card
		:title="name"
		:subtitle="subtitle"
		:icon="icon"
		:shortenTitle="isEditMode"
	/>
</template>

<script lang="ts">
import { mdiFileDocumentOutline } from "@mdi/js";
import Card from "@ui-card";
import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "FileDescription",
	components: { Card },
	props: {
		name: { type: String, required: false },
		caption: { type: String, required: false },
		isEditMode: { type: Boolean, required: true },
	},
	setup(props) {
		const icon = computed(() => {
			const result = props.name ? mdiFileDocumentOutline : undefined;

			return result;
		});

		const subtitle = computed(() => {
			const result = props.isEditMode ? undefined : props.caption;

			return result;
		});

		return {
			subtitle,
			icon,
		};
	},
});
</script>
