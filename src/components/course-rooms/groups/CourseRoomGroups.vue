<template>
	<div v-if="isLoaded">
		<template v-if="groups.length">
			<h2 class="text-h4 mb-4" data-testid="course-groups-headline">
				{{
					canSeeAllGroups
						? t("pages.courseRoomDetails.groups.headline.all")
						: t("pages.courseRoomDetails.groups.headline.mine")
				}}
			</h2>
			<VRow>
				<VCol v-for="group in groups" :key="group.id" cols="12" sm="6">
					<CourseGroupCard :group="group" />
				</VCol>
			</VRow>
		</template>
		<EmptyState v-else :title="emptyStateTitle" data-testid="course-groups-empty-state">
			<template #media>
				<ContentEmptySvg />
			</template>
			<template v-if="canCreate" #text>
				{{ t("pages.courseRoomDetails.groups.empty.create.text") }}
			</template>
		</EmptyState>
	</div>
</template>

<script setup lang="ts">
import CourseGroupCard from "./CourseGroupCard.vue";
import { Permission } from "@api-server";
import { useAppStore } from "@data-app";
import { CourseGroup, useCourseGroups } from "@data-course-group";
import { ContentEmptySvg, EmptyState } from "@ui-empty-state";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	courseId: {
		type: String,
		required: true,
	},
	isArchived: {
		type: Boolean,
		default: false,
	},
});

const { t } = useI18n();
const { fetchGroups, canSeeAllGroups } = useCourseGroups();

const groups = ref<CourseGroup[]>([]);
const isLoaded = ref(false);

const canCreate = computed(
	() => !props.isArchived && useAppStore().userPermissions.includes(Permission.COURSEGROUP_CREATE)
);

const emptyStateTitle = computed(() => {
	if (props.isArchived) return t("pages.courseRoomDetails.groups.empty.noGroups");
	if (canCreate.value) return t("pages.courseRoomDetails.groups.empty.create.title");
	return t("pages.courseRoomDetails.groups.empty.noGroupsYet");
});

onMounted(async () => {
	groups.value = await fetchGroups(props.courseId);
	isLoaded.value = true;
});
</script>
