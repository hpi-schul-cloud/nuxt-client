<template>
	<vCustomDialog
		data-testid="create-element-dialog"
		:has-buttons="false"
		:is-open="isDialogOpen"
	>
		<template v-slot:title> {{ $t("create-element.title") }} </template>
		<template v-slot:content>
			<div
				class="d-flex flex-sm-row flex-column justify-content-space-between align-items-center"
			>
				<v-btn
					v-for="(item, key) in items"
					:key="key"
					outlined
					x-large
					:height="84"
					class="d-sm-flex button-alignment-top"
					:data-testid="item.testId"
					@click.stop="item.action"
				>
					<span
						class="d-flex flex-column justify-content-center button-max-width"
					>
						<span>
							<v-icon large>{{ mdiEmailOutline }}</v-icon></span
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
import { mdiEmailOutline } from "@mdi/js";
import { defineComponent } from "vue";
import { ContentElementType } from "../types/ContentElement";
import { useCreateElement } from "./create-element.composable";

export interface CreateElementItems {
	icon: string;
	label: string;
	action: string;
	testId: string;
	type: ContentElementType;
}

export default defineComponent({
	name: "CreateElementDialog",
	components: {
		vCustomDialog,
	},
	setup(props, { emit }) {
		const { isDialogOpen, addTextElement, addFileElement } = useCreateElement();
		const items = [
			{
				icon: "",
				label: "create-element.text",
				action: addTextElement,
				testId: "create-element-text",
				type: ContentElementType.TEXT,
			},
			{
				icon: "",
				label: "create-element.file",
				action: addFileElement,
				testId: "create-element-file",
				type: ContentElementType.FILE,
			},
		];

		const onAddElement = (eventType: string, type: ContentElementType) =>
			emit(eventType, type);

		return {
			onAddElement,
			isDialogOpen,
			mdiEmailOutline,
			items,
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
