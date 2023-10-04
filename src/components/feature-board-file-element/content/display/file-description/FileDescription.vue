<template>
	<ContentElementBar
		:hasGreyBackground="!isEditMode"
		:icon="showTitle ? mdiFileDocumentOutline : undefined"
	>
		<template #title>
			<ContentElementTitle v-if="showTitle">{{ name }}</ContentElementTitle>
		</template>

		<template #menu>
			<slot v-if="showTitle"></slot>
		</template>

		<template #subtitle>
			<span v-if="caption && !isEditMode">
				{{ caption }}
			</span>
		</template>
	</ContentElementBar>
</template>

<script lang="ts">
import { mdiFileDocumentOutline } from "@mdi/js";
import { ContentElementBar, ContentElementTitle } from "@ui-board";
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
	components: { ContentElementBar, ContentElementTitle },
});
</script>
