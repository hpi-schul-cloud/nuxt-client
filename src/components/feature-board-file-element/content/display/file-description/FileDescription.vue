<template>
	<div>
		<ContentElementBar
			v-if="showTitle"
			:hasGreyBackground="!isEditMode"
			:icon="mdiFileDocumentOutline"
		>
			<template #title>
				<div class="title-link">
					{{ name }}
				</div>
			</template>
			<template v-if="showMenu" #menu>
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
<style scope>
.title-link a {
	text-decoration: none;
	color: var(--v-black-base);
}
.title-link a:visited {
	color: var(--v-black-base);
}
.title-link a:hover {
	text-decoration: underline;
}
</style>
