<template>
	<default-wireframe
		ref="main"
		headline=""
		:full-width="true"
		:aria-label="$t('pages.courses.index.courses.all')"
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
	</default-wireframe>
</template>

<script lang="ts">
import Vue from "vue";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import vRoomAvatar from "@components/atoms/vRoomAvatar.vue";
import { roomsModule } from "@/store";
import { ListItemsObject } from "@store/types/rooms";

export default Vue.extend({
	components: {
		vRoomAvatar,
		DefaultWireframe,
	},
	layout: "defaultVuetify",
	data() {
		return {
			searchText: "",
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
	},
	async mounted() {
		await roomsModule.fetchAllElements();
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
@import "@styles";
.search {
	flex-wrap: nowrap;
}
</style>
