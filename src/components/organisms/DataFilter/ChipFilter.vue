<template>
	<div class="chips">
		<button
			v-for="chip in chips"
			:key="chip.id"
			tab-index="0"
			:class="{
				chip: true,
				'is-deletable': chip.deletable,
			}"
			@click="$emit('open', chip.id)"
		>
			<span class="label">
				{{ chip.label }}
			</span>
			<button
				v-if="chip.deletable"
				type="button"
				class="btn-delete"
				@click.stop.prevent="$emit('remove', chip.id)"
			>
				<base-icon
					icon="close"
					source="material"
					style="font-size: var(--text-sm);"
					:fill="color"
				/>
			</button>
		</button>
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
	data() {
		return {
			color: `var(--color-tertiary)`,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

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
	&:hover {
		color: var(--color-white);
		background: var(--color-tertiary-dark);
		border: 1px solid var(--color-tertiary-dark);
	}
	.btn-delete {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 25px;
		height: 25px;
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
			background: var(--color-gray-light);
			border-radius: var(--radius-round);
		}
	}

	.label {
		font-family: var(--font-primary);
		font-size: var(--text-sm);
		color: var(--color-white);
	}
}
</style>
