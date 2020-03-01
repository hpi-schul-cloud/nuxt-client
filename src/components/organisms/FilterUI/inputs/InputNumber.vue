<template>
	<label class="label">
		{{ label }}
		<input v-model.number="vmodelProxy" type="number" />
	</label>
</template>

<script>
export default {
	model: {
		prop: "value",
		event: "input",
	},
	props: {
		label: {
			type: String,
			default: "",
		},
		value: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		vmodelProxy: {
			get() {
				return this.value;
			},
			set(to) {
				this.$emit("input", to);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.checkbox-list {
	display: block;
	border: 0;
	.label,
	input {
		display: block;
		width: 100%;
	}
}
</style>
