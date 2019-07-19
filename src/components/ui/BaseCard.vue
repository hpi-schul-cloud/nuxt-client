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
		<footer class="footer">
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
@import "@styles";

.card {
	position: relative;
	z-index: var(--layer-behind);
	width: 240px;
	padding: var(--space-sm) var(--space-md);
	margin: var(--space-sm);
	cursor: pointer;
	background: #fff;
	border: 1px solid var(--color-gray);
	border-radius: var(--radius-md);
	box-shadow: var(--shadow-sm);
	transition: box-shadow calc(var(--duration-transition-medium) * 0.5) ease-in;
	&:hover {
		box-shadow: var(--shadow-sm);
	}
}

.dot {
	position: absolute;
	top: -12px;
	right: -12px;
	z-index: var(--layer-dropdown);
	display: inline-block;
	width: 24px;
	height: 24px;
	font-weight: var(--font-weight-bold);
	line-height: calc(var(--line-height-lg) + 0.2);
	color: var(--color-white);
	text-align: center;
	background: #b1063a;
	border-radius: var(--radius-round);
}

.header {
	position: relative;
	z-index: var(--layer-behind);
	height: 34px;
	overflow: hidden;
	border-top-left-radius: var(--radius-sm);
}

.tab {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: var(--layer-behind);
	width: 125px;
	overflow: hidden;
	border-top-right-radius: var(--radius-sm);
	transform: skewX(25deg);
	transform-origin: bottom;
	&::before {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		content: "";
		background: black;
		opacity: 0.5;
	}

	span {
		display: block;
		padding: var(--space-xxxs) var(--space-xxs);
		overflow: hidden;
		color: var(--color-white);
		text-overflow: ellipsis;
		white-space: nowrap;
		transform: skewX(-25deg);
		transform-origin: bottom;
	}
}

.content {
	z-index: var(--layer-page);
	height: 100px;
	margin-top: calc(var(--space-xxxs) * -1);
	color: var(--color-white);
	border-radius: var(--radius-sm) var(--radius-sm);
}
</style>
