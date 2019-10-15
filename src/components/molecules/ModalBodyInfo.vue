<template>
	<div>
		<div class="icon">
			<slot name="icon"></slot>
		</div>
		<p>{{ text }}</p>
	</div>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.icon {
	font-size: 2.5rem;
}
</style>
