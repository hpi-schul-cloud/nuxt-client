<template>
	<DefaultWireframe
		ref="main"
		max-width="short"
		:fab-items="fabItems"
		@onFabItemClick="fabItemClickHandler"
	>
		<template #header>
			<slot name="header" />
		</template>
		<template v-if="isLoading">
			<VContainer class="loader">
				<VSkeletonLoader
					ref="skeleton-loader"
					type="date-picker-days"
					class="mt-6"
				/>
			</VContainer>
		</template>
		<template v-else-if="isEmptyState">
			<v-custom-empty-state
				ref="course-empty-state"
				image="course-empty-state"
				:title="$t('pages.rooms.allRooms.emptyState.title')"
				class="mt-16"
			/>
		</template>
		<template v-else>
			<slot name="page-content" />
		</template>
		<GroupSelectionDialog v-model:is-open="isCourseSyncDialogOpen" />
		<CommonCartridgeImportModal :max-width="480" class="upload-modal" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import CommonCartridgeImportModal from "@/components/molecules/CommonCartridgeImportModal.vue";
import VCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import {
	authModule,
	commonCartridgeImportModule,
	envConfigModule,
	coursesModule,
} from "@/store";
import { GroupSelectionDialog } from "@feature-course-sync";
import { mdiImport, mdiPlus, mdiSchoolOutline, mdiSync } from "@mdi/js";
import { computed, ComputedRef, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Fab, FabAction } from "./default-wireframe.types";

enum CourseFabEvent {
	COMMON_CARTRIDGE_IMPORT = "import",
	SYNCHRONIZED_COURSE = "syncedCourse",
}

const { t } = useI18n();

const props = defineProps({
	hasCourses: {
		type: Boolean,
		required: true,
	},
	hasImportToken: {
		type: Boolean,
		required: false,
	},
});

const isCourseSyncDialogOpen: Ref<boolean> = ref(false);

const fabItems: ComputedRef<Fab | undefined> = computed(() => {
	if (authModule.getUserPermissions.includes("COURSE_CREATE".toLowerCase())) {
		const actions: FabAction[] = [
			{
				icon: mdiSchoolOutline,
				label: t("pages.rooms.fab.add.course"),
				ariaLabel: t("pages.rooms.fab.add.course"),
				dataTestId: "fab_button_add_course",
				href: "/courses/add",
			},
		];

		if (envConfigModule.getEnv.FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED) {
			actions.push({
				icon: mdiSync,
				label: t("pages.rooms.fab.add.syncedCourse"),
				ariaLabel: t("pages.rooms.fab.add.syncedCourse"),
				dataTestId: "fab_button_add_synced_course",
				customEvent: CourseFabEvent.SYNCHRONIZED_COURSE,
			});
		}

		if (envConfigModule.getEnv.FEATURE_COMMON_CARTRIDGE_COURSE_IMPORT_ENABLED) {
			actions.push({
				icon: mdiImport,
				label: t("pages.rooms.fab.import.course"),
				ariaLabel: t("pages.rooms.fab.import.course"),
				dataTestId: "fab_button_import_course",
				customEvent: CourseFabEvent.COMMON_CARTRIDGE_IMPORT,
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

const isLoading: ComputedRef<boolean> = computed(() => {
	return coursesModule.getLoading;
});

const isEmptyState: ComputedRef<boolean> = computed(() => {
	return (
		!coursesModule.getLoading && !props.hasCourses && !props.hasImportToken
	);
});

const fabItemClickHandler = (event: CourseFabEvent): void => {
	if (event === CourseFabEvent.SYNCHRONIZED_COURSE) {
		isCourseSyncDialogOpen.value = true;
	} else if (event === CourseFabEvent.COMMON_CARTRIDGE_IMPORT) {
		commonCartridgeImportModule.setIsOpen(true);
	}
};
</script>

<style lang="scss" scoped>
@import "@/styles/settings.scss";

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
	// padding: 0 var(--space-lg); // Desktop
	max-width: var(--size-content-width-max);
}

@media #{map-get($display-breakpoints, 'sm-and-up')} {
	:deep(.v-skeleton-loader__avatar) {
		/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
		margin: 12px 36px;
	}
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
	:deep(.v-skeleton-loader__avatar) {
		/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
		margin: 24px 36px;
	}
}
</style>
