<template>
	<div>
		<button class="collapsible" @click="collapsed = !collapsed">{{
			label
		}}</button>
		<div v-if="!collapsed">
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
	animation: fadeEffect 1s;
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
