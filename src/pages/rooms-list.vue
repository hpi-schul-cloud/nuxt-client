<template>
	<default-wireframe
		ref="main"
		:headline="$t('pages.courses.index.courses.all')"
		:full-width="true"
		:breadcrumbs="breadcrumbs"
	>
		<v-row class="justify-center search">
			<div class="d-flex justify-space-between col-sm-8">
				<v-text-field
					ref="search"
					v-model="searchText"
					rounded
					solo
					:label="$t('common.words.search')"
					:append-icon="mdiMagnify"
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
							@click="onClickSingleItem(item)"
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
import RoomsModule from "@store/rooms";
import { mdiMagnify } from "@mdi/js";
import { AllElementsObject } from "@store/types/rooms";

export default Vue.extend({
	components: {
		vRoomAvatar,
		DefaultWireframe,
	},
	layout: "defaultVuetify",
	data() {
		return {
			mdiMagnify,
			searchText: "",
			breadcrumbs: [
				{
					text: this.$t("pages.courses.index.courses.active"),
					to: "/rooms-overview",
				},
			],
		};
	},
	computed: {
		title() {
			return this.$t("common.labels.greeting", { name: this.$user.firstName });
		},
		items(): Array<AllElementsObject> {
			return JSON.parse(JSON.stringify(RoomsModule.allElements)).filter(
				(item: AllElementsObject) =>
					item.title.toLowerCase().includes(this.$data.searchText.toLowerCase())
			);
		},
	},
	async created() {
		await RoomsModule.fetchAllElements();
	},
	methods: {
		onClickSingleItem(item: AllElementsObject) {
			// if (!item.id) return;
			window.location.href = `/courses/${item.id}`;
			// this.$router.push({
			// 	name: `/courses/${item.id}`,
			// });
		},
	},
});
</script>

<style lang="scss" scoped>
@import "@styles";
.search {
	flex-wrap: nowrap;
}
</style>
