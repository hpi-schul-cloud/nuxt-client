<template>
	<div>
		<v-avatar class="ma-0 pa-1" :size="size"> </v-avatar>
	</div>
</template>
<script>
export default {
	props: {
		// item: {
		// 	type: Object,
		// 	required: true,
		// },
		size: {
			type: Number || String,
			required: true,
		},
		// groupAvatar: {
		// 	type: Boolean,
		// },
		// showBadge: {
		// 	type: Boolean,
		// },
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
<style lang="scss" scoped>
@import "@styles";
// .v-avatar {
// 	cursor: pointer;
// 	border: 1px solid;
// }
// .single-avatar {
// 	font-size: 1.2em;
// 	user-select: none;
// }
// .sub-title {
// 	font-size: 0.7em;
// }
// .group-avatar {
// 	font-size: 0.5em;
// 	user-select: none;
// }
</style>
