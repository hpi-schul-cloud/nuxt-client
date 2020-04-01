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
				<base-icon
					icon="close"
					source="material"
					style="font-size: var(--text-sm);"
					:fill="color"
				/>
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
	font-size: var(--text-sm);
	line-height: var(--line-height);
	white-space: nowrap;
	cursor: pointer;
	background-color: var(--color-gray-light);
	border: 1px var(--color-gray);
	border-radius: var(--radius-round);
	transition: $transition;
	&:last-of-type {
		margin-right: 0;
	}
	&.is-deletable {
		padding-right: var(--space-xs);
	}
	&:focus &:hover {
		color: var(--color-white);
		background: var(--color-gray);
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
}
</style>
