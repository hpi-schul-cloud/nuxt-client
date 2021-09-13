<template>
	<div>
		<v-avatar class="ma-0 pa-1" :size="size"> </v-avatar>
	</div>
</template>
<script>
export default {
	props: {
		size: {
			type: Number || String,
			required: true,
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
