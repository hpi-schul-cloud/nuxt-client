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
					@blur="onBlur"
					@keyup.enter="onEnterInput"
					:rules="[validateOnOpeningTag]"
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
				@startDrag="$emit('drag-from-group', $event)"
			/>
		</template>
	</vCustomDialog>
</template>
<script lang="ts">
import RoomAvatarIterator from "@/components/organisms/RoomAvatarIterator.vue";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { courseRoomListModule } from "@/store";
import { useOpeningTagValidator } from "@/utils/validation";
import { mdiKeyboardReturn, mdiPencilOutline } from "@icons/material";
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		const { validateOnOpeningTag } = useOpeningTagValidator();

		return {
			validateOnOpeningTag,
		};
	},
	components: {
		vCustomDialog,
		RoomAvatarIterator,
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
		groupData: {
			type: Object,
			default: () => ({}),
		},
		itemSize: {
			type: String,
			default: "5em",
		},
		draggable: {
			type: Boolean,
		},
	},
	emits: ["update:isOpen", "drag-from-group"],
	data() {
		return {
			mdiPencilOutline,
			mdiKeyboardReturn,
			data: {
				id: "",
				title: "",
				shortTitle: "",
				displayColor: "",
				xPosition: -1,
				yPosition: -1,
			},
		};
	},
	watch: {
		groupData() {
			this.data = { ...this.groupData };
		},
	},
	methods: {
		async updateCourseGroupName() {
			if (this.validateOnOpeningTag(this.data.title) === true) {
				await courseRoomListModule.update(this.data);
			}
		},
		async onBlur() {
			await this.updateCourseGroupName();
		},
		async onEnterInput() {
			await this.updateCourseGroupName();
		},
	},
});
</script>

<style lang="scss" scoped>
.room-title {
	width: 100%;
}
</style>
