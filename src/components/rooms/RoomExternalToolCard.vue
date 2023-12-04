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
					size="small"
					class="py-1"
					color="warning-lighten-1"
					text-color="black"
					data-testId="tool-card-status"
				>
					<v-icon size="small" class="mr-1" color="warning">{{
						mdiAlert
					}}</v-icon>
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
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useExternalToolLaunchState } from "@data-external-tool";
import { mdiAlert, mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import { computed, ComputedRef, defineComponent, PropType, watch } from "vue";
import RoomBaseCard from "./RoomBaseCard.vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "RoomExternalToolCard",
	components: { RoomBaseCard, RoomDotMenu },
	emits: ["edit", "delete", "error"],
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
		const { t } = useI18n();
		const envConfigModule: EnvConfigModule = injectStrict(
			ENV_CONFIG_MODULE_KEY
		);

		const {
			fetchLaunchRequest,
			launchTool,
			error: launchError,
		} = useExternalToolLaunchState();

		const handleClick = () => {
			if (isToolOutdated.value) {
				emit("error", props.tool);
			}

			launchTool();

			if (launchError.value) {
				emit("error", props.tool);
			}
		};

		const handleEdit = () => {
			emit("edit", props.tool);
		};

		const handleDelete = () => {
			emit("delete", props.tool);
		};

		const menuItems = [
			{
				icon: mdiTrashCanOutline,
				action: handleDelete,
				name: t("common.actions.remove"),
				dataTestId: "tool-delete",
			},
		];

		if (envConfigModule.getCtlContextConfigurationEnabled) {
			menuItems.unshift({
				icon: mdiPencilOutline,
				action: handleEdit,
				name: t("common.actions.edit"),
				dataTestId: "tool-edit",
			});
		}

		const isToolOutdated: ComputedRef = computed(
			() => props.tool.status === ToolConfigurationStatus.Outdated
		);

		const loadLaunchRequest = async () => {
			if (isToolOutdated.value) {
				return;
			}

			await fetchLaunchRequest(props.tool.contextExternalToolId);
		};

		watch(() => props.tool, loadLaunchRequest, { immediate: true });

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
