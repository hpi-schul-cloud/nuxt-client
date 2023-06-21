<template>
	<v-list flat class="py-0">
		<v-list-item class="grey lighten-2">
			<v-list-item-icon class="mr-2">
				<v-icon x-large>{{ mdiFileDocumentOutline }}</v-icon>
			</v-list-item-icon>

			<v-list-item-content>
				<v-list-item-title>{{ fileName }}</v-list-item-title>
			</v-list-item-content>

			<v-list-item-icon color="">
				<v-btn
					class="grey lighten-3"
					download
					:href="url"
					icon
					:ripple="false"
					@dblclick.stop="() => {}"
					@keydown.left.right.up.down.stop="() => {}"
				>
					<v-icon>{{ mdiTrayArrowDown }}</v-icon>
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
