<template>
	<div>
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
				class="rounded-xl ma-0 card-component"
				outlined
				@click.prevent="$emit('clicked', data.id)"
			>
				<v-row class="ma-1 pa-1">
					<v-col
						v-for="item in itemsLimited"
						:key="item.id"
						cols="6"
						class="ma-0 pa-1"
					>
						<vRoomAvatar
							class="group-avatar-component"
							:item="item"
							:size="size / 3"
							:group-avatar="true"
						></vRoomAvatar>
					</v-col>
				</v-row>
			</v-card>
			<span class="d-flex justify-center mt-1 sub-title">{{ data.title }}</span>
		</v-badge>
	</div>
</template>
<script>
import vRoomAvatar from "@components/atoms/vRoomAvatar";
export default {
	components: {
		vRoomAvatar,
	},
	props: {
		data: {
			type: Object,
			required: true,
		},
		size: {
			type: Number || String,
			required: true,
		},
		maxItems: {
			type: Number || String,
			default: 4,
		},
		location: {
			type: String,
			default: "",
		},
	},
	data() {
		return {};
	},
	computed: {
		hasNotifications() {
			return this.data.group.some((item) => item.notification == true);
		},
		itemsLimited() {
			return this.data.group.slice(0, this.maxItems);
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
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
