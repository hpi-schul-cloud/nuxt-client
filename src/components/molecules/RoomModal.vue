<template>
	<vCustomDialog
		ref="customDialog"
		:is-open="isOpen"
		class="room-dialog"
		@dialog-closed="$emit('update:isOpen', false)"
	>
		<div slot="title" class="room-title">
			<v-text-field
				v-model="data.title"
				dense
				flat
				:aria-label="$t('pages.rooms.roomModal.courseGroupTitle')"
				:placeholder="$t('pages.rooms.roomModal.courseGroupTitle')"
				:label="$t('pages.rooms.roomModal.courseGroupTitle')"
				@blur="onBlur"
				@keyup.enter="onEnterInput"
			/>
		</div>
		<template slot="content">
			<room-avatar-iterator
				class="iterator"
				:items="groupData.groupElements"
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
import { roomsModule } from "@/store";
import { mdiKeyboardReturn, mdiPencilOutline } from "@mdi/js";
import Vue from "vue";

// eslint-disable-next-line vue/require-direct-export
export default Vue.extend({
	components: {
		vCustomDialog,
		RoomAvatarIterator,
	},
	model: {
		prop: "isOpen",
		event: "update:isOpen",
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
			await roomsModule.update(this.data);
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
