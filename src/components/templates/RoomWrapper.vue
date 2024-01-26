<template>
	<default-wireframe
		ref="main"
		headline=""
		:full-width="isLoading"
		:fab-items="fabItems"
		@fabButtonEvent="fabClick"
	>
		<template slot="header">
			<slot name="header" />
		</template>
		<template v-if="isLoading">
			<v-container fluid class="px-0"
				><v-skeleton-loader
					ref="skeleton-loader"
					type="date-picker-days"
					class="mt-16"
				/>
			</v-container>
		</template>
		<template v-else-if="isEmptyState">
			<v-custom-empty-state
				ref="rooms-empty-state"
				image="rooms-empty-state"
				:title="$t('pages.rooms.allRooms.emptyState.title')"
				class="mt-16"
			/>
		</template>
		<template v-else>
			<slot name="page-content" />
		</template>
		<import-modal
			v-model="importDialog.isOpen"
			class="import-modal"
			@update-rooms="updateRooms"
		/>
		<upload-modal
			v-model="uploadDialog.isOpen"
			class="upload-modal"
			@update-rooms="updateRooms"
		/>
	</default-wireframe>
</template>

<script>
import { authModule, envConfigModule, roomsModule } from "@/store";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import vCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import ImportModal from "@/components/molecules/ImportModal.vue";
import UploadModal from "@/components/molecules/UploadModal.vue";
import {
	mdiPlus,
	mdiCloudDownloadOutline,
	mdiImport,
	mdiSchoolOutline,
} from "@mdi/js";
import Vue from "vue";

export default Vue.extend({
	components: {
		DefaultWireframe,
		vCustomEmptyState,
		ImportModal,
		UploadModal,
	},
	props: {
		hasRooms: {
			type: Boolean,
			required: true,
		},
		hasImportToken: {
			type: Boolean,
			required: false,
		},
	},
	data() {
		return {
			importDialog: {
				isOpen: false,
			},
			uploadDialog: {
				isOpen: false,
			},
		};
	},
	computed: {
		fabItems() {
			if (
				authModule.getUserPermissions.includes("COURSE_CREATE".toLowerCase())
			) {
				if (
					envConfigModule.getEnv.FEATURE_COURSE_SHARE ||
					envConfigModule.getEnv.FEATURE_COMMON_CARTRIDGE_COURSE_IMPORT_ENABLED
				) {
					const fabItems = {
						icon: mdiPlus,
						title: this.$t("common.actions.create"),
						ariaLabel: this.$t("pages.rooms.fab.ariaLabel"),
						testId: "add-course-button",
						actions: [
							{
								icon: mdiSchoolOutline,
								label: this.$t("pages.rooms.fab.add.course"),
								href: "/courses/add",
								dataTestid: "fab_button_add_course",
								ariaLabel: this.$t("pages.rooms.fab.add.course"),
							},
						],
					};

					if (envConfigModule.getEnv.FEATURE_COURSE_SHARE) {
						fabItems.actions.push({
							label: this.$t("pages.rooms.fab.import.course"),
							icon: mdiCloudDownloadOutline,
							dataTestid: "fab_button_import_course",
							ariaLabel: this.$t("pages.rooms.fab.import.course"),
							customEvent: {
								name: "fabButtonEvent",
								value: "import",
							},
						});
					}

					if (
						envConfigModule.getEnv
							.FEATURE_COMMON_CARTRIDGE_COURSE_IMPORT_ENABLED
					) {
						fabItems.actions.push({
							label: this.$t("pages.rooms.fab.upload.course"),
							icon: mdiImport,
							dataTestid: "fab_button_upload_course",
							ariaLabel: this.$t("pages.rooms.fab.upload.course"),
							customEvent: {
								name: "fabButtonEvent",
								value: "upload",
							},
						});
					}

					return fabItems;
				}

				return {
					icon: mdiPlus,
					title: this.$t("common.actions.create"),
					href: "/courses/add",
					ariaLabel: this.$t("pages.rooms.fab.ariaLabel"),
					testId: "add-course-button",
				};
			}

			return null;
		},
		isLoading() {
			return roomsModule.getLoading;
		},
		isEmptyState() {
			return !roomsModule.getLoading && !this.hasRooms && !this.hasImportToken;
		},
	},
	methods: {
		fabClick(event) {
			if (event === "import") {
				this.$data.importDialog.isOpen = true;
			}

			if (event === "upload") {
				this.$data.uploadDialog.isOpen = true;
			}
		},
		async updateRooms() {
			await roomsModule.fetchAllElements();
		},
	},
});
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";

::v-deep .v-skeleton-loader__date-picker-days {
	justify-content: space-between;
	padding: 0;
}

::v-deep .v-skeleton-loader__avatar {
	width: 80px;
	max-width: 80px;
	height: 80px;
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	margin: 12px;
}

@media #{map-get($display-breakpoints, 'sm-and-up')} {
	::v-deep .v-skeleton-loader__avatar {
		/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
		margin: 12px 36px;
	}
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
	::v-deep .v-skeleton-loader__avatar {
		/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
		margin: 24px 48px;
	}
}
</style>
