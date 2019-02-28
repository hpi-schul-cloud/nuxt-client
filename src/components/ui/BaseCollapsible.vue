<template>
	<div>
		<button class="collapsible" @click="collapsed = !collapsed">{{
			label
		}}</button>
		<div :class="{ 'is-collapsed': collapsed }">
			<div class="content">
				<slot />
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "BaseCollapsible",
	props: {
		label: {
			type: String,
			default: "Details",
		},
	},
	data: function() {
		return {
			collapsed: true,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
.collapsible {
	background-color: #eee;
	color: #444;
	cursor: pointer;
	padding: 18px;
	width: 100%;
	border: none;
	text-align: left;
	outline: none;
	font-size: 15px;
}
.active,
.collapsible:hover {
	background-color: #ccc;
}

.content {
	padding: 0 18px;
	overflow: hidden;
	background-color: #f1f1f1;
	display: block;
	animation: fadeEffect 1s;
}
.is-collapsed {
	display: none;
}
@-webkit-keyframes fadeEffect {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes fadeEffect {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
