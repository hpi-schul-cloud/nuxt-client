<template>
	<div>
		Color {{ color }}
		{{ test }}
		<p class="nummer"></p>
	</div>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			test: 123,
		};
	},
};
</script>

 