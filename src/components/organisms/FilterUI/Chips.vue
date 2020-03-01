<template>
	<div class="chips">
		<div
			v-for="chip in chips"
			:key="chip.id"
			tab-index="0"
			:class="{
				chip: true,
				'is-deletable': chip.deletable,
			}"
			@click="$emit('open', chip.id)"
		>
			<span>
				{{ chip.label }}
			</span>
			<button
				v-if="chip.deletable"
				type="button"
				class="btn-delete"
				@click.stop.prevent="$emit('remove', chip.id)"
			>
				<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
					></path>
					<path d="M0 0h24v24H0z" fill="none"></path>
				</svg>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		chips: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
$transition: all 0.15s ease-in-out;

.chips {
	display: flex;
	flex-wrap: nowrap;
}
.chip {
	display: inline-flex;
	flex-wrap: nowrap;
	align-items: center;
	padding: var(--space-xs-3) var(--space-sm);
	margin-right: var(--space-xs);
	font-size: var(--font-weight-light);
	line-height: var(--line-height-md);
	white-space: nowrap;
	cursor: pointer;
	border: 1px solid var(--color-gray-dark);
	border-radius: var(--radius-lg);
	transition: $transition;

	&:hover {
		svg {
			fill: rgba(0, 0, 0, 0.5);
		}
	}

	.btn-delete {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-xs-4);
		margin: 0;
		margin-left: var(--space-xs);
		background: transparent;
		border: none;
		border-radius: var(--radius-lg);
		transition: $transition;
		svg {
			width: var(--space-md);
			height: var(--space-md);
			fill: var(--color-gray);
			transition: $transition;
		}
		&:hover,
		&:focus {
			background: rgba(0, 0, 0, 0.5);
			svg {
				fill: var(--color-white);
			}
		}
	}

	&:last-of-type {
		margin-right: 0;
	}

	&.is-deletable {
		padding-right: var(--space-xs);
	}
	&:focus,
	&:hover {
		color: var(--color-white);
		background: rgba(0, 0, 0, 0.5);
		.btn-delete {
			background: var(--color-gray-light);
		}
	}
}
</style>
