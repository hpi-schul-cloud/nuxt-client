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
				@blur="onUpdateRoomName"
				@focus="onFocus"
				@keyup.enter="onUpdateRoomName"
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
import Vue from "vue";

import { mdiKeyboardReturn, mdiPencilOutline } from "@mdi/js";

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
		avatarSize: {
			type: String,
			required: true,
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
		onFocus() {
			this.roomNameEditMode = true;
		},
		async onUpdateRoomName(event: Event) {
			if (this.roomNameEditMode) {
				this.roomNameEditMode = false;
				await roomsModule.update(this.data);
			}

			if (
				event instanceof KeyboardEvent &&
				event.target instanceof HTMLElement
			) {
				event.target.blur();
			}
		},
	},
});
</script>
