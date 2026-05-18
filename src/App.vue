<template>
	<v-app>
		<div class="d-flex justify-center gap-2 pa-2">
			<v-btn @click="askBeforeDelete">Delete</v-btn>
			<v-btn @click="askForName">Prompt</v-btn>
		</div>
		<component :is="layout">
			<router-view />
		</component>
		<SvsDialog
			v-model="isDialogOpen"
			data-testid="confirm-dialog"
			:confirm-btn-lang-key="dialogOptions?.confirmBtnKey"
			:title="confirmationTitle"
			@confirm="confirm"
			@cancel="cancel"
			@after-leave="resetDialogOptions"
		>
			<template v-if="confirmationMessage" #content>
				<WarningAlert v-if="dialogOptions?.messageType === 'warning'" data-testid="confirm-dialog-alert">
					{{ confirmationMessage }}
				</WarningAlert>
				<InfoAlert v-if="dialogOptions?.messageType === 'info'" data-testid="confirm-dialog-alert">
					{{ confirmationMessage }}
				</InfoAlert>
			</template>
		</SvsDialog>
		<DialogHost />
	</v-app>
</template>

<script setup lang="ts">
import { useInternalConfirmationDialog } from "./composables/confirmation-dialog.composable";
import { availableLayouts, isLayout } from "./layouts";
import DialogHost from "./modules/feature/dialog/DialogHost.vue";
import { askBeforeDelete, askForName } from "./modules/feature/dialog/example-usage";
import { setComputedScrollbarWidthAsCssVar } from "./utils/scrollbarWidth";
import { Layouts } from "@/layouts/types";
import { useAppStore } from "@data-app";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

setComputedScrollbarWidthAsCssVar();

const { dialogOptions, isDialogOpen, confirm, cancel, confirmationTitle, confirmationMessage, resetDialogOptions } =
	useInternalConfirmationDialog();

const layout = computed(() => {
	const isLoggedIn = useAppStore().isLoggedIn;
	const requestedLayout = route.meta.layout as string | undefined;

	const layoutName = isLoggedIn ? requestedLayout || Layouts.LOGGED_IN : requestedLayout || Layouts.LOGGED_OUT;

	if (isLayout(layoutName)) {
		return availableLayouts[layoutName];
	} else {
		throw new Error(`Unknown layout '${layoutName}'`);
	}
});

// async function askBeforeDelete() {
// 	const result = await openDialog("confirm", {
// 		title: "Delete item",
// 		message: "Are you sure you want to delete this item?",
// 	});

// 	if (!result.completed) {
// 		console.log("User cancelled");
// 		return;
// 	}

// 	console.log("Confirmed:", result.data); // boolean
// }

// async function askForName() {
// 	const result = await openDialog("prompt", {
// 		title: "Enter your name",
// 		placeholder: "Name",
// 		initialValue: "",
// 	});

// 	if (!result.completed) {
// 		console.log("Prompt cancelled");
// 		return;
// 	}

// 	console.log("Name:", result.data); // string
// }
</script>
