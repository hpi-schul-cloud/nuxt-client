<template>
	<div>
		<input :id="id" type="radio" v-bind="$attrs" class="radio-btn" />
		<label :for="id" class="label">
			<slot />
		</label>
	</div>
</template>
<script>
export default {
	props: {
		id: {
			type: String,
			default: "",
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.label {
	display: flex;
	align-items: center;
	padding: 0.75rem 0;
	color: $color-primary;
	text-transform: uppercase;
	transition: all 0.25s linear;
	&::before {
		display: inline-block;
		width: 0.6rem;
		height: 0.6rem;
		margin-right: 0.625rem;
		content: "";
		border: 0.25rem solid $color-primary;
		border-radius: 50%;
		transition: all 0.25s linear;
	}
	&:hover {
		color: $color-primary;
		&::before {
			margin-right: 2rem;
			border: 0.25rem solid $color-primary;
		}
	}
}

.radio-btn {
	position: absolute;
	opacity: 0;
	&:checked + .label {
		color: $color-primary;
		&::before {
			margin-right: 2rem;
			background: $color-primary;
			border: 0.25rem solid $color-primary;
		}
	}
}
</style>
