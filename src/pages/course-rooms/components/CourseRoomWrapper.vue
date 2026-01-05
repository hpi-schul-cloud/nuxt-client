<template>
	<DefaultWireframe ref="main" max-width="short" :fab-items="fabItems">
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
import CommonCartridgeImportModal from "@/components/molecules/CommonCartridgeImportModal.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { Permission } from "@/serverApi/v3";
import { commonCartridgeImportModule, courseRoomListModule } from "@/store";
import { useAppStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { StartNewCourseSyncDialog } from "@feature-course-sync";
import { mdiImport, mdiPlus, mdiSchoolOutline, mdiSync } from "@icons/material";
import { EmptyState, RoomsEmptyStateSvg } from "@ui-empty-state";
import { FabAction } from "@ui-speed-dial-menu";
import { computed, ComputedRef, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

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

const fabItems: ComputedRef<FabAction[] | undefined> = computed(() => {
	if (!canCreateCourse.value) return;

	const actions: FabAction[] = [
		{
			icon: mdiSchoolOutline,
			label: t("pages.rooms.fab.add.course"),
			dataTestId: "fab_button_add_course",
			href: "/courses/add",
		},
	];

	if (useEnvConfig().value.FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED) {
		actions.push({
			icon: mdiSync,
			label: t("pages.rooms.fab.add.syncedCourse"),
			dataTestId: "fab_button_add_synced_course",
			clickHandler: () => (isCourseSyncDialogOpen.value = true),
		});
	}

	if (useEnvConfig().value.FEATURE_COMMON_CARTRIDGE_COURSE_IMPORT_ENABLED) {
		actions.push({
			icon: mdiImport,
			label: t("pages.rooms.fab.import.course"),
			dataTestId: "fab_button_import_course",
			clickHandler: () => commonCartridgeImportModule.setIsOpen(true),
		});
	}

	if (actions.length <= 1) {
		return [
			{
				icon: mdiPlus,
				label: t("pages.rooms.fab.create.course"),
				dataTestId: "add-course-button",
				href: "/courses/add",
			},
		];
	} else {
		return [
			{
				icon: mdiPlus,
				label: t("pages.rooms.fab.create.course"),
				dataTestId: "add-course-button",
			},
			...actions,
		];
	}
});

const isLoading = computed(() => courseRoomListModule.getLoading);

const isEmptyState = computed(() => !courseRoomListModule.getLoading && !props.hasRooms && !props.hasImportToken);
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings" as *;

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
