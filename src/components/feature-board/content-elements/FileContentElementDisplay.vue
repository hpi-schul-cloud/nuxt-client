<template>
	<v-list flat class="py-0">
		<v-list-item :href="url" download>
			<v-list-item-icon class="mr-2">
				<v-icon>{{ mdiFileDocumentOutline }}</v-icon>
			</v-list-item-icon>

			<v-list-item-content>
				<v-list-item-title style="color: var(--v-primary-base)">{{
					fileName
				}}</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mdiAlertCircle, mdiFileDocumentOutline } from "@mdi/js";

export default defineComponent({
	name: "FileContentElementDisplay",
	props: {
		fileName: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	setup() {
		return {
			mdiAlertCircle,
			mdiFileDocumentOutline,
		};
	},
});
</script>
