<template>
	<div>
		<v-badge
			class="ma-0"
			bordered
			color="var(--color-primary)"
			icon="mdi-lock"
			overlap
			:value="(showBadge && item.notification) || false"
		>
			<v-avatar
				class="ma-0 pa-1"
				:color="item.color"
				:size="size"
				:class="groupAvatar ? 'rounded' : 'rounded-xl'"
				@click="$emit('click', item)"
			>
				<span :class="groupAvatar ? 'group-avatar' : 'single-avatar'">{{
					avatarTitle
				}}</span>
			</v-avatar>
			<span v-if="!groupAvatar" class="d-flex justify-center mt-1 sub-title">{{
				item.title
			}}</span>
		</v-badge>
	</div>
</template>
<script>
export default {
	props: {
		item: {
			type: Object,
			required: true,
		},
		size: {
			type: Number || String,
			required: true,
		},
		groupAvatar: {
			type: Boolean,
		},
		showBadge: {
			type: Boolean,
		},
	},
	data() {
		return {};
	},
	computed: {
		avatarTitle() {
			const title = this.item.title || "";
			return (
				title.charAt(0).toUpperCase() +
				title.slice(1).toLowerCase().substring(0, 1)
			);
		},
	},
};
</script>
<style scoped>
.v-avatar {
	cursor: pointer;
	border: 1px solid;
}
.single-avatar {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	font-size: 1.2em;
	user-select: none;
}
.sub-title {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	font-size: 0.7em;
}
.group-avatar {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	font-size: 0.5em;
	user-select: none;
}
</style>
