<template>
	<v-dialog
		:value="isOpen"
		fullscreen
		hide-overlay
		transition="dialog-bottom-transition"
	>
		<v-card>
			<v-toolbar color="white">
				<v-btn icon @click="close">
					<v-icon>{{ mdiClose }}</v-icon>
				</v-btn>
				<v-spacer />
				<v-toolbar-items>
					<v-btn dark text @click="() => {}"> Save </v-btn>
				</v-toolbar-items>
			</v-toolbar>
			<v-card-text>
				{{ dialogCard?.id }}
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mdiClose } from "@mdi/js";
import { useCardDetailView } from "./CardDetailView.composable";

export default defineComponent({
	name: "CardDetailView",
	setup() {
		const { isOpen, close, dialogCard } = useCardDetailView();
		return { mdiClose, isOpen, close, dialogCard };
	},
});
</script>
