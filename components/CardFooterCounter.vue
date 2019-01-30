<template>
	<div class="card-footer-counter">
		<i class="fa fa-user" />
		<span>{{ (course.userIds || []).length }}</span>
	</div>
</template>

<script>
export default {
	name: "CardFooterCounter",
	props: {
		course: {
			type: Object,
			default: function() {},
		},
	},
	computed: {
		background_style() {
			return "background: " + this.course.color;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-footer-counter {
	position: absolute;
	bottom: 0;
	left: 20px;
	float: left;
	padding: 10px;
	text-align: left;
}
</style>
