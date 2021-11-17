<template>
	<default-wireframe ref="main" :headline="title" :full-width="true">
		<v-row class="mb-0 pb-0">
			<v-col class="text-right pr-2 pt-5">
				<v-btn to="/rooms-overview">Back to Dashhboard</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="mb-0 pb-0">
				<h4 class="ma-0 pa-0">Search All Courses</h4>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-text-field
					ref="search"
					label="search"
					:append-icon="mdiMagnify"
					@input="searchItems"
				>
				</v-text-field>
			</v-col>
		</v-row>
		<v-row>
			<v-container fluid>
				<v-row>
					<v-col
						v-for="item in allElements"
						:key="item.name"
						class="d-flex justify-center cols-12 xs-6 sm-6 lg-4 xl-2"
						cols="4"
						xl="2"
						lg="2"
						md="3"
						sm="3"
					>
						<vRoomAvatar
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
import RoomsModule from "@store/rooms";
import { mdiMagnify } from "@mdi/js";

type RoomItem = {
	id: string;
	title: string;
	shortTitle: string;
	displayColor: string;
	xPosition?: number;
	yPosition?: number;
};

type AllElements = Array<RoomItem> | any;

export default Vue.extend({
	components: {
		vRoomAvatar,
		DefaultWireframe,
	},
	layout: "defaultVuetify",
	data() {
		const allElements: AllElements = [{}];

		return {
			mdiMagnify,
			allElements,
		};
	},
	computed: {
		title() {
			return this.$t("common.labels.greeting", { name: this.$user.firstName });
		},
	},
	async mounted() {
		await RoomsModule.fetchAllElements();
		this.$data.allElements = RoomsModule.getAllElements;
	},
	methods: {
		searchItems(filterText: string) {
			this.$data.allElements = RoomsModule.getAllElements;
			const filtered = JSON.parse(
				JSON.stringify(this.$data.allElements)
			).filter((item: RoomItem) =>
				item.title.toLowerCase().includes(filterText.toLowerCase())
			);
			this.$data.allElements = filtered;
		},
	},
});
</script>
