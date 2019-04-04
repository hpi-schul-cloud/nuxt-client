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
	name: "BaseCollapsible",
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
@import "@variables";
.collapsible {
	width: 100%;
	padding: 18px;
	font-size: 15px;
	color: #444;
	text-align: left;
	cursor: pointer;
	background-color: #eee;
	border: none;
	outline: none;
}
.active,
.collapsible:hover {
	background-color: #ccc;
}

.content {
	display: block;
	padding: 0 18px;
	overflow: hidden;
	background-color: #f1f1f1;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity $duration-animation-base;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
