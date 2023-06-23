<template>
	<v-list
		flat
		class="py-0 rounded-b-0"
		data-testid="board-file-element-display"
	>
		<v-list-item class="px-2 grey lighten-3">
			<v-list-item-icon class="my-2 mr-2">
				<v-icon
					color="#8a9199"
					data-testid="board-file-element-display-file-icon"
					large
					>{{ mdiFileDocumentOutline }}</v-icon
				>
			</v-list-item-icon>

			<v-list-item-content>
				<v-list-item-title data-testid="board-file-element-display-file-name">{{
					fileName
				}}</v-list-item-title>
			</v-list-item-content>

			<v-list-item-icon class="my-2 ml-2">
				<v-btn
					data-testid="board-file-element-display-download-button"
					download
					:href="url"
					icon
					:ripple="false"
					@dblclick.stop="() => {}"
					@keydown.left.right.up.down.stop="() => {}"
				>
					<v-icon data-testid="board-file-element-display-download-icon">{{
						mdiTrayArrowDown
					}}</v-icon>
				</v-btn>
			</v-list-item-icon>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
import {
	mdiAlertCircle,
	mdiFileDocumentOutline,
	mdiTrayArrowDown,
} from "@mdi/js";
import { defineComponent } from "vue";

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
			mdiTrayArrowDown,
		};
	},
});
</script>
