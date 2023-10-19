<template>
	<div>
		<ContentElementBar
			v-if="showTitle"
			:hasGreyBackground="!isEditMode"
			:icon="mdiFileDocumentOutline"
		>
			<template #title>
				<ContentElementTitle>
					<a v-if="src" :href="src" target="_blank">{{ name }}</a>
					<span v-else>{{ name }}</span>
				</ContentElementTitle>
			</template>

			<template #menu>
				<slot></slot>
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
		src: { type: String, required: false },
	},
	setup() {
		return {
			mdiFileDocumentOutline,
		};
	},
	components: { ContentElementBar, ContentElementTitle },
});
</script>
<style scope>
a {
	text-decoration: none;
}
a:visited {
	color: inherit;
}
a:hover {
	text-decoration: underline;
}
</style>
