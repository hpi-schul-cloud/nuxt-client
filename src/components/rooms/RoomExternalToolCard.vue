<template>
	<room-base-card
		:title="tool.name"
		:logo-url="tool.logoUrl"
		:open-in-new-tab="tool.openInNewTab"
		@click="handleClick"
	>
		<template v-slot:right>
			<div v-if="canEdit" class="ml-1 my-auto">
				<more-item-menu
					:menu-items="menuItems"
					:show="true"
					data-testId="tool-card-menu"
				/>
			</div>
		</template>
		<template v-slot:footer>
			<span
				v-if="isToolOutdated"
				class="ml-1 my-auto"
				data-testId="tool-card-status-text"
				><b>({{ getStatusText() }})</b>
			</span>
		</template>
	</room-base-card>
</template>

<script lang="ts">
import MoreItemMenu from "@/components/molecules/MoreItemMenu.vue";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import { computed, ComputedRef, defineComponent, PropType } from "vue";
import { useExternalToolMappings } from "@/composables/external-tool-mappings.composable";
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

		const handleEdit = () => {
			emit("edit", props.tool);
		};

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

		const { getStatusTranslationKey } = useExternalToolMappings();

		const getStatusText = (): string => {
			return t(getStatusTranslationKey(props.tool.status));
		};

		const isToolOutdated: ComputedRef = computed(
			() => props.tool.status === ToolConfigurationStatus.Outdated
		);

		return {
			t,
			handleClick,
			menuItems,
			getStatusText,
			isToolOutdated,
		};
	},
});
</script>

<style lang="scss" scoped></style>
