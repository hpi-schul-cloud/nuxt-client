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
						v-for="item in items"
						:key="item.name"
						class="d-flex justify-center cols-12 xs-6 sm-6 lg-4 xl-2"
						cols="4"
						xl="2"
						lg="2"
						md="3"
						sm="3"
					>
						<vRoomAvatar
							:ref="`${item.id}-avatar`"
							class="room-avatar"
							:item="item"
							size="5em"
							:show-badge="true"
						></vRoomAvatar>
					</v-col>
				</v-row>
			</v-container>
		</v-row>
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
import vRoomAvatar from "@components/atoms/vRoomAvatar.vue";
import { roomsModule } from "@/store";
import { ListItemsObject } from "@store/types/rooms";
// import ImportModal from "@components/molecules/ImportModal.vue";
// import { mdiPlus, mdiCloudDownload, mdiSchool } from "@mdi/js";

export default Vue.extend({
	components: {
		vRoomAvatar,
		DefaultWireframe,
		// ImportModal,
	},
	layout: "defaultVuetify",
	data() {
		return {
			searchText: "",
			// importDialog: {
			// 	isOpen: false,
			// },
		};
	},
	computed: {
		title() {
			return this.$t("common.labels.greeting", { name: this.$user.firstName });
		},
		items(): Array<ListItemsObject> {
			return JSON.parse(JSON.stringify(roomsModule.getAllElements)).filter(
				(item: ListItemsObject | any) =>
					item.searchText
						.toLowerCase()
						.includes(this.$data.searchText.toLowerCase())
			);
		},
	// 	fab() {
	// 		if (
	// 			authModule.getUserPermissions.includes("COURSE_CREATE".toLowerCase())
	// 		) {
	// 			if (envConfigModule.getEnv.FEATURE_COURSE_SHARE) {
	// 				return {
	// 					icon: mdiPlus,
	// 					title: this.$t("common.actions.create"),
	// 					ariaLabel: this.$t("common.actions.create"),
	// 					testId: "add-course-button",
	// 					actions: [
	// 						{
	// 							label: this.$t("pages.rooms.fab.add.course"),
	// 							icon: mdiSchool,
	// 							href: "/courses/add",
	// 							dataTestid: "fab_button_add_course",
	// 							ariaLabel: this.$t("pages.rooms.fab.add.course"),
	// 						},
	// 						{
	// 							label: this.$t("pages.rooms.fab.import.course"),
	// 							icon: mdiCloudDownload,
	// 							dataTestid: "fab_button_import_course",
	// 							ariaLabel: this.$t("pages.rooms.fab.import.course"),
	// 							customEvent: {
	// 								name: "fabButtonEvent",
	// 								value: true,
	// 							},
	// 						},
	// 					],
	// 				};
	// 			}
	// 			return {
	// 				icon: mdiPlus,
	// 				title: this.$t("common.actions.create"),
	// 				href: "/courses/add",
	// 				ariaLabel: this.$t("common.actions.create"),
	// 				testId: "add-course-button",
	// 			};
	// 		}

	// 		return null;
	// 	},
	},
	async mounted() {
		await roomsModule.fetchAllElements();
	},
	// methods: {
	// 	fabClick() {
	// 		this.importDialog.isOpen = true;
	// 	},
	// 	async updateRooms() {
	// 		await roomsModule.fetch();
	// 	},
	// },
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
@import "@styles";
.search {
	flex-wrap: nowrap;
}
</style>
