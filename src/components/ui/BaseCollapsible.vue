<template>
	<div>
		<button
			:aria-expanded="!collapsed"
			class="collapsible"
			@click="collapsed = !collapsed"
		>
			{{ label }}
		</button>
		<transition name="fade">
			<div v-if="!collapsed" class="content" :aria-hidden="collapsed">
				<slot />
			</div>
		</transition>
	</div>
</template>
<script>
export default {
	props: {
		label: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			collapsed: true,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.collapsible {
	width: 100%;
	padding: var(--space-sm) var(--space-md);
	text-align: left;
	cursor: pointer;
	background-color: var(--color-gray-light);
	border: none;
	outline: none;
}
.active,
.collapsible:hover {
	background-color: var(--color-gray-light);
}

.content {
	display: block;
	padding: 0 var(--space-md);
	overflow: hidden;
	background-color: color-mod(var(--color-gray-light) tint(50%));
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity var(--duration-transition-medium);
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
