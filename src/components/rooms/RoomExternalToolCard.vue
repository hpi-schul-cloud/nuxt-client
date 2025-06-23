<template>
	<room-base-card
		v-if="showTool"
		:title="toolName"
		:logo-url="tool.logoUrl"
		:open-in-new-tab="tool.openInNewTab"
		test-id="tool-card"
		@click="handleClick"
	>
		<template #under-title>
			<LineClamp class="pr-10" data-testid="tool-card-domain">
				{{ tool.domain }}
			</LineClamp>
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

<script setup lang="ts">
import {
	ExternalToolDisplayData,
	useContextExternalToolConfigurationStatus,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { mdiPencilOutline, mdiTrashCanOutline } from "@icons/material";
import { InfoChip, WarningChip } from "@ui-chip";
import { LineClamp } from "@ui-line-clamp";
import { RoomDotMenu } from "@ui-room-details";
import { computed, ComputedRef, PropType, watch } from "vue";
import { useI18n } from "vue-i18n";
import RoomBaseCard from "./RoomBaseCard.vue";

const props = defineProps({
	tool: {
		type: Object as PropType<ExternalToolDisplayData>,
		required: true,
	},
	canEdit: {
		type: Boolean,
		required: true,
	},
});

const emit = defineEmits(["edit", "delete", "error", "refresh"]);

const { t } = useI18n();

const {
	toolLaunchRequest,
	fetchContextLaunchRequest,
	launchTool,
	error: launchError,
} = useExternalToolLaunchState(() => emit("refresh"));

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

const isDeepLinkingTool: ComputedRef = computed(
	() => !!props.tool.isLtiDeepLinkingTool
);

const hasDeepLink: ComputedRef = computed(() => !!props.tool.ltiDeepLink);

const toolName: ComputedRef = computed(() => {
	if (isDeepLinkingTool.value) {
		return hasDeepLink.value
			? props.tool.name
			: t("feature-board-external-tool-element.placeholder.selectContent", {
					toolName: props.tool.name,
				});
	}

	return props.tool.name;
});

const toolDomain: ComputedRef<string | undefined> = computed(() => {
	if (!toolLaunchRequest.value?.url) {
		return undefined;
	}

	return new URL(toolLaunchRequest.value.url).hostname;
});

const showTool: ComputedRef = computed(
	() => !(isDeepLinkingTool.value && !hasDeepLink.value && !isTeacher())
);

const isToolOutdated: ComputedRef = computed(
	() =>
		props.tool.status.isOutdatedOnScopeSchool ||
		props.tool.status.isOutdatedOnScopeContext
);

const isToolIncomplete: ComputedRef = computed(
	() => props.tool.status.isIncompleteOnScopeContext
);

const showAsIncompleteOperational: ComputedRef = computed(
	() => props.tool.status.isIncompleteOperationalOnScopeContext && isTeacher()
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
</script>
