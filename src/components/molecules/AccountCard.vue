<template>
	<div class="card">
		<div class="text">
			<div class="icon">
				<slot name="icon"></slot>
			</div>
			<div class="user-content">
				<div class="headline">
					<slot name="card-heading">
						<p class="heading">{{ heading }}</p>
					</slot>
					<responsive-icon-button
						design="text"
						source="material"
						icon="create"
						@click="editEmail"
					>
						ändern
					</responsive-icon-button>
				</div>
				<slot v-if="data" name="data">
					<p>{{ data }}</p>
				</slot>
				<p v-else>••••••••••</p>
				<slot name="notification" />
			</div>
		</div>
		<hr />
	</div>
</template>
<script>
import ResponsiveIconButton from "@components/molecules/ResponsiveIconButton";
export default {
	components: {
		ResponsiveIconButton,
	},
	props: {
		heading: {
			type: String,
			default: "",
		},
		data: {
			type: String,
			default: "",
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	methods: {
		editEmail() {
			this.$router.push({
				path: "/account/email/edit",
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.card {
	display: block;
	flex-direction: row;
	margin-bottom: var(--space-xl);

	.text {
		display: flex;
	}

	.icon {
		margin-right: var(--space-xs);
	}

	.user-content {
		display: flex;
		flex-direction: column;

		.heading {
			float: left;
			margin: 0;
			font-weight: var(--font-weight-bold);
		}
	}
}
</style>
