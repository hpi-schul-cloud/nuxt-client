<template>
	<v-dialog fullscreen hide-overlay :value="true">
		<v-toolbar flat>
			<v-btn icon @click="close">
				<v-icon>{{ mdiClose }}</v-icon>
			</v-btn>

			<ContentElementTitleIcon :icon="mdiFileDocumentOutline" class="mr-2" />

			<v-toolbar-title>
				<ContentElementTitle>Das ist ein PDF Name</ContentElementTitle>
			</v-toolbar-title>
			<v-spacer />
			<v-btn icon @click="download">
				<v-icon>{{ mdiTrayArrowDown }}</v-icon>
			</v-btn>
		</v-toolbar>

		<v-overlay absolute class="mt-16 pa-4 h-100" @click="close">
			<div
				class="d-flex align-items-center justify-content-center"
				style="height: 100%"
			>
				<embed :src="src" type="application/pdf" width="100%" height="100%" />
			</div>
		</v-overlay>
	</v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mdiClose, mdiFileDocumentOutline, mdiTrayArrowDown } from "@mdi/js";
import { ContentElementTitleIcon, ContentElementTitle } from "@ui-board";

export default defineComponent({
	name: "PdfDisplay",
	components: { ContentElementTitleIcon, ContentElementTitle },
	props: {
		src: { type: String, required: true },
	},
	setup(props) {
		return {
			mdiClose,
			mdiFileDocumentOutline,
			mdiTrayArrowDown,
		};
	},
});
</script>

<style scoped>
.v-overlay >>> .v-overlay__content {
	height: 100%;
	width: 100%;
}
</style>
