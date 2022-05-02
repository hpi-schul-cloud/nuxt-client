<template>
	<vCustomDialog
		ref="customDialog"
		:is-open="isOpen"
		class="room-dialog"
		@dialog-closed="$emit('dialog-closed', false)"
	>
		<div slot="title" class="room-title">
			<v-text-field
				v-show="roomNameEditMode"
				ref="roomNameInput"
				v-model="groupData.title"
				dense
				:aria-label="$t('common.labels.title')"
				:append-icon="mdiKeyboardReturn"
				@blur="onUpdateRoomName"
				@keyup.enter="onRoomNameInputEnter"
			></v-text-field>
			<h2
				v-show="!roomNameEditMode"
				class="text-h4 my-2"
				tabindex="0"
				@click="onEditRoom"
				@focus="onEditRoom"
			>
				{{ groupData.title }}
				<v-icon>{{ mdiPencil }}</v-icon>
			</h2>
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
import Vue from "vue";
import { roomsModule } from "@/store";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import RoomAvatarIterator from "@components/organisms/RoomAvatarIterator.vue";

import { mdiPencil, mdiKeyboardReturn } from "@mdi/js";

export default Vue.extend({
	components: {
		vCustomDialog,
		RoomAvatarIterator,
	},
	model: {
		prop: "isOpen",
		event: "dialog-closed",
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
			mdiPencil,
			mdiKeyboardReturn,
		};
	},
	methods: {
		async onEditRoom() {
			this.roomNameEditMode = true;
			await Vue.nextTick();
			if (this.$refs?.roomNameInput instanceof HTMLElement) {
				this.$refs?.roomNameInput?.focus();
			}
		},
		onUpdateRoomName() {
			roomsModule.update(this.groupData);
			this.roomNameEditMode = false;
		},
		/*
			Calling onUpdateRoomName each on blur and enter results in calling in twice on pressing enter
			@keyup.enter="$event.target.blur" results in Illegal invocation error
		*/
		onRoomNameInputEnter(event: FocusEvent) {
			if (event.target instanceof HTMLElement) {
				event.target.blur();
			}
		},
	},
});
</script>
