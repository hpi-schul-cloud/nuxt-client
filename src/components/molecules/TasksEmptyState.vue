<template>
    <v-container class="v-container">
		<v-img
			max-height="400px"
			:src="image"
			fill="var(--color-primary)"
			role="presentation"
		></v-img>
		<h2 class="h4 centered">{{ title }}<br>{{ subtitle }}</h2>
    </v-container>
</template>

<script>
import tasksEmptyState from "@assets/img/empty-state/Task_Empty_State.svg";

export default {
	components: {},
	layout: "defaultVuetify",
	props: {
		image: {
			type: String,
			default: () => tasksEmptyState,
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

.centered {
	text-align: -webkit-center;
}

</style>