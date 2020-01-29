<template>
	<div class="card">
		<div class="card-body">
			<img :src="image" class="image" role="presentation" />
			<div class="card-heading">
				<div class="h6">
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

.h6 {
	margin: 0;
}

.subtitle {
	display: flex;
	align-items: center;
	font-size: var(--text-xs);
	.icon {
		margin-left: var(--space-xs-3);
	}
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
