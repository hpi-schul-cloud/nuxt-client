<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ t("components.administration.externalToolsSection.header") }}
		</h2>
		<v-data-table
			:disable-pagination="true"
			:hide-default-footer="true"
			:items="items"
			:headers="headers"
		>
			<template #[`item.name`]="{ item }">
				<span :class="getColor(item)">
					{{ item.name }}
				</span>
			</template>
			<template #[`item.status`]="{ item }">
				<span :class="getColor(item)">
					{{ item.status }}
				</span>
			</template>
			<template #[`item.actions`]="{ item }">
				<v-icon @click="editTool(item)">
					{{ mdiPencilOutline }}
				</v-icon>
				<v-icon @click="openDeleteDialog(item)">
					{{ mdiTrashCanOutline }}
				</v-icon>
			</template>
		</v-data-table>
		<v-btn class="my-5 button-save" color="primary" depressed @click="addTool">
			{{ $t("components.administration.externalToolsSection.action.add") }}
		</v-btn>

		<v-dialog v-model="isDeleteDialogOpen" max-width="450">
			<v-card :ripple="false">
				<v-card-title>
					<h2 class="text-h4 my-2">
						{{
							$t("components.administration.externalToolsSection.dialog.title")
						}}
					</h2>
				</v-card-title>
				<v-card-text class="text--primary">
					<p
						class="text-md mt-2"
						v-html="
							$t(
								'components.administration.externalToolsSection.dialog.content',
								{ itemName: getItemName }
							)
						"
					/>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						data-testId="dialog-cancel"
						class="dialog-closed"
						depressed
						text
						@click="closeDeleteDialog"
					>
						{{ $t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						data-testId="dialog-confirm"
						class="dialog-confirmed px-6"
						color="primary"
						depressed
						@click="deleteTool"
					>
						{{ $t("common.actions.confirm") }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import VueI18n from "vue-i18n";
import {
	computed,
	ComputedRef,
	inject,
	onMounted,
	Ref,
} from "@nuxtjs/composition-api";
import ExternalToolsModule from "@store/external-tools";
import {
	SchoolExternalTool,
	ExternalToolStatus,
} from "@store/types/school-external-tool";
import { DataTableHeader } from "vuetify";
import { mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";

export interface ExternalToolItem {
	name: string;
	status: string;
	outdated: boolean;
}

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ExternalToolsSection",
	components: {},
	setup() {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const externalToolsModule: ExternalToolsModule | undefined =
			inject<ExternalToolsModule>("externalToolsModule");
		if (!externalToolsModule || !i18n) {
			throw new Error("Injection of dependencies failed");
		}

		onMounted(async () => {
			await externalToolsModule.loadSchoolExternalTools();
		});

		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const headers: DataTableHeader[] = [
			{
				text: t("common.labels.name"),
				value: "name",
			},
			{
				text: t(
					"components.administration.externalToolsSection.table.header.status"
				),
				value: "status",
			},
			{
				text: "",
				value: "actions",
				sortable: false,
				align: "end",
				width: "90px",
			},
		];

		const items: ComputedRef<ExternalToolItem[]> = computed(() => {
			return externalToolsModule.getSchoolExternalTools.map(
				(tool: SchoolExternalTool) => {
					const outdated: boolean = tool.status === ExternalToolStatus.Outdated;
					const status: string =
						tool.status === ExternalToolStatus.Latest
							? t(
									"components.administration.externalToolsSection.table.header.status.latest"
							  )
							: t(
									"components.administration.externalToolsSection.table.header.status.outdated"
							  );
					return { name: tool.name, status: status, outdated };
				}
			);
		});

		const getColor = (item: ExternalToolItem): string => {
			return item.outdated ? "outdated" : "";
		};

		const addTool = () => {
			console.log("addTool() called");
		};

		const editTool = () => {
			console.log("editTool() called");
		};

		const deleteTool = () => {
			console.log(itemToDelete.value);
			closeDeleteDialog();
		};

		const itemToDelete: Ref<ExternalToolItem | undefined> = ref();
		const getItemName: ComputedRef<string> = computed(() => {
			return itemToDelete.value ? itemToDelete.value?.name : "";
		});

		const isDeleteDialogOpen: Ref<boolean> = ref(false);

		const openDeleteDialog = (item: ExternalToolItem) => {
			itemToDelete.value = item;
			isDeleteDialogOpen.value = true;
		};

		const closeDeleteDialog = () => {
			itemToDelete.value = undefined;
			isDeleteDialogOpen.value = false;
		};

		return {
			t,
			headers,
			items,
			mdiPencilOutline,
			mdiTrashCanOutline,
			getColor,
			addTool,
			editTool,
			deleteTool,
			isDeleteDialogOpen,
			openDeleteDialog,
			closeDeleteDialog,
			itemToDelete,
			getItemName,
		};
	},
});
</script>

<style lang="scss" scoped>
$arrow-offset: 8px;

.v-data-table ::v-deep th i {
	margin-left: $arrow-offset;
}

.v-data-table ::v-deep td {
	cursor: pointer;
}

.outdated {
	color: var(--v-primary-base);
}
</style>
