<template>
	<nav>
		<ul class="breadcrumb">
			<li v-for="input in inputs" :key="input.text" class="link">
				<component :is="getComponent(input)" v-bind="removeText(input)">
					{{ input.text }}
				</component>
			</li>
		</ul>
	</nav>
</template>
<script>
import BaseLink from "@basecomponents/BaseLink.vue";

export default {
	name: "BaseBreadcrumb",
	props: {
		inputs: {
			type: Array,
			required: true,
		},
	},
	methods: {
		removeText({ text, ...input }) {
			return input;
		},
		getComponent(input) {
			return input.to || input.href ? BaseLink : "span";
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
.breadcrumb {
	padding: 10px 16px;
	list-style: none;

	.link {
		display: inline;
		font-size: 18px;
	}

	/* Add a slash symbol (/) before/behind each list item */
	.link + .link::before {
		padding: 8px;
		content: "/\00a0";
	}
}
</style>
