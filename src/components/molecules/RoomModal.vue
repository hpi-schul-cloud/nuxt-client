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
				solo
				:aria-label="$t('common.labels.title')"
				@blur="onBlur"
				@focus="onFocus"
				@keyup.enter="onEnterInput"
				:append-icon="mdiPencilOutline"
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
import { mdiPencilOutline } from "@mdi/js";
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
			roomNameEditMode: false,
			mdiPencilOutline,
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
			if (this.roomNameEditMode) {
				this.roomNameEditMode = false;
				await roomsModule.update(this.data);
			}
		},
		onFocus() {
			this.roomNameEditMode = true;
		},
		async onBlur() {
			await this.updateCourseGroupName();
		},
		async onEnterInput(event: KeyboardEvent) {
			if (event.target instanceof HTMLElement) {
				event.target.blur();
			}

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
