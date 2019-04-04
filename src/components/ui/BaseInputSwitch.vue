<template>
	<label>
		<div class="switch">
			<input :id="$attrs.name" v-model="toggle" type="checkbox" />
			<span class="slider"></span>
		</div>
		{{ $attrs.label }}
	</label>
</template>
<script>
export default {
	data() {
		return {
			toggle: true,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.switch {
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;
}

.slider {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: #ccc;
	-webkit-transition: 0.4s;
	transition: 0.4s;

	&::before {
		position: absolute;
		bottom: 4px;
		left: 4px;
		width: 26px;
		height: 26px;
		content: "";
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}
}
input:checked + .slider {
	background-color: #2196f3;
}
input:checked + .slider::before {
	-webkit-transform: translateX(26px);
	-ms-transform: translateX(26px);
	transform: translateX(26px);
}
</style>
