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
					style="font-size: var(--text-sm);"
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
	background-color: var(--color-tertiary);
	border: 1px solid var(--color-tertiary);
	border-radius: var(--radius-round);
	transition: $transition;

	&:last-of-type {
		margin-right: 0;
	}
	&.is-deletable {
		padding-right: var(--space-xs-2);
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
		padding: var(--space-xs-4);
		margin: 0;
		margin-left: var(--space-sm);
		cursor: pointer;
		background-color: var(--color-gray-light);
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
		font-family: var(--font-primary);
		font-size: var(--text-sm);
		color: var(--color-white);
	}
}
</style>
