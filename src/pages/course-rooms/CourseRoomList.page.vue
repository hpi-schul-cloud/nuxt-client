<template>
	<CourseRoomWrapper :has-rooms="hasRooms">
		<template #header>
			<h1 class="py-2">
				{{ t("pages.courseRooms.index.courses.all") }}
			</h1>
			<div class="header-actions-section mb-5">
				<VBtn variant="outlined" size="small" to="/rooms/courses-overview" data-testid="go-to-active-courses">
					{{ t("pages.courseRooms.index.courses.active") }}
				</VBtn>
			</div>
		</template>
		<template #page-content>
			<VRow class="d-flex justify-center search">
				<SvsSearchField
					ref="search"
					v-model="searchText"
					density="default"
					class="px-1"
					:label="t('pages.courseRooms.index.search.label')"
					:clearable="false"
					data-testid="search-field-course"
				/>
			</VRow>
			<VRow>
				<VContainer fluid>
					<VRow>
						<VCol
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
						</VCol>
					</VRow>
				</VContainer>
			</VRow>
		</template>
	</CourseRoomWrapper>
</template>

<script setup lang="ts">
import CourseRoomAvatar from "@/components/course-rooms/CourseRoomAvatar.vue";
import CourseRoomWrapper from "@/components/course-rooms/CourseRoomWrapper.vue";
import { ListItemsObject } from "@/store/types/rooms";
import { buildPageTitle } from "@/utils/pageTitle";
import { useCourseRoomListStore } from "@data-courses";
import { SvsSearchField } from "@ui-controls";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const courseRoomListStore = useCourseRoomListStore();
const { hasRooms } = storeToRefs(courseRoomListStore);

const searchText = ref("");
const rooms = computed<Array<ListItemsObject>>(() =>
	JSON.parse(JSON.stringify(courseRoomListStore.getAllElements)).filter((room: ListItemsObject) =>
		room.searchText?.toLowerCase().includes(searchText.value.toLowerCase())
	)
);

onMounted(async () => {
	document.title = buildPageTitle(t("pages.courseRooms.index.courses.all").toString());
	await courseRoomListStore.fetchAllElements();
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
