<template>
	<div>
		<ContentElementBar
			:has-grey-background="!isEditMode"
			:icon="mdiFileDocumentOutline"
		>
			<template v-if="showMenu" #menu>
				<slot />
			</template>
			<template v-if="caption && !isEditMode" #subtitle>
				{{ caption }}
			</template>
		</ContentElementBar>
	</div>
</template>

<script setup lang="ts">
import { mdiFileDocumentOutline } from "@icons/material";
import { ContentElementBar } from "@ui-board";

defineProps({
	caption: { type: String, required: false, default: undefined },
	showTitle: { type: Boolean, required: true },
	showMenu: { type: Boolean, required: true },
	isEditMode: { type: Boolean, required: true },
	src: { type: String, required: false, default: undefined },
});
</script>

<style scoped>
a:focus {
	outline: auto; /* Ensures that default focus ring is visible (esp. in Safari) */
}
</style>
