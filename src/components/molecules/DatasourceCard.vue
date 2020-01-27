<template>
	<div class="card">
		<div class="card-body">
			<img :src="image" class="image" role="presentation" />
			<div class="card-heading">
				<div class="card-title">
					<slot name="title">
						{{ title }}
					</slot>
				</div>
				<div class="subtitle">
					<slot name="subtitle">
						{{ subtitle }}
					</slot>
				</div>
			</div>
		</div>
		<div class="card-action">
			<slot name="actions" />
		</div>
	</div>
</template>
<script>
export default {
	props: {
		image: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			default: "",
		},
		subtitle: {
			type: String,
			default: "",
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.card {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: auto;
	padding: var(--space-xs);
	border-radius: var(--radius-sm);
	box-shadow: var(--shadow-s);
}

.card-body {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

.card-title {
	font-family: var(--font-accent);
	font-size: var(--text-lg);
}

.subtitle {
	font-size: var(--text-sm);
}
.image {
	height: calc(var(--text-md) + var(--text-lg));
	object-fit: contain;
	margin-right: var(--space-sm);
	border-radius: var(--radius-sm);
}

p {
	margin: 0;
}
</style>
