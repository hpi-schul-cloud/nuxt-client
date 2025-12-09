<template>
	<vCustomDialog
		ref="customDialog"
		:is-open="isOpen"
		class="room-dialog"
		@dialog-closed="$emit('update:isOpen', false)"
	>
		<template #title>
			<div class="pt-2 room-title">
				<v-text-field
					v-model="data.title"
					density="compact"
					flat
					:aria-label="$t('pages.rooms.roomModal.courseGroupTitle')"
					:placeholder="$t('pages.rooms.roomModal.courseGroupTitle')"
					:label="$t('pages.rooms.roomModal.courseGroupTitle')"
					:rules="[validateOnOpeningTag]"
					@blur="onBlur"
					@keyup.enter="onEnterInput"
				/>
			</div>
		</template>
		<template #content>
			<room-avatar-iterator
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
	</vCustomDialog>
</template>
<script setup lang="ts">
import RoomAvatarIterator from "@/components/organisms/RoomAvatarIterator.vue";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { courseRoomListModule } from "@/store";
import { useOpeningTagValidator } from "@util-validators";
import { PropType, ref, watch } from "vue";

type ItemType = {
	id: string;
	title: string;
	shortTitle: string;
	displayColor: string;
	xPosition: number;
	yPosition: number;
	to: string;
};

type GroupDataType = {
	title: string;
	shortTitle: string;
	displayColor: string;
	xPosition: number;
	yPosition: number;
	groupId: string;
	groupElements: ItemType[];
	isSynchronized: boolean;
	to: string;
};

const props = defineProps({
	isOpen: {
		type: Boolean,
		required: true,
	},
	groupData: {
		type: Object as PropType<GroupDataType>,
		required: true,
	},
	itemSize: {
		type: String,
		default: "5em",
	},
	draggable: {
		type: Boolean,
		default: false,
	},
});

defineEmits(["update:isOpen", "drag-from-group"]);

const { validateOnOpeningTag } = useOpeningTagValidator();

const data = ref<GroupDataType>({
	title: "",
	shortTitle: "",
	displayColor: "",
	xPosition: -1,
	yPosition: -1,
	groupId: "",
	groupElements: [],
	isSynchronized: false,
	to: "",
});

const updateCourseGroupName = async () => {
	if (validateOnOpeningTag(data.value.title) === true) {
		await courseRoomListModule.update({
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

<style lang="scss" scoped>
.room-title {
	width: 100%;
}
</style>
