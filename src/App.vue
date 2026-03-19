<template>
	<v-app>
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
	</v-app>
</template>

<script setup lang="ts">
import { useInternalConfirmationDialog } from "./composables/confirmation-dialog.composable";
import { availableLayouts, isLayout } from "./layouts";
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
</script>
