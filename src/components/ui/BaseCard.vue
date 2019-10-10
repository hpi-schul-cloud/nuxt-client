<template>
	<section class="card" :class="{ 'landscape-mode': isLandscape }">
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
		<div :class="{ containers: isLandscape }">
			<div
				v-if="isContentFilled"
				class="top-container"
				:style="background_style"
				><div class="top-content">
					<slot name="topContent" />
				</div>
			</div>
			<div class="bottom-container">
				<slot name="bottomContainer" />
			</div>
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
		isLandscape: {
			type: Boolean,
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
			return !!this.$slots.topContent;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.card {
	position: relative;
	z-index: var(--layer-behind);
	display: inline-block;
	width: 100%;
	padding: var(--space-xs) var(--space-xs);
	cursor: pointer;
	background: var(--color-white);
	border: 1px solid var(--color-gray);
	border-radius: var(--radius-sm);
	box-shadow: var(--shadow-sm);
	transition: box-shadow calc(var(--duration-transition-medium) * 0.5) ease-in;
	&:hover {
		box-shadow: var(--shadow-md);
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
	height: 1.5rem;
	overflow: hidden;
	border-top-left-radius: var(--radius-sm);
}
.tab {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: var(--layer-behind);
	display: flex;
	align-items: center;
	width: 50%;
	padding-left: var(--space-md);
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
		background: var(--color-black);
		opacity: 0.5;
	}
	.tab-label {
		display: inline-block;
		width: 100%;
		font-size: var(--text-sm);
		color: var(--color-white);
		transform: skewX(-25deg);
		transform-origin: bottom left;
	}
}
.top-container {
	$aspect-ratio: 9 / 16;

	position: relative;
	z-index: var(--layer-page);
	margin-top: calc(var(--space-xxxs) * -1);
	color: var(--color-white);
	border-radius: 0 var(--radius-sm) var(--radius-sm) var(--radius-sm);
	&::before {
		display: block;
		width: 100%;
		padding-top: $aspect-ratio * 100%;
		content: "";
	}
	> .top-content {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
}
.bottom-container {
	margin-top: var(--space-sm);
	overflow: hidden;
}
.landscape-mode {
	width: 100%;
	.containers {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	.bottom-container {
		flex: 1;
		margin: 0 0 0 var(--space-sm);
	}
	.tab {
		width: 25%;
	}
	.top-container {
		flex: 0 1 33%;
	}
}
</style>
