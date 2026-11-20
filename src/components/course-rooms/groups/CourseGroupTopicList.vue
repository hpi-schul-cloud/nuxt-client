<template>
	<section data-testid="course-group-topics">
		<div class="d-flex align-center justify-space-between flex-wrap ga-2 mb-2">
			<h2 class="text-h4 mb-0">{{ t("common.words.topics") }}</h2>
			<VBtn
				v-if="canCreate"
				:href="`/courses/${courseId}/topics/add?courseGroup=${groupId}`"
				:prepend-icon="mdiPlus"
				color="primary"
				size="small"
				data-testid="course-group-add-topic"
			>
				{{ t("pages.courseRoomDetails.groups.details.topics.add") }}
			</VBtn>
		</div>
		<VList v-if="topics.length" class="py-0" border rounded>
			<VListItem
				v-for="topic in topics"
				:key="topic.id"
				:href="`/courses/${courseId}/topics/${topic.id}?courseGroup=${groupId}`"
				:title="topic.name"
				data-testid="course-group-topic"
			>
				<template v-if="canEdit" #append>
					<VBtn
						:href="`/courses/${courseId}/topics/${topic.id}/edit?courseGroup=${groupId}&returnUrl=${returnUrl}`"
						:icon="mdiPencilOutline"
						:aria-label="`${t('pages.courseRoomDetails.groups.details.topics.edit')}: ${topic.name}`"
						variant="text"
						size="small"
						data-testid="course-group-topic-edit"
					/>
					<VBtn
						:icon="mdiTrashCanOutline"
						:aria-label="`${t('common.actions.delete')}: ${topic.name}`"
						variant="text"
						size="small"
						data-testid="course-group-topic-delete"
						@click.prevent.stop="emit('delete', topic)"
					/>
				</template>
			</VListItem>
		</VList>
		<p v-else class="text-medium-emphasis" data-testid="course-group-topics-empty">
			{{ t("pages.courseRoomDetails.groups.details.topics.empty") }}
		</p>
	</section>
</template>

<script setup lang="ts">
import { CourseGroupTopic } from "@data-course-group";
import { mdiPencilOutline, mdiPlus, mdiTrashCanOutline } from "@icons/material";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	topics: {
		type: Array as PropType<CourseGroupTopic[]>,
		required: true,
	},
	courseId: {
		type: String,
		required: true,
	},
	groupId: {
		type: String,
		required: true,
	},
	canCreate: {
		type: Boolean,
		default: false,
	},
	canEdit: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits<{
	(e: "delete", topic: CourseGroupTopic): void;
}>();

const { t } = useI18n();

// The legacy topic editor redirects back to this path (without leading slash) after saving
const returnUrl = computed(() => encodeURIComponent(`rooms/${props.courseId}/groups/${props.groupId}`));
</script>
