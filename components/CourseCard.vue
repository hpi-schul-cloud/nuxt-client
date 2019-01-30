<template>
	<BaseCard>
		<CourseCardHeader :course="course" />
		<div class="card-info">
			<p>{{ course.description }}</p>
		</div>
		<CardFooter :course="course" />
	</BaseCard>
</template>

<script>
import CardFooter from "./CardFooter.vue";
import CourseCardHeader from "./CourseCardHeader.vue";

export default {
	name: "CourseCard",
	components: {
		CardFooter,
		CourseCardHeader,
	},
	props: {
		msg: {
			type: String,
			default: "test message",
		},
		course: {
			type: Object,
			default: () => ({
				color: "#555",
				name: "default name",
				times: [{ weekday: 1, startTime: 36000000 }],
			}),
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
.card-border {
	/*   flex-basis: 350px; */
	position: relative;
	flex: 0 0 350px;
	height: 200px;
	margin: 15px 5px;
	overflow: hidden;
	cursor: pointer;
	border-radius: 3px;
	box-shadow: 2px 2px 5px gray;
	transition: box-shadow 0.3s ease;
}
.card-main-content {
	width: 100%;
}

.card-info p {
	margin: 0;
	font-family: "Asul", sans-serif;
}
.card-border:hover {
	box-shadow: 0 4px 14px rgb(126, 124, 124);
}
</style>
