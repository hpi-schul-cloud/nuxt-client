<template>
	<section class="card">
		<div v-if="badge" class="dot">
			<slot name="dot">{{ badge }}</slot>
		</div>
		<header class="header">
			<div class="tab" :style="backgroundColor">
				<span>
					<slot name="header-in" />
				</span>
			</div>
			<div>
				<slot name="header-out" />
			</div>
		</header>
		<div class="content" :style="backgroundColor">
			<slot />
		</div>
		<footer>
			<slot name="footer" />
		</footer>
	</section>
</template>

<script>
export default {
	props: {
		color: {
			type: [String, Array],
			default() {
				return ["#01B1AA", "#03B2D6"];
			},
		},
		badge: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		backgroundColor() {
			if (this.color[1]) {
				return (
					"background-image: linear-gradient(-225deg, " +
					this.color.join() +
					" );"
				);
			} else {
				return "background-color: " + this.color[0] + ";";
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.card {
	position: relative;
	width: 240px;
	padding: 10px;
	margin: 15px;
	cursor: pointer;
	border-radius: 4px;
	box-shadow: $shadow-1;

	&:hover {
		box-shadow: $shadow-5;
		transition: box-shadow $duration-animation-medium;
	}
}

.dot {
	position: absolute;
	top: -12px;
	right: -12px;
	z-index: 10;
	display: inline-block;
	width: 25px;
	height: 25px;
	font-weight: bold;
	line-height: 25px;
	color: white;
	text-align: center;
	background: #b1063a;
	border-radius: 50%;
}

.header {
	position: relative;
	z-index: -1;
	height: 34px;
	overflow: hidden;
}

.tab {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	width: 125px;
	overflow: hidden;
	border-top-right-radius: 5px;
	transform: skewX(25deg);
	transform-origin: bottom;

	&::before {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		content: "";
		background: black;
		opacity: 0.5;
	}

	span {
		display: block;
		padding: 5.5px 10px;
		overflow: hidden;
		color: white;
		text-overflow: ellipsis;
		white-space: nowrap;
		transform: skewX(-25deg);
		transform-origin: bottom;
	}
}

.content {
	height: 100px;
	padding: 10px;
	margin-top: -5px;
	color: white;
	border-radius: 0 5px 5px 0;
}
</style>
