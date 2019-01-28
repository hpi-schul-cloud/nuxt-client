<template>
	<div class="card-footer">
		<CardFooterCounter :course="course" />
		<button>Öffnen</button>
	</div>
</template>

<script>
import CardFooterCounter from './CardFooterCounter.vue';

export default {
	name: 'CardFooter',
	components: {
		CardFooterCounter,
	},
	props: {
		course: {
			type: Object,
			default: function() {},
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-footer {
	width: 100%;
	bottom: 0;
	position: absolute;
	text-align: right;
	padding: 10px;
	right: 0px;
}
</style>
