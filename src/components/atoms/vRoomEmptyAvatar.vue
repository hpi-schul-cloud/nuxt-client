<template>
	<div>
		<v-avatar class="ma-0 pa-1 avatar-component" :size="size"> </v-avatar>
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
};
</script>
