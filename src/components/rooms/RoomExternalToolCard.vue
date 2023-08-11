<template>
	<room-base-card
		:title="tool.name"
		:logo-url="tool.logoUrl"
		:open-in-new-tab="tool.openInNewTab"
		test-id="tool-card"
		@click="handleClick"
	>
		<template #under-title>
			<div v-if="isToolOutdated" class="mt-1">
				<v-chip
					small
					class="py-1"
					color="warning lighten-1"
					text-color="black"
					data-testId="tool-card-status"
				>
					<v-icon small class="mr-1" color="warning">$mdiAlert</v-icon>
					{{ t("pages.rooms.tools.outdated") }}
				</v-chip>
			</div>
		</template>
		<template #right>
			<div v-if="canEdit" class="ml-1 my-auto">
				<room-dot-menu
					:menu-items="menuItems"
					data-testId="tool-card-menu"
					:aria-label="t('pages.rooms.tools.menu.ariaLabel')"
				/>
			</div>
		</template>
	</room-base-card>
</template>

<script lang="ts">
import RoomDotMenu from "@/components/molecules/RoomDotMenu.vue";
import EnvConfigModule from "@/store/env-config";
import { ToolConfigurationStatus } from "@/store/external-tool";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import { ENV_CONFIG_MODULE_KEY, I18N_KEY, injectStrict } from "@/utils/inject";
import { ComputedRef, PropType, computed, defineComponent } from "vue";
import RoomBaseCard from "./RoomBaseCard.vue";

export default defineComponent({
	name: "RoomExternalToolCard",
	components: { RoomBaseCard, RoomDotMenu },
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
		const envConfigModule: EnvConfigModule = injectStrict(
			ENV_CONFIG_MODULE_KEY
		);

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
			{
				icon: "$mdiTrashCanOutline",
				action: handleDelete,
				name: t("common.actions.remove"),
				dataTestId: "tool-delete",
			},
		];

		if (envConfigModule.getCtlContextConfigurationEnabled) {
			menuItems.unshift({
				icon: "$mdiPencilOutline",
				action: handleEdit,
				name: t("common.actions.edit"),
				dataTestId: "tool-edit",
			});
		}

		const isToolOutdated: ComputedRef = computed(
			() => props.tool.status === ToolConfigurationStatus.Outdated
		);

		return {
			t,
			handleClick,
			menuItems,
			isToolOutdated,
		};
	},
});
</script>
