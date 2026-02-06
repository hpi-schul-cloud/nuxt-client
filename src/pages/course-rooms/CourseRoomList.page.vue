<template>
	<CourseRoomWrapper :has-rooms="hasRooms">
		<template #header>
			<h1 class="py-2">
				{{ $t("pages.courseRooms.index.courses.all") }}
			</h1>
			<div class="header-actions-section mb-5">
				<v-btn variant="outlined" size="small" to="/rooms/courses-overview" data-testid="go-to-active-courses">
					{{ $t("pages.courseRooms.index.courses.active") }}
				</v-btn>
			</div>
		</template>
		<template #page-content>
			<v-row class="d-flex justify-center search">
				<SearchField
					ref="search"
					v-model="searchText"
					density="default"
					class="px-1"
					:label="$t('pages.courseRooms.index.search.label')"
					:clearable="false"
					data-testid="search-field-course"
				/>
			</v-row>
			<v-row>
				<v-container fluid>
					<v-row>
						<v-col
							v-for="room in rooms"
							:key="room.title"
							class="d-flex justify-center cols-12 xs-6 sm-6 lg-4 xl-2"
							cols="4"
							xl="2"
							lg="2"
							md="3"
							sm="3"
						>
							<CourseRoomAvatar :ref="`${room.id}-avatar`" class="room-avatar" :item="room" size="5em" />
						</v-col>
					</v-row>
				</v-container>
			</v-row>
		</template>
	</CourseRoomWrapper>
</template>

<script lang="ts">
import CourseRoomAvatar from "@/components/course-rooms/CourseRoomAvatar.vue";
import CourseRoomWrapper from "@/components/course-rooms/CourseRoomWrapper.vue";
import { courseRoomListModule } from "@/store";
import { ListItemsObject } from "@/store/types/rooms";
import { buildPageTitle } from "@/utils/pageTitle";
import { SearchField } from "@ui-controls";
import { defineComponent } from "vue";

export default defineComponent({
	components: {
		CourseRoomWrapper,
		CourseRoomAvatar,
		SearchField,
	},
	data() {
		return {
			searchText: "",
		};
	},
	computed: {
		rooms(): Array<ListItemsObject> {
			return JSON.parse(JSON.stringify(courseRoomListModule.getAllElements)).filter((room: ListItemsObject) =>
				room.searchText?.toLowerCase().includes(this.$data.searchText.toLowerCase())
			);
		},
		hasRooms(): boolean {
			return courseRoomListModule.hasRooms;
		},
	},
	async mounted() {
		document.title = buildPageTitle(this.$t("pages.courseRooms.index.courses.all").toString());
		await courseRoomListModule.fetchAllElements();
	},
});
</script>

<style scoped>
.search {
	flex-wrap: nowrap;
	max-width: 600px;
	margin: 0 auto;
}

.header-actions-section {
	height: 56px;
	display: flex;
	align-items: center;
}
</style>
