<template>
	<div class="card">
		<div class="text">
			<div class="icon">
				<slot name="icon"></slot>
			</div>
			<div class="user-content">
				<div>
					<slot name="card-heading">
						<p class="heading">{{ heading }}</p>
					</slot>
					<responsive-icon-button
						v-if="!readonly"
						design="text"
						source="material"
						icon="create"
						@click="goTo({ targetPath })"
					>
						ändern
					</responsive-icon-button>
				</div>
				<slot v-if="data" name="data">
					<p>
						{{ data }}
						<slot name="new-mail" />
					</p>
				</slot>
				<p v-else>••••••••••</p>
			</div>
		</div>
		<slot name="notification" />
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
		targetPath: {
			type: String,
			default: "",
		},
		readonly: {
			type: Boolean,
		},
	},
	methods: {
		goTo(targetPath) {
			this.$router.push({
				path: targetPath.targetPath,
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
	margin: var(--space-md) 0;

	.text {
		display: flex;
	}

	.user-content {
		display: flex;
		flex-direction: column;
		width: 100%;

		.heading {
			float: left;
			padding-top: var(--space-xs);
			margin: 0;
			font-weight: var(--font-weight-bold);
		}

		.button {
			float: right;
		}
	}

	hr {
		margin: 0;
	}

	.notification {
		background-color: var(--color-info);
		border-radius: var(--radius-round);
	}
}
</style>
