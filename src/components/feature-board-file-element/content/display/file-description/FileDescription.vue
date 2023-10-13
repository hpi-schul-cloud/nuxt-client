<template>
	<div>
		<ContentElementBar
			v-if="showTitle"
			:hasGreyBackground="!isEditMode"
			:icon="mdiFileDocumentOutline"
		>
			<template #title>
				<ContentElementTitle>{{ name }}</ContentElementTitle>
			</template>
			<template #menu>
				<slot />
			</template>
			<template #subtitle v-if="caption && !isEditMode">
				{{ caption }}
			</template>
		</ContentElementBar>

		<div v-else-if="caption && !isEditMode" class="pa-4 grey lighten-4">
			{{ caption }}
		</div>
	</div>
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
