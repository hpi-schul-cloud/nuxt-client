<template>
	<div class="footer">
		<div v-if="(course.alert || '') != ''" class="footer-alert">
			<PulsatingDot></PulsatingDot>

			<div class="alert-label">{{ course.alert }}</div>
		</div>
		<div
			v-else-if="(course.nextCourseTime || '') != ''"
			class="footer-next-course"
		>
			<div class="align-center">
				<ClockIcon />
			</div>
			<div class="align-center">{{ course.nextCourseTime }}</div>
		</div>
	</div>
</template>

<script>
import PulsatingDot from "./PulsatingDot.vue";
import ClockIcon from "@assets/clock.svg";

export default {
	name: "CardFooter",
	components: { PulsatingDot, ClockIcon },
	props: {
		course: {
			type: Object,
			default: () => ({
				alert: "",
				nextCourseTime: "",
			}),
		},
	},
	computed: {},
};
</script>

<style scoped>
.footer {
	height: 24px;
	padding-top: 5px;
	margin-bottom: -5px;
	overflow: hidden;
}

.footer-next-course {
	display: flex;
	flex-direction: row;
	font-family: PT Sans Narrow, sans-serif;
	font-size: 16px;
	color: #494949;
	text-align: left;
}

.align-center {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.footer-alert {
	display: flex;
	align-items: center;
}

.alert-label {
	flex: 1;
	overflow: hidden;
	font-family: PT Sans Narrow, sans-serif;
	font-weight: bold;
	color: #d00;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.ring-container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 25px;
	height: 25px;
}

.circle {
	position: absolute;
	width: 9px;
	height: 9px;
	background-color: #d00;
	border-radius: 50%;
}

.ringring {
	align-self: center;
	width: 15px;
	height: 15px;
	border: 1px solid #d00;
	-webkit-border-radius: 30px;
	opacity: 0;
	-webkit-animation: pulsate 2s ease-out;
	-webkit-animation-iteration-count: infinite;
}

@-webkit-keyframes pulsate {
	0% {
		opacity: 0;
		-webkit-transform: scale(0.1, 0.1);
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0;
		-webkit-transform: scale(1.2, 1.2);
	}
}
</style>
