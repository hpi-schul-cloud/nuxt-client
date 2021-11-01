<template>
	<vCustomDialog
		ref="customDialog"
		:is-open="isOpen"
		class="room-dialog"
		@dialog-closed="$emit('dialog-closed', false)"
	>
		<div slot="title">
			<v-text-field
				v-show="roomNameEditMode"
				ref="roomNameInput"
				v-model="groupData.title"
				dense
				:append-icon="mdiKeyboardReturn"
				@blur="onUpdateRoomName"
				@keyup.enter="onRoomNameInputEnter"
			></v-text-field>
			<h2
				v-show="!roomNameEditMode"
				class="text-h4 my-2"
				tabindex="5"
				@click="onEditRoom"
				@focus="onEditRoom"
			>
				{{ groupData.title }}
				<v-icon>{{ mdiPencil }}</v-icon>
			</h2>
		</div>
		<template slot="content">
			<v-row class="d-flex justify-center ma-1">
				<v-col
					v-for="(item, index) in groupData.groupElements"
					:key="item.id"
					class="d-flex justify-center"
					:cols="4"
				>
					<vRoomAvatar
						:ref="`index-${index}`"
						:item="item"
						:size="avatarSize"
						:show-badge="true"
						:draggable="true"
						class="rounded dialog-avatar"
						@startDrag="$emit('drag-from-group', $event)"
					></vRoomAvatar>
				</v-col>
			</v-row>
		</template>
	</vCustomDialog>
</template>
<script lang="ts">
import Vue from "vue";
import RoomsModule from "@store/rooms";
import vRoomAvatar from "@components/atoms/vRoomAvatar.vue";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { mdiPencil, mdiKeyboardReturn } from "@mdi/js";

export default Vue.extend({
	components: {
		vCustomDialog,
		vRoomAvatar,
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
			type: Number,
			required: true,
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
			RoomsModule.update(this.groupData);
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
