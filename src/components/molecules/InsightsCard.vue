<template>
	<base-card :class="data ? 'insights-card' : 'insights-card chart-card'">
		<template v-slot:header>
			<div class="insights-card__header">
				{{ title }}
			</div>
			<div class="insights-card__separator" />
		</template>
		<template v-slot:content>
			<div class="insights-card__content">
				<slot name="content">
					<template v-if="data && data.current">
						<div class="insights-card__content-total">
							{{ data.current }}
						</div>
						<div class="insights-card__content-diff">
							<div
								:class="data.current < data.last ? 'arrow-down' : 'arrow-up'"
							></div>
							{{ data.current - data.last }}
						</div>
					</template>
					<template v-else-if="data">
						<div class="insights-card__content-total">
							{{ Math.round(Number(data)) }}%
						</div>
					</template>
				</slot>
			</div>
		</template>
		<template v-slot:footer>
			<div class="insights-card__footer">
				<slot name="footer" />
			</div>
		</template>
	</base-card>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "",
		},
		data: {
			type: [Object, String, Number],
			default: () => {},
		},
	},
};
</script>

<style lang="scss" scoped>
.insights-card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 15rem;
	height: 7rem;
	margin: var(--space-sm);
	color: var(--color-gray-dark);
	&__header {
		font-size: var(--text-xs);
	}
	&__separator {
		width: 15%;
		height: 0.2rem;
		margin-top: var(--space-xs-2);
		border: 0.1rem solid var(--color-primary);
		border-radius: var(--radius-round);
	}
	&__content {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		&-total {
			font-size: var(--space-xl);
		}
		&-diff {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			font-size: var(--text-lg);
		}
	}
	&__footer {
		width: 100%;
		font-size: var(--text-sm);
		text-align: right;
	}
	.arrow-up {
		width: 20px;
		height: 20px;
		transform: rotate(-45deg) translateY(7px) translateX(-5px);

		&::before {
			display: block;
			width: 100%;
			height: 100%;
			content: "";
			border-color: var(--color-success);
			border-style: solid;
			border-width: 3px 3px 0 0;
		}
	}
	.arrow-down {
		width: 20px;
		height: 20px;
		transform: rotate(133deg) translateY(-24px) translateX(24px);

		&::before {
			display: block;
			width: 100%;
			height: 100%;
			content: "";
			border-color: var(--color-danger);
			border-style: solid;
			border-width: 3px 3px 0 0;
		}
	}
}
</style>
