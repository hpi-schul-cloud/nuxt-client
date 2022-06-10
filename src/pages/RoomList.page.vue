<template>
	<default-wireframe
		ref="main"
		headline=""
		:full-width="true"
		:aria-label="$t('pages.courses.index.courses.all')"
		:fab-items="fab"
		@fabButtonEvent="fabClick"
	>
		<template slot="header">
			<h1 class="text-h3 pt-2">
				{{ $t("pages.courses.index.courses.all") }}
			</h1>
			<div class="mb-5 header-div">
				<div class="btn">
					<v-btn
						color="secondary"
						outlined
						small
						to="/rooms-overview"
						data-testid="go-to-active-courses"
						>{{ $t("pages.courses.index.courses.active") }}
					</v-btn>
				</div>
			</div>
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
		<template v-else>
			<template v-if="!hasRooms">
				<v-custom-empty-state
					ref="rooms-empty-state"
					image="@assets/img/empty-state/rooms-empty-state.svg"
					:title="$t('pages.rooms.allRooms.emptyState.title')"
					class="mt-16"
				/>
			</template>
			<template v-else>
				<v-row class="justify-center search">
					<div class="d-flex justify-space-between col-sm-8">
						<v-text-field
							ref="search"
							v-model="searchText"
							rounded
							solo
							:label="$t('pages.rooms.index.search.label')"
							:append-icon="mdiMagnify"
							:aria-label="$t('common.labels.search')"
						>
						</v-text-field>
					</div>
				</v-row>
				<v-row>
					<v-container fluid>
						<v-row>
							<v-col
								v-for="room in rooms"
								:key="room.name"
								class="d-flex justify-center cols-12 xs-6 sm-6 lg-4 xl-2"
								cols="4"
								xl="2"
								lg="2"
								md="3"
								sm="3"
							>
								<vRoomAvatar
									:ref="`${room.id}-avatar`"
									class="room-avatar"
									:item="room"
									size="5em"
									:show-badge="true"
								></vRoomAvatar>
							</v-col>
						</v-row>
					</v-container>
				</v-row>
			</template>
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
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState.vue";
import vRoomAvatar from "@components/atoms/vRoomAvatar.vue";
import { authModule, envConfigModule, roomsModule } from "@/store";
import { ListItemsObject } from "@store/types/rooms";
import { mdiMagnify, mdiPlus, mdiCloudDownload, mdiSchool } from "@mdi/js";

export default Vue.extend({
	components: {
		vRoomAvatar,
		DefaultWireframe,
		vCustomEmptyState,
	},
	layout: "defaultVuetify",
	data() {
		return {
			searchText: "",
			importDialog: {
				isOpen: false,
			},
			mdiMagnify,
		};
	},
	computed: {
		fab() {
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
		rooms(): Array<ListItemsObject> {
			return JSON.parse(JSON.stringify(roomsModule.getAllElements)).filter(
				(room: ListItemsObject | any) =>
					room.searchText
						.toLowerCase()
						.includes(this.$data.searchText.toLowerCase())
			);
		},
		hasRooms(): boolean {
			return roomsModule.hasRooms;
		},
	},
	async mounted() {
		await roomsModule.fetchAllElements();
	},
	methods: {
		fabClick() {
			this.$data.importDialog.isOpen = true;
		},
	},
	head() {
		return {
			title: `${this.$t("pages.courses.index.courses.all")} - ${
				this.$theme.short_name
			}`,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@styles";
.search {
	flex-wrap: nowrap;
}

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
