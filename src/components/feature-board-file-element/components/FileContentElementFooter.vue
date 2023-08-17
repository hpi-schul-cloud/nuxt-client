<template>
	<v-container class="ma-0 pa-0">
		<v-row>
			<v-col cols="10">
				<FileContentElementChips :fileSize="fileSize" :fileName="fileName" />
			</v-col>

			<v-col cols="2">
				<FileContentElementDownload></FileContentElementDownload>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FileContentElementChips from "./FileContentElementChips.vue";
import FileContentElementDownload from "./FileContentElementDownload.vue";

export default defineComponent({
	name: "FileContentElementFooter",
	components: {
		FileContentElementChips,
		FileContentElementDownload,
	},
	props: {
		fileName: { type: String, required: true },
		fileSize: { type: Number, required: true },
	},
});
</script>
