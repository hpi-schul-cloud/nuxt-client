<template>
	<div
		draggable="true"
		class="group-avatar"
		@dragstart="startDragAvatar"
		@drop.prevent="dropAvatar"
		@dragover.prevent
	>
		<v-badge
			class="badge-component"
			bordered
			color="var(--color-primary)"
			icon="mdi-lock"
			overlap
			:value="hasNotifications"
		>
			<v-card
				:height="size"
				:width="size"
				outlined
				class="ma-0 card-component"
				@click.prevent="$emit('clicked', data.id)"
				@dragleave="dragLeave"
				@dragenter.prevent.stop="dragEnter"
			>
				<room-avatar-iterator
					ref="avatar-iterator"
					:items="data.groupElements"
					condense-layout
					item-size="0.8em"
					:col-count="itemSpecs.columnCount"
					:max-items="itemSpecs.maxItem"
				/>
			</v-card>
			<span
				class="d-flex justify-left mt-1 mx-1 sub-title"
				:style="{ width: titleWidth }"
				>{{ data.title }}</span
			>
		</v-badge>
	</div>
</template>
<script>
import RoomAvatarIterator from "@components/organisms/RoomAvatarIterator.vue";
export default {
	components: {
		RoomAvatarIterator,
	},
	props: {
		data: {
			type: Object,
			required: true,
		},
		size: {
			type: String,
			required: true,
		},
		maxItems: {
			type: Number || String,
			default: 4,
		},
		device: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			hovered: false,
			titleWidth: "50px",
		};
	},
	computed: {
		hasNotifications() {
			return this.data.groupElements.some((item) => item.notification == true);
		},
		itemSpecs() {
			return {
				columnCount: this.device == "large" || this.device == "desktop" ? 3 : 4,
				maxItem: this.device == "large" || this.device == "desktop" ? 16 : 9,
			};
		},
	},
	mounted() {
		switch (this.device) {
			case "large":
			case "desktop":
				this.titleWidth = "75px";
				break;
			default:
				this.titleWidth = "50px";
		}
	},
	methods: {
		startDragAvatar() {
			this.$emit("startDrag", this.data);
		},
		dragLeave() {
			this.hovered = false;
		},
		dragEnter() {
			this.hovered = true;
		},
		dropAvatar() {
			this.$emit("drop");
		},
	},
};
</script>
<style scoped>
.sub-title {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: var(--space-md);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.card-component {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	border-radius: 0.5em;
}
</style>
