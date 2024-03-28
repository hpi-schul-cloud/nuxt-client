<template>
	<div>
		<ContentElementBar
			:hasGreyBackground="!isEditMode"
			:icon="mdiFileDocumentOutline"
		>
			<template #title v-if="showTitle">
				<a v-if="src" :href="src" target="_blank">{{ name }}</a>
				<span v-else>{{ name }}</span>
			</template>
			<template v-if="showMenu" #menu>
				<slot />
			</template>
			<template #subtitle v-if="caption && !isEditMode">
				{{ caption }}
			</template>
		</ContentElementBar>
	</div>
</template>

<script lang="ts">
import { mdiFileDocumentOutline } from "@mdi/js";
import { ContentElementBar } from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	name: "FileDescription",
	props: {
		name: { type: String, required: true },
		caption: { type: String, required: false },
		showTitle: { type: Boolean, required: true },
		showMenu: { type: Boolean, required: true },
		isEditMode: { type: Boolean, required: true },
		src: { type: String, required: false },
	},
	setup() {
		return {
			mdiFileDocumentOutline,
		};
	},
	components: { ContentElementBar },
});
</script>
