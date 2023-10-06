<template>
	<div class="grey lighten-4">
		<v-app-bar v-if="showTitle" flat color="transparent">
			<v-toolbar-title data-testid="file-description-toolbar" inactive>
				<v-icon
					color="black"
					class="mr-2"
					size="18"
					data-testid="file-description-icon"
					>{{ mdiFileDocumentOutline }}</v-icon
				>

				<span
					class="subtitle-1 font-weight-bold"
					data-testid="file-description-name"
					>{{ name }}</span
				>
			</v-toolbar-title>

			<v-spacer />

			<slot />
		</v-app-bar>

		<v-card-subtitle v-if="caption && !isEditMode">
			{{ caption }}
		</v-card-subtitle>
	</div>
</template>

<script lang="ts">
import { mdiFileDocumentOutline } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	name: "FileDescription",
	props: {
		name: { type: String, required: true },
		caption: { type: String, required: false },
		showTitle: { type: Boolean, required: true },
		isEditMode: { type: Boolean, required: true },
	},
	setup() {
		return {
			mdiFileDocumentOutline,
		};
	},
});
</script>
