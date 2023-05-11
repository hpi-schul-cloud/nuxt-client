<template>
	<div class="centered-container">
		<div
			v-if="tools.length === 0"
			class="mt-16 text-center"
			data-testid="tools-empty-state"
		>
			<v-img
				height="200"
				src="@/assets/img/empty-state/tools-empty-state.svg"
				contain
			/>
			<h4>
				{{ $t("pages.rooms.tools.emptyState") }}
			</h4>
		</div>

		<room-external-tool-card
			v-for="(tool, index) in tools"
			:key="index"
			class="mb-4"
			:tool="tool"
			:can-edit="canEdit"
			@delete="onOpenDeleteDialog"
			@edit="onEditTool"
			@click="onClickTool"
		></room-external-tool-card>

		<v-dialog v-model="isDeleteDialogOpen" max-width="450">
			<v-card :ripple="false">
				<v-card-title>
					<h2 class="text-h4 my-2">
						{{ $t("pages.rooms.tools.deleteDialog.title") }}
					</h2>
				</v-card-title>
				<v-card-text class="text--primary">
					<p
						class="text-md mt-2"
						v-html="
							$t('pages.rooms.tools.deleteDialog.content', {
								itemName: itemToDelete?.name || '???',
							})
						"
					/>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						data-testId="dialog-cancel"
						depressed
						text
						@click="onCloseDeleteDialog"
					>
						{{ $t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						data-testId="dialog-confirm"
						class="px-6"
						color="primary"
						depressed
						@click="onDeleteTool"
					>
						{{ $t("common.actions.confirm") }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, ref, Ref } from "vue";
import RoomExternalToolCard from "@/components/external-tools/RoomExternalToolCard.vue";
import AuthModule from "@/store/auth";
import { ContextExternalTool } from "./types/context-external-tool";

export default defineComponent({
	name: "RoomExternalToolOverview",
	components: { RoomExternalToolCard },
	setup() {
		const authModule: AuthModule | undefined = inject<AuthModule>("authModule");

		// TODO remove mock data
		const tools: ContextExternalTool[] = [
			{
				name: "WIDE Test Tool",
				logoUrl: "https://www.cmsimaging.com/assets/img/brands/wide/wide.png",
				openInNewTab: false,
			},
			{
				name: "Just a Google Test Tool with a very long name, since you never know what people put in text boxes for names",
				logoUrl:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png?20230305195327",
				openInNewTab: true,
			},
			{
				name: "Video Konferenzen mit BigBlueButton",
				openInNewTab: true,
			},
			{
				name: "Video Konferenzen ohne BigBlueButton",
				logoUrl:
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfbsOdEp6L8Jm3lTHE1yYOvd511icc8-NGw&usqp=CAU",
				openInNewTab: false,
			},
			{
				name: "Video Konferenzen ohne BigBlueButton",
				logoUrl:
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfbsOdEp6L8Jm3lTHE1yYOvd511icc8-NGw&usqp=CAU",
				openInNewTab: false,
			},
			{
				name: "Video Konferenzen ohne BigBlueButton",
				logoUrl:
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfbsOdEp6L8Jm3lTHE1yYOvd511icc8-NGw&usqp=CAU",
				openInNewTab: false,
			},
			{
				name: "Video Konferenzen ohne BigBlueButton",
				logoUrl:
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfbsOdEp6L8Jm3lTHE1yYOvd511icc8-NGw&usqp=CAU",
				openInNewTab: false,
			},
		];

		const isDeleteDialogOpen: Ref<boolean> = ref(false);

		const itemToDelete: Ref<ContextExternalTool | undefined> = ref();

		const onOpenDeleteDialog = (tool: ContextExternalTool) => {
			itemToDelete.value = tool;
			isDeleteDialogOpen.value = true;
		};

		const onCloseDeleteDialog = () => {
			itemToDelete.value = undefined;
			isDeleteDialogOpen.value = false;
		};

		const onDeleteTool = () => {
			console.log("Delete Tool");

			onCloseDeleteDialog();
		};

		const onEditTool = () => {
			console.log("Edit Tool");
		};

		const onClickTool = () => {
			console.log("Launch Tool");
		};

		const canEdit: ComputedRef<boolean> = computed(
			() =>
				!!authModule?.getUserPermissions.includes(
					"CONTEXT_TOOL_ADMIN".toLowerCase()
				)
		);

		return {
			tools,
			canEdit,
			itemToDelete,
			isDeleteDialogOpen,
			onOpenDeleteDialog,
			onCloseDeleteDialog,
			onDeleteTool,
			onClickTool,
			onEditTool,
		};
	},
});
</script>

<style lang="scss" scoped>
.centered-container {
	max-width: var(--size-content-width-max);
	margin: 0 auto;
}
</style>
