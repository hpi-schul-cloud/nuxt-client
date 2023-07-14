<template>
	<room-base-card
		:title="tool.name"
		:logo-url="tool.logoUrl"
		:open-in-new-tab="tool.openInNewTab"
		@click="handleClick"
	>
		<template v-slot:under-title>
			<div v-if="isToolOutdated" class="mt-1">
				<v-chip
					small
					class="py-1"
					color="warning lighten-1"
					text-color="black"
					data-testId="tool-card-status"
				>
					<v-icon small class="mr-1" color="warning">{{ mdiAlert }}</v-icon>
					{{ t("pages.rooms.tools.outdated") }}
				</v-chip>
			</div>
		</template>
		<template v-slot:right>
			<div v-if="canEdit" class="ml-1 my-auto">
				<more-item-menu
					:menu-items="menuItems"
					:show="true"
					data-testId="tool-card-menu"
				/>
			</div>
		</template>
	</room-base-card>
</template>

<script lang="ts">
import MoreItemMenu from "@/components/molecules/MoreItemMenu.vue";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { mdiAlert, mdiTrashCanOutline } from "@mdi/js";
import { computed, ComputedRef, defineComponent, PropType } from "vue";
import { ToolConfigurationStatus } from "@/store/external-tool";
import RoomBaseCard from "./RoomBaseCard.vue";

export default defineComponent({
	name: "RoomExternalToolCard",
	components: { RoomBaseCard, MoreItemMenu },
	emits: ["edit", "delete", "click"],
	props: {
		tool: {
			type: Object as PropType<ExternalToolDisplayData>,
			required: true,
		},
		canEdit: {
			type: Boolean,
			required: true,
		},
	},
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);

		const t = (key: string): string => i18n.tc(key, 0);

		const handleClick = () => {
			emit("click", props.tool);
		};

		/* const handleEdit = () => {
			emit("edit", props.tool);
		}; */

		const handleDelete = () => {
			emit("delete", props.tool);
		};

		const menuItems = [
			/* {
				icon: mdiPencilOutline,
				action: handleEdit,
				name: t("common.actions.edit"),
				dataTestId: "tool-edit",
			}, */
			{
				icon: mdiTrashCanOutline,
				action: handleDelete,
				name: t("common.actions.remove"),
				dataTestId: "tool-delete",
			},
		];

		const isToolOutdated: ComputedRef = computed(
			() => props.tool.status === ToolConfigurationStatus.Outdated
		);

		return {
			t,
			handleClick,
			menuItems,
			isToolOutdated,
			mdiAlert,
		};
	},
});
</script>
