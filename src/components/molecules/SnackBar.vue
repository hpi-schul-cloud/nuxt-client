<template>
	<div class="text-center">
		<v-snackbar
			v-model="snackbar"
			:multi-line="multiLine"
			:timeout="timeout"
			:color="color"
			:top="position.includes('top')"
			:right="position.includes('right')"
			:bottom="position.includes('bottom')"
			:left="position.includes('left')"
			class="mt-16"
			max-width="200"
		>
			{{ text }}

			<template #action="{ attrs }">
				<v-btn color="red" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
		},
		timeout: {
			type: Number,
			default: 5000,
		},
		text: {
			type: String,
			required: true,
		},
		position: {
			type: Array,
			default: () => ["top", "right"],
		},
		color: {
			type: String,
			default: "--color-secondary",
		},
	},
	data() {
		return {
			multiLine: false,
			snackbar: false,
		};
	},
	watch: {
		show() {
			this.snackbar = this.show;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@variables";
</style>
