<template>
	<div
		v-if="options.length > 0"
		v-on-clickout="() => (visible = false)"
		class="menu"
	>
		<div class="toggle" @click="visible = true">{{ labelAdd }}</div>
		<transition name="scale">
			<ol v-if="visible" class="dialog">
				<li v-for="option in options" :key="option.id">
					<button class="option" @click="handleClick(option.id)">
						{{ option.title }}
					</button>
				</li>
			</ol>
		</transition>
	</div>
</template>

<script>
import { directive as onClickout } from "vue-clickout";

export default {
	directives: {
		onClickout: onClickout,
	},
	props: {
		labelAdd: {
			type: String,
			default: "Add +",
		},
		options: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			visible: false,
		};
	},
	methods: {
		handleClick(id) {
			this.visible = false;
			this.$emit("openFilter", id);
		},
	},
};
</script>

<style lang="scss" scoped>
.toggle {
	padding: var(--space-xs-3) var(--space-sm);
	font-size: var(--font-weight-light);
	line-height: var(--line-height-md);
	white-space: nowrap;
	border: 1px solid grey;
	border-radius: var(--radius-lg);

	&:hover,
	&:focus {
		background-color: var(color-gray);
	}
}
.menu {
	position: relative;
}
.dialog {
	position: absolute;
	top: calc(var(--space-xs) + 100%);
	left: var(--space-xs);
	z-index: var(--layer-dropdown);
	min-width: 20ch;
	padding: var(--space-xs) 0;
	margin: 0;
	list-style: none;
	background: #fff;
	border: 1px solid #ccc;
	box-shadow: 2px 2px 6px 0 #aaa;
	.option {
		width: 100%;
		padding: var(--space-xs) 1rem;
		font-size: var(--font-weight-light);
		text-align: left;
		background: transparent;
		border: none;
		&:hover,
		&:focus {
			background-color: var(color-gray);
		}
	}
}

.scale-enter-active,
.scale-leave-active {
	transition: all 0.2s;
	transform-origin: top left;
}
.scale-enter,
.scale-leave-to {
	opacity: 0;
	transform: scale(0.8, 0.5);
}
</style>
