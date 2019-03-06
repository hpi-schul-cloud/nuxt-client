<template>
	<ul class="breadcrumb">
		<li v-for="input in inputs" :key="input.text" class="link">
			<BaseLink v-if="typeof input !== 'string'" v-bind="removeText(input)">{{
				input.text
			}}</BaseLink>
			<span v-else>{{ input }}</span>
		</li>
	</ul>
</template>
<script>
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
