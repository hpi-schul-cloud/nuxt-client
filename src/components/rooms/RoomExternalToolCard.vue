<template>
	<room-base-card
		:title="tool.name"
		:logo-url="tool.logoUrl"
		:open-in-new-tab="tool.openInNewTab"
		test-id="tool-card"
		@click="handleClick"
	>
		<template #under-title>
			<div class="d-flex g-1">
				<room-card-chip
					v-if="isToolDeactivated"
					data-testId="tool-card-status-deactivated"
				>
					{{ t("pages.rooms.tools.deactivated") }}
				</room-card-chip>
				<room-card-chip
					v-if="isToolOutdated"
					data-testId="tool-card-status-outdated"
				>
					{{ t("pages.rooms.tools.outdated") }}
				</room-card-chip>
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
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import { ENV_CONFIG_MODULE_KEY, I18N_KEY, injectStrict } from "@/utils/inject";
import { useExternalToolLaunchState } from "@data-external-tool";
import { mdiAlert, mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import { computed, ComputedRef, defineComponent, PropType, watch } from "vue";
import RoomBaseCard from "./RoomBaseCard.vue";
import RoomCardChip from "@/components/rooms/RoomCardChip.vue";

export default defineComponent({
	name: "RoomExternalToolCard",
	components: { RoomCardChip, RoomBaseCard, RoomDotMenu },
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
		const i18n = injectStrict(I18N_KEY);
		const envConfigModule: EnvConfigModule = injectStrict(
			ENV_CONFIG_MODULE_KEY
		);

		const {
			fetchLaunchRequest,
			launchTool,
			error: launchError,
		} = useExternalToolLaunchState();

		const t = (key: string): string => i18n.tc(key, 0);

		const handleClick = () => {
			if (isToolOutdated.value) {
				emit("error", props.tool);
				return;
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
			() =>
				props.tool.status.isOutdatedOnScopeSchool ||
				props.tool.status.isOutdatedOnScopeContext
		);

		const isToolDeactivated: ComputedRef = computed(
			() => props.tool.status.isDeactivated
		);

		const isToolLaunchable = computed(() => {
			return !isToolOutdated.value || !isToolDeactivated.value;
		});

		const loadLaunchRequest = async () => {
			if (!isToolLaunchable.value) {
				return;
			}

			await fetchLaunchRequest(props.tool.contextExternalToolId);
		};

		watch(() => props.tool, loadLaunchRequest, { immediate: true });

		return {
			t,
			handleClick,
			menuItems,
			isToolLaunchable,
			mdiAlert,
			isToolOutdated,
			isToolDeactivated,
		};
	},
});
</script>

<style scoped>
.g-1 {
	gap: 4px;
}
</style>
