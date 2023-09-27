<template>
	<CardTitle
		:title="name"
		:subtitle="subtitle"
		:icon="icon"
		:shortenTitle="isEditMode"
	/>
</template>

<script lang="ts">
import { mdiFileDocumentOutline } from "@mdi/js";
import CardTitle from "@ui-card-title";
import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "FileDescription",
	components: { CardTitle },
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
