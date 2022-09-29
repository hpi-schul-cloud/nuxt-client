<template>
	<room-wrapper
		:header-aria-label="$t('pages.courses.index.courses.all')"
		:has-rooms="hasRooms"
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
		<template slot="page-content">
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
	</room-wrapper>
</template>

<script lang="ts">
import Vue from "vue";
import RoomWrapper from "@components/templates/RoomWrapper.vue";
import vRoomAvatar from "@components/atoms/vRoomAvatar.vue";
import { roomsModule } from "@/store";
import { ListItemsObject } from "@store/types/rooms";
import { mdiMagnify } from "@mdi/js";

// eslint-disable-next-line vue/require-direct-export
export default Vue.extend({
	components: {
		RoomWrapper,
		vRoomAvatar,
	},
	data() {
		return {
			searchText: "",
			mdiMagnify,
		};
	},
	computed: {
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
