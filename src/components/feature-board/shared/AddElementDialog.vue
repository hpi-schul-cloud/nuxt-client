<template>
	<vCustomDialog
		data-testid="element-type-selection"
		:size="dialogWidth"
		:has-buttons="true"
		:is-open="isDialogOpen"
		@dialog-closed="onCloseDialog"
		:buttons="actionButtons"
	>
		<div slot="title" class="text-h4 my-2 text-break">
			{{ $t("components.elementTypeSelection.dialog.title") }}
		</div>

		<template slot="content">
			<div
				class="d-flex flex-sm-row flex-column flex-wrap align-items-center"
				:class="{ 'justify-content-space-between': submissionsEnabled }"
			>
				<v-btn
					v-for="(item, key) in elementTypeOptions"
					:key="key"
					plain
					large
					:height="84"
					:width="126"
					class="d-sm-flex button-alignment-center"
					:data-testid="item.testId"
					@click.stop="item.action"
				>
					<span
						class="d-flex flex-column justify-content-center button-max-width"
					>
						<span>
							<v-icon large>{{ item.icon }}</v-icon>
						</span>
						<span class="subtitle">{{ $t(item.label) }}</span>
					</span>
				</v-btn>
			</div>
		</template>
	</vCustomDialog>
</template>

<script lang="ts">
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { ContentElementType } from "@/serverApi/v3";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { mdiEmailOutline } from "@mdi/js";
import { computed, ComputedRef, defineComponent } from "vue";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";

export default defineComponent({
	name: "AddElementDialog",
	components: {
		vCustomDialog,
	},
	setup(props, { emit }) {
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

		const { isDialogOpen, closeDialog, elementTypeOptions } =
			useSharedElementTypeSelection();

		const onCloseDialog = (_: boolean, event: Event) => {
			event?.stopPropagation();
			closeDialog();
		};

		const onAddElement = (eventType: string, type: ContentElementType) =>
			emit(eventType, type);

		const actionButtons = ["close"];

		const submissionsEnabled =
			envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED;

		const dialogWidth: ComputedRef<number> = computed(() =>
			elementTypeOptions.value.length >= 3 ? 426 : 320
		);

		return {
			onAddElement,
			onCloseDialog,
			mdiEmailOutline,
			elementTypeOptions,
			isDialogOpen,
			actionButtons,
			submissionsEnabled,
			dialogWidth,
		};
	},
});
</script>
<style lang="scss" scoped>
@import "@/utils/multiline-ellipsis.scss";
@import "~vuetify/src/styles/styles.sass";

.subtitle {
	overflow-wrap: break-word;
	white-space: normal;
}

.button-max-width {
	max-width: calc(var(--topbar-height) * 2);
}

.button-alignment-center {
	align-items: center;
}
</style>
