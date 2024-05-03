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
					color="info"
					variant="tonal"
					v-if="isToolIncompleteOperational"
					data-testId="tool-card-status-incompleteOperational"
					>{{ $t(toolChipTitle) }}
				</room-card-chip>

				<room-card-chip
					v-if="isToolOutdated || isToolIncomplete"
					data-testId="tool-card-status"
				>
					{{ $t(toolChipTitle) }}
				</room-card-chip>
			</div>
		</template>
		<template #right>
			<div v-if="canEdit" class="ml-1 my-auto">
				<room-dot-menu
					:menu-items="menuItems"
					data-testid="room-tool-three-dot-button"
					:aria-label="t('pages.rooms.tools.menu.ariaLabel')"
				/>
			</div>
		</template>
	</room-base-card>
</template>

<script lang="ts">
import RoomCardChip from "@/components/rooms/RoomCardChip.vue";
import {
	ExternalToolDisplayData,
	useContextExternalToolConfigurationStatus,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { mdiAlert, mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import { RoomDotMenu } from "@ui-room-details";
import { computed, ComputedRef, defineComponent, PropType, watch } from "vue";
import { useI18n } from "vue-i18n";
import RoomBaseCard from "./RoomBaseCard.vue";

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
		const { t } = useI18n();

		const {
			fetchLaunchRequest,
			launchTool,
			error: launchError,
		} = useExternalToolLaunchState();

		const { determineChipStatusTitle } =
			useContextExternalToolConfigurationStatus();

		const handleClick = async () => {
			if (!isToolLaunchable.value) {
				emit("error", props.tool);
				return;
			}

			launchTool();

			await fetchLaunchRequest(props.tool.contextExternalToolId);

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
				icon: mdiPencilOutline,
				action: handleEdit,
				name: t("common.actions.edit"),
				dataTestId: "tool-edit",
			},
			{
				icon: mdiTrashCanOutline,
				action: handleDelete,
				name: t("common.actions.remove"),
				dataTestId: "tool-delete",
			},
		];

		const isToolOutdated: ComputedRef = computed(
			() =>
				props.tool.status.isOutdatedOnScopeSchool ||
				props.tool.status.isOutdatedOnScopeContext
		);

		const isToolIncomplete: ComputedRef = computed(
			() => props.tool.status.isIncompleteOnScopeContext
		);

		const isToolIncompleteOperational: ComputedRef = computed(
			() => props.tool.status.isIncompleteOperationalOnScopeContext
		);

		const isToolDeactivated: ComputedRef = computed(
			() => props.tool.status.isDeactivated
		);

		const isToolLaunchable = computed(() => {
			return (
				!isToolOutdated.value &&
				!isToolDeactivated.value &&
				!isToolIncomplete.value
			);
		});

		const toolChipTitle: ComputedRef<string | undefined> = computed(() => {
			return determineChipStatusTitle(props.tool.status);
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
			isToolIncomplete,
			isToolIncompleteOperational,
			toolChipTitle,
		};
	},
});
</script>

<style scoped>
.g-1 {
	gap: 4px;
}
</style>
