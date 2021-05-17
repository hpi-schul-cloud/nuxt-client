<template>
    <v-container class="v-container">
		<v-img
			max-height="400px"
			src="@assets/img/empty-state/Task_Empty_State.svg"
			fill="var(--color-primary)"
			role="presentation"
		></v-img>
		<h2 class="h4 title">{{ title }}<br>{{ subtitle }}</h2>
    </v-container>
</template>

<script>

export default {
	components: {},
	layout: "defaultVuetify",
	props: {
		image: {
			type: String,
			default: () => "@assets/img/empty-state/Task_Empty_State.svg",
		},
		title: {
			type: String,
			default: () => "",
		},
		subtitle: {
			type: String,
			default: () => "",
		}
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.title {
	text-align: center;
}

</style>