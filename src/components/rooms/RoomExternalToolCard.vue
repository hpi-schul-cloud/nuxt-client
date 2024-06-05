<template>
	<room-base-card
		:title="tool.name"
		:logo-url="tool.logoUrl"
		:open-in-new-tab="tool.openInNewTab"
		test-id="tool-card"
		@click="handleClick"
	>
		<template #under-title>
			<div class="d-flex ga-1">
				<WarningChip
					v-if="isToolDeactivated"
					data-testId="tool-card-status-deactivated"
				>
					{{ $t("pages.rooms.tools.deactivated") }}
				</WarningChip>

				<WarningChip
					v-if="isToolNotLicensed"
					data-testId="tool-card-status-not-licensed"
				>
					{{ $t("common.medium.chip.notLicensed") }}
				</WarningChip>

				<InfoChip
					v-if="showAsIncompleteOperational"
					data-testId="tool-card-status-incompleteOperational"
					>{{ $t("pages.rooms.tools.outdated") }}
				</InfoChip>

				<WarningChip
					v-if="isToolOutdated || isToolIncomplete"
					data-testId="tool-card-status"
				>
					{{ $t("pages.rooms.tools.outdated") }}
				</WarningChip>
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
import {
	ExternalToolDisplayData,
	useContextExternalToolConfigurationStatus,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { mdiAlert, mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import { InfoChip, WarningChip } from "@ui-chip";
import { RoomDotMenu } from "@ui-room-details";
import { computed, ComputedRef, defineComponent, PropType, watch } from "vue";
import { useI18n } from "vue-i18n";
import RoomBaseCard from "./RoomBaseCard.vue";

export default defineComponent({
	name: "RoomExternalToolCard",
	components: { InfoChip, WarningChip, RoomBaseCard, RoomDotMenu },
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
			fetchContextLaunchRequest,
			launchTool,
			error: launchError,
		} = useExternalToolLaunchState();

		const { isTeacher } = useContextExternalToolConfigurationStatus();

		const handleClick = async () => {
			if (!isToolLaunchable.value) {
				emit("error", props.tool);
				return;
			}

			launchTool();

			await fetchContextLaunchRequest(props.tool.contextExternalToolId);

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

		const showAsIncompleteOperational: ComputedRef = computed(
			() => props.tool.status.isIncompleteOperationalOnScopeContext && isTeacher
		);

		const isToolDeactivated: ComputedRef = computed(
			() => props.tool.status.isDeactivated
		);

		const isToolNotLicensed: ComputedRef = computed(
			() => props.tool.status.isNotLicensed
		);

		const isToolLaunchable = computed(() => {
			return (
				!isToolOutdated.value &&
				!isToolDeactivated.value &&
				!isToolIncomplete.value &&
				!isToolNotLicensed.value
			);
		});

		const loadLaunchRequest = async () => {
			if (!isToolLaunchable.value) {
				return;
			}

			await fetchContextLaunchRequest(props.tool.contextExternalToolId);
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
			isToolNotLicensed,
			showAsIncompleteOperational,
		};
	},
});
</script>
