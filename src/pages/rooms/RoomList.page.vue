<template>
	<room-wrapper :has-rooms="hasRooms">
		<template #header>
			<h1 class="text-h3 pt-2">
				{{ $t("pages.rooms.index.courses.all") }}
			</h1>
			<div class="mb-5 header-div">
				<div class="btn">
					<v-btn
						variant="outlined"
						size="small"
						to="/rooms-overview"
						data-testid="go-to-active-courses"
						>{{ $t("pages.rooms.index.courses.active") }}
					</v-btn>
				</div>
			</div>
		</template>
		<template #page-content>
			<v-row class="d-flex justify-center search">
				<v-text-field
					ref="search"
					class="px-1"
					v-model="searchText"
					variant="solo"
					rounded
					single-line
					:label="$t('pages.rooms.index.search.label')"
					:append-inner-icon="mdiMagnify"
					:aria-label="$t('pages.rooms.index.search.label')"
					data-testid="search-field-course"
				/>
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
							/>
						</v-col>
					</v-row>
				</v-container>
			</v-row>
		</template>
	</room-wrapper>
</template>

<script lang="ts">
import RoomWrapper from "@/components/templates/RoomWrapper.vue";
import vRoomAvatar from "@/components/atoms/vRoomAvatar.vue";
import { roomsModule } from "@/store";
import { ListItemsObject } from "@/store/types/rooms";
import { mdiMagnify } from "@mdi/js";
import { buildPageTitle } from "@/utils/pageTitle";
import { defineComponent } from "vue";

export default defineComponent({
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
		document.title = buildPageTitle(
			this.$t("pages.rooms.index.courses.all").toString()
		);
		await roomsModule.fetchAllElements();
	},
});
</script>

<style lang="scss" scoped>
.search {
	flex-wrap: nowrap;
	max-width: 600px;
	margin: 0 auto;
}
</style>
