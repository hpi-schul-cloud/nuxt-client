<template>
	<v-app>
		<component :is="layout">
			<router-view />
		</component>

		<SvsDialog
			v-model="isDialogOpen"
			data-testid="confirmation-dialog"
			:confirm-btn-lang-key="dialogOptions?.confirmBtnKey"
			:title="confirmTitle"
			@confirm="confirm"
			@cancel="cancel"
			@after-leave="resetDialogOptions"
		>
			<template v-if="confirmMessage" #content>
				<WarningAlert v-if="dialogOptions?.messageType === 'warning'">
					{{ confirmMessage }}
				</WarningAlert>
				<InfoAlert v-if="dialogOptions?.messageType === 'info'">
					{{ confirmMessage }}
				</InfoAlert>
			</template>
		</SvsDialog>
	</v-app>
</template>

<script setup lang="ts">
import { useInternalConfirmDialog } from "./composables/confirm-dialog.composable";
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

const { dialogOptions, isDialogOpen, confirm, cancel, confirmTitle, confirmMessage, resetDialogOptions } =
	useInternalConfirmDialog();

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
