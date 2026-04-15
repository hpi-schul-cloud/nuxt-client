<template>
	<SvsDialog :model-value="isOpen" no-actions :title="data.title" @cancel="emit('update:isOpen', false)">
		<template #content>
			<VTextField
				v-model="data.title"
				density="compact"
				class="pt-2"
				flat
				:aria-label="$t('pages.rooms.roomModal.courseGroupTitle')"
				:placeholder="$t('pages.rooms.roomModal.courseGroupTitle')"
				:label="$t('pages.rooms.roomModal.courseGroupTitle')"
				:rules="[validateOnOpeningTag]"
				@blur="onBlur"
				@keyup.enter="onEnterInput"
			/>
			<CourseRoomAvatarIterator
				class="iterator"
				:avatars="groupData.groupElements"
				:item-size="itemSize"
				:col-count="4"
				:max-items="-1"
				:can-draggable="draggable"
				show-badge
				@start-drag="$emit('drag-from-group', $event)"
			/>
		</template>
	</SvsDialog>
</template>
<script setup lang="ts">
import CourseRoomAvatarIterator from "./CourseRoomAvatarIterator.vue";
import { type GroupDataType, useCourseRoomListStore } from "@data-course-rooms";
import { SvsDialog } from "@ui-dialog";
import { useOpeningTagValidator } from "@util-validators";
import { ref, watch } from "vue";

type Props = {
	isOpen: boolean;
	groupData: GroupDataType;
	itemSize?: string;
	draggable?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
	itemSize: "5em",
	draggable: false,
});

const emit = defineEmits(["update:isOpen", "drag-from-group"]);

const { validateOnOpeningTag } = useOpeningTagValidator();
const courseRoomListStore = useCourseRoomListStore();
const { updateCourse } = courseRoomListStore;

const data = ref<GroupDataType>({
	id: "",
	title: "",
	shortTitle: "",
	displayColor: "",
	xPosition: -1,
	yPosition: -1,
	groupId: "",
	groupElements: [],
	copyingSince: "",
	isSynchronized: false,
	isLocked: false,
});

const updateCourseGroupName = async () => {
	if (validateOnOpeningTag(data.value.title) === true) {
		await updateCourse({
			id: data.value.groupId,
			title: data.value.title,
			shortTitle: data.value.shortTitle,
			displayColor: data.value.displayColor,
			xPosition: data.value.xPosition,
			yPosition: data.value.yPosition,
			isSynchronized: data.value.isSynchronized,
		});
	}
};

const onBlur = async () => {
	await updateCourseGroupName();
};

const onEnterInput = async () => {
	await updateCourseGroupName();
};

watch(
	() => props.groupData,
	(newVal: GroupDataType) => {
		data.value = { ...newVal };
	},
	{ deep: true }
);
</script>
