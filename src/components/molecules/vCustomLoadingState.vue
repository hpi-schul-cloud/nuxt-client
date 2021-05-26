<template>
	<v-container>
		<v-skeleton-loader ref="skeleton" :type="type"></v-skeleton-loader>
	</v-container>
</template>

<script>
export default {
	components: {},
	layout: "defaultVuetify",
	props: {
		type: {
			type: String,
			required: true,
		},
	},
};
</script>
