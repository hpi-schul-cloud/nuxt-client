<template>
	<vCustomDialog
		ref="customDialog"
		:is-open="isOpen"
		class="course-dialog"
		@dialog-closed="$emit('update:isOpen', false)"
	>
		<template #title>
			<div class="pt-2 course-title">
				<v-text-field
					v-model="data.title"
					density="compact"
					flat
					:aria-label="$t('pages.rooms.roomModal.courseGroupTitle')"
					:placeholder="$t('pages.rooms.roomModal.courseGroupTitle')"
					:label="$t('pages.rooms.roomModal.courseGroupTitle')"
					@blur="onBlur"
					@keyup.enter="onEnterInput"
				/>
			</div>
		</template>
		<template #content>
			<course-avatar-iterator
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
<script>
import CourseAvatarIterator from "@/components/organisms/CourseAvatarIterator.vue";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { coursesModule } from "@/store";
import { mdiKeyboardReturn, mdiPencilOutline } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	components: {
		vCustomDialog,
		CourseAvatarIterator,
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
			await coursesModule.update(this.data);
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
.course-title {
	width: 100%;
}
</style>
