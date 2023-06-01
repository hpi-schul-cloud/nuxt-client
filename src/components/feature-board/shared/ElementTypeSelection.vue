<template>
	<vCustomDialog
		data-testid="element-type-selection"
		:size="320"
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
				class="d-flex flex-sm-row flex-column justify-content-space-between align-items-center"
			>
				<v-btn
					v-for="(item, key) in elementTypeOptions"
					:key="key"
					plain
					large
					:height="84"
					:width="126"
					class="d-sm-flex button-alignment-top"
					:data-testid="item.testId"
					@click.stop="item.action"
				>
					<span
						class="d-flex flex-column justify-content-center button-max-width"
					>
						<span>
							<v-icon large>{{ item.icon }}</v-icon></span
						>
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
import { mdiEmailOutline } from "@mdi/js";
import { defineComponent } from "vue";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";

export default defineComponent({
	name: "ElementTypeSelection",
	components: {
		vCustomDialog,
	},
	setup(props, { emit }) {
		const { isDialogOpen, closeDialog, elementTypeOptions } =
			useSharedElementTypeSelection();

		const onCloseDialog = (_: boolean, event: Event) => {
			event.stopPropagation();
			closeDialog();
		};

		const onAddElement = (eventType: string, type: ContentElementType) =>
			emit(eventType, type);

		const actionButtons = ["close"];

		return {
			onAddElement,
			onCloseDialog,
			mdiEmailOutline,
			elementTypeOptions,
			isDialogOpen,
			actionButtons,
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

.button-alignment-top {
	align-items: start;
}
</style>
