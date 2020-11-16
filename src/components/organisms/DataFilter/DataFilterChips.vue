<template>
	<div class="chips">
		<div
			v-for="chip in chips"
			:key="chip.id"
			role="button"
			tabindex="0"
			:class="{
				chip: true,
				'is-deletable': chip.deletable,
			}"
			@click="$emit('open', chip.id)"
			@keyup.self.enter.space="$emit('open', chip.id)"
		>
			<span class="label">
				{{ chip.label }}
			</span>
			<base-button
				v-if="chip.deletable"
				design="none"
				type="button"
				class="btn-delete"
				@click.stop="$emit('remove', chip.id)"
			>
				<base-icon
					icon="close"
					source="material"
					style="font-size: var(--text-sm)"
				/>
			</base-button>
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
@import "@styles";

$transition: background var(--duration-transition-medium)
	cubic-bezier(0.23, 1, 0.32, 1);
$mobile: 750px; // css variables do not work with media queries

.chips {
	display: flex;
	flex-wrap: nowrap;
}

.chip {
	display: inline-flex;
	flex-wrap: nowrap;
	align-items: center;
	padding: var(--space-xs-3) var(--space-sm);
	margin-right: var(--space-sm);
	line-height: var(--line-height);
	color: var(--color-white);
	white-space: nowrap;
	cursor: pointer;
	background-color: var(--color-white);
	border: 1px solid var(--color-tertiary);
	border-radius: var(--radius-round);
	transition: $transition;

	&:last-of-type {
		margin-right: 0;
	}
	&.is-deletable {
		padding-right: var(--space-xs-2);
	}
	&:hover {
		box-shadow: 0 0 0 1px var(--color-tertiary);
	}
	&:focus {
		outline: none;
		box-shadow: 0 0 0 3px var(--color-white),
			0 0 0 6px var(--color-tertiary-dark);
	}
	.btn-delete {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5em;
		height: 1.5em;
		padding: var(--space-xs-3);
		margin: 0;
		margin-right: calc(-1 * var(--space-xs-4));
		margin-left: var(--space-xs);
		color: var(--color-white);
		cursor: pointer;
		background-color: var(--color-tertiary);
		border: none;
		border-radius: var(--radius-round);
		transition: $transition;

		&:hover,
		&:focus {
			color: var(--color-white);
			background: var(--color-tertiary-dark);
		}
		&:focus {
			outline: none;
			box-shadow: 0 0 0 3px var(--color-white),
				0 0 0 6px var(--color-tertiary-dark);
		}
	}

	.label {
		font-family: var(--font-accent);
		font-size: var(--text-md);
		font-weight: var(--font-weight-bold);
		color: var(--color-tertiary);
	}
}

@media (max-width: $mobile) {
	.chips {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
	}
	.chip {
		justify-content: space-between;
		margin-right: 0;
		margin-bottom: var(--space-sm);
		span.label {
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
</style>
