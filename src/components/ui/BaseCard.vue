<template>
	<section class="card">
		<div v-if="badge" class="caption dot">
			<slot name="dot">{{ badge }}</slot>
		</div>
		<header class="header">
			<div class="tab" :style="background_style">
				<div class="caption tab-label truncate"> <slot name="header-in"/></div>
			</div>
			<div>
				<slot name="header-out" />
			</div>
		</header>
		<div v-if="isContentFilled" class="content" :style="background_style">
			<slot name="content" />
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
		background_style() {
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
		isContentFilled() {
			return !!this.$slots.content;
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
	padding: var(--space-xs) var(--space-xs);
	margin: var(--space-sm);
	cursor: pointer;
	background: #fff;
	border: 1px solid var(--color-gray);
	border-radius: var(--radius-sm);
	box-shadow: var(--shadow-sm);
	transition: box-shadow calc(var(--duration-transition-medium) * 0.5) ease-in;
	&:hover {
		box-shadow: var(--shadow-sm);
	}
}

.dot {
	--min-size: calc(var(--text-sm) + (2 * var(--space-xxs)));

	position: absolute;
	bottom: 100%;
	left: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: var(--min-size);
	min-height: var(--min-size);
	padding: 0 var(--space-xxs);
	font-size: var(--text-sm);
	font-weight: var(--font-weight-bold);
	color: var(--color-white);
	background: var(--color-primary);
	border-radius: var(--radius-round);
	transform: translate(-50%, 50%);
}

.header {
	position: relative;
	z-index: var(--layer-behind);
	height: 26px;
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

	.tab-label {
		display: inline-block;
		width: 100%;
		padding: var(--space-xxxs) var(--space-sm) var(--space-xxs);
		font-size: var(--text-xs);
		font-weight: var(--font-weight-bold);
		color: var(--color-white);
		transform: skewX(-25deg);
		transform-origin: bottom left;
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
