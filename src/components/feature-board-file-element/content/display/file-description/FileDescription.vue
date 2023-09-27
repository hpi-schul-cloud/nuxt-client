<template>
	<div class="grey lighten-4">
		<v-card-title
			v-if="showTitle"
			data-testid="board-file-element-display"
			inactive
		>
			<div class="d-flex flex-no-wrap align-center text-truncate">
				<v-icon
					color="black"
					class="mr-2"
					size="18"
					data-testid="board-file-element-display-file-icon"
					>{{ mdiFileDocumentOutline }}</v-icon
				>

				<span
					:class="spanClasses"
					data-testid="board-file-element-display-file-name"
					>{{ name }}</span
				>
			</div>
		</v-card-title>

		<v-card-subtitle v-if="caption && !isEditMode">
			{{ caption }}
		</v-card-subtitle>
	</div>
</template>

<script lang="ts">
import { mdiFileDocumentOutline } from "@mdi/js";
import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "FileDescription",
	props: {
		name: { type: String, required: true },
		caption: { type: String, required: false },
		showTitle: { type: Boolean, required: true },
		isEditMode: { type: Boolean, required: true },
	},
	setup(props) {
		const spanClasses = computed(() => {
			const marginClass = props.isEditMode ? " mr-10" : "";
			const classes = `subtitle-1 font-weight-bold text-truncate${marginClass}`;

			return classes;
		});

		return {
			mdiFileDocumentOutline,
			spanClasses,
		};
	},
});
</script>
