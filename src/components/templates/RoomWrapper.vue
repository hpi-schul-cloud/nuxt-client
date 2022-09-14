<template>
	<default-wireframe
		ref="main"
		headline=""
		:full-width="true"
		:aria-label="$t('pages.courses.index.courses.all')"
		:fab-items="fabItems"
		@fabButtonEvent="fabClick"
	>
		<template slot="header">
			<slot name="header"></slot>
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
		<template v-if="!isLoading && !hasRooms">
			<v-custom-empty-state
				ref="rooms-empty-state"
				image="@assets/img/empty-state/rooms-empty-state.svg"
				:title="$t('pages.rooms.allRooms.emptyState.title')"
				class="mt-16"
			/>
		</template>
		<template v-else>
			<slot name="page-content"></slot>
		</template>
		<import-modal
			v-model="importDialog.isOpen"
			class="import-modal"
			@update-rooms="updateRooms"
		>
		</import-modal>
	</default-wireframe>
</template>

<script lang="ts">
import Vue from "vue";
import { authModule, envConfigModule, roomsModule } from "@/store";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState.vue";
import ImportModal from "@components/molecules/ImportModal.vue";
import { mdiPlus, mdiCloudDownload, mdiSchool } from "@mdi/js";

// eslint-disable-next-line vue/require-direct-export
export default Vue.extend({
	components: {
		DefaultWireframe,
		vCustomEmptyState,
		ImportModal,
	},
	props: {
		headerAriaLabel: {
			type: String,
			default: "",
		},
		hasRooms: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			importDialog: {
				isOpen: false,
			},
		};
	},
	computed: {
		fabItems() {
			if (
				authModule.getUserPermissions.includes("COURSE_CREATE".toLowerCase())
			) {
				// @ts-ignore
				if (envConfigModule.getEnv.FEATURE_COURSE_SHARE) {
					return {
						icon: mdiPlus,
						title: this.$t("common.actions.create"),
						ariaLabel: this.$t("common.actions.create"),
						testId: "add-course-button",
						actions: [
							{
								label: this.$t("pages.rooms.fab.add.course"),
								icon: mdiSchool,
								href: "/courses/add",
								dataTestid: "fab_button_add_course",
								ariaLabel: this.$t("pages.rooms.fab.add.course"),
							},
							{
								label: this.$t("pages.rooms.fab.import.course"),
								icon: mdiCloudDownload,
								dataTestid: "fab_button_import_course",
								ariaLabel: this.$t("pages.rooms.fab.import.course"),
								customEvent: {
									name: "fabButtonEvent",
									value: true,
								},
							},
						],
					};
				}
				return {
					icon: mdiPlus,
					title: this.$t("common.actions.create"),
					href: "/courses/add",
					ariaLabel: this.$t("common.actions.create"),
					testId: "add-course-button",
				};
			}

			return null;
		},
		isLoading(): boolean {
			return roomsModule.getLoading;
		},
	},
	methods: {
		fabClick() {
			this.$data.importDialog.isOpen = true;
		},
		async updateRooms() {
			// @ts-ignore
			await roomsModule.fetchAllElements();
		},
	},
});
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@styles";

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
