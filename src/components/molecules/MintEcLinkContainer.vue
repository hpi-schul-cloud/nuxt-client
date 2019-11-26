<template>
	<base-link :href="href">
		<div class="container">
			<p
				>{{ heading }}
				<base-icon
					source="fa"
					icon="fas fa-chevron-right"
					:style="{
						'font-size': `var(--space-md)`,
						color: `var(--color-white)`,
					}"
				>
				</base-icon>
			</p>
		</div>
	</base-link>
</template>

<script>
export default {
	props: {
		heading: {
			type: String,
			default: "",
		},
		href: {
			type: String,
			default: undefined,
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 270px;
	height: 100px;
	padding: var(--space-md);
	background-color: var(--color-secondary);
	border-radius: var(--radius-md);
}
p {
	margin-bottom: 0;
	color: var(--color-white);
}
</style>
