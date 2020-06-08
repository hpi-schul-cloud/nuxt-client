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
						v-if="mode !== 'readonly'"
						design="text"
						source="material"
						icon="create"
						@click="editEmail({ targetPath })"
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
		mode: {
			type: String,
			enum: ["editable", "readonly"],
			default: "editable",
		},
	},
	methods: {
		editEmail(targetPath) {
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
	margin-bottom: var(--space-md);

	.text {
		display: flex;

		.icon {
			.icon {
				margin-top: var(--space-xs);
				margin-right: var(--space-xs);
			}
		}
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

	.notification {
		background-color: var(--color-info);
		border-radius: var(--radius-round);
	}
}
</style>
