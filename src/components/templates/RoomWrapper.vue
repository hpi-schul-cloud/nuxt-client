<template>
	<DefaultWireframe ref="main" max-width="short" :fab-items="fabItems" @on-fab-item-click="fabItemClickHandler">
		<template #header>
			<slot name="header" />
		</template>
		<template v-if="isLoading">
			<VContainer class="loader">
				<VSkeletonLoader ref="skeleton-loader" type="date-picker-days" class="mt-6" />
			</VContainer>
		</template>
		<template v-else-if="isEmptyState">
			<EmptyState :title="t('pages.rooms.emptyState.title')">
				<template #media>
					<RoomsEmptyStateSvg />
				</template>
			</EmptyState>
		</template>
		<template v-else>
			<slot name="page-content" />
		</template>
		<StartNewCourseSyncDialog v-model:is-open="isCourseSyncDialogOpen" />
		<CommonCartridgeImportModal :max-width="480" class="upload-modal" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Fab, FabAction } from "./default-wireframe.types";
import CommonCartridgeImportModal from "@/components/molecules/CommonCartridgeImportModal.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { Permission } from "@/serverApi/v3";
import { commonCartridgeImportModule, courseRoomListModule } from "@/store";
import { useAppStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { StartNewCourseSyncDialog } from "@feature-course-sync";
import { mdiImport, mdiPlus, mdiSchoolOutline, mdiSync } from "@icons/material";
import { EmptyState, RoomsEmptyStateSvg } from "@ui-empty-state";
import { computed, ComputedRef, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

enum RoomFabEvent {
	COMMON_CARTRIDGE_IMPORT = "import",
	SYNCHRONIZED_COURSE = "syncedCourse",
}

const { t } = useI18n();

const props = defineProps({
	hasRooms: {
		type: Boolean,
		required: true,
	},
	hasImportToken: {
		type: Boolean,
		required: false,
	},
});

const isCourseSyncDialogOpen: Ref<boolean> = ref(false);

const canCreateCourse = useAppStore().hasPermission(Permission.CourseCreate);

const fabItems: ComputedRef<Fab | undefined> = computed(() => {
	if (canCreateCourse.value) {
		const actions: FabAction[] = [
			{
				icon: mdiSchoolOutline,
				label: t("pages.rooms.fab.add.course"),
				ariaLabel: t("pages.rooms.fab.add.course"),
				dataTestId: "fab_button_add_course",
				href: "/courses/add",
			},
		];

		if (useEnvConfig().value.FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED) {
			actions.push({
				icon: mdiSync,
				label: t("pages.rooms.fab.add.syncedCourse"),
				ariaLabel: t("pages.rooms.fab.add.syncedCourse"),
				dataTestId: "fab_button_add_synced_course",
				customEvent: RoomFabEvent.SYNCHRONIZED_COURSE,
			});
		}

		if (useEnvConfig().value.FEATURE_COMMON_CARTRIDGE_COURSE_IMPORT_ENABLED) {
			actions.push({
				icon: mdiImport,
				label: t("pages.rooms.fab.import.course"),
				ariaLabel: t("pages.rooms.fab.import.course"),
				dataTestId: "fab_button_import_course",
				customEvent: RoomFabEvent.COMMON_CARTRIDGE_IMPORT,
			});
		}

		const fab: Fab = {
			icon: mdiPlus,
			title: t("common.actions.create"),
			ariaLabel: t("pages.rooms.fab.ariaLabel"),
			dataTestId: "add-course-button",
		};

		if (actions.length <= 1) {
			fab.href = "/courses/add";
		} else {
			fab.actions = actions;
		}

		return fab;
	}

	return undefined;
});

const isLoading = computed(() => courseRoomListModule.getLoading);

const isEmptyState = computed(() => !courseRoomListModule.getLoading && !props.hasRooms && !props.hasImportToken);

const fabItemClickHandler = (event: string | undefined): void => {
	if (event === RoomFabEvent.SYNCHRONIZED_COURSE) {
		isCourseSyncDialogOpen.value = true;
	} else if (event === RoomFabEvent.COMMON_CARTRIDGE_IMPORT) {
		commonCartridgeImportModule.setIsOpen(true);
	}
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;

:deep(.v-skeleton-loader__date-picker-days) {
	justify-content: space-between;
	padding: 0;
}

:deep(.v-skeleton-loader__avatar) {
	width: 80px;
	max-width: 80px;
	margin: 12px;
}

.loader {
	max-width: var(--content-max-width);
}

@media #{map.get($display-breakpoints, 'sm-and-up')} {
	:deep(.v-skeleton-loader__avatar) {
		margin: 12px 36px;
	}
}

@media #{map.get($display-breakpoints, 'md-and-up')} {
	:deep(.v-skeleton-loader__avatar) {
		margin: 24px 36px;
	}
}
</style>
