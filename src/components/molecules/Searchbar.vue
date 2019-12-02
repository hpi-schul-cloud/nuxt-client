<template>
	<div :class="{ 'live-search': true, active: isActive }">
		<div class="search-container">
			<base-spinner v-if="loading" />
			<base-icon v-else class="search-icon" source="custom" icon="search" />
			<input
				ref="searchStringInput"
				:value="value"
				:aria-label="ariaLabel"
				type="text"
				class="search"
				name="search"
				v-bind="$attrs"
				@input="updateSearchString($event.target.value)"
				@focus="isActive = true"
				@blur="isActive = false"
			/>
			<transition name="fade">
				<!-- shouldn't this be baseButton -->
				<base-button
					v-if="isActive && value !== ''"
					design="icon"
					type="button"
					class="clear-btn"
					@click="updateSearchString('')"
				>
					<base-icon source="custom" icon="clear" />
				</base-button>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: "",
		},
		ariaLabel: {
			type: String,
			default: "Search",
		},
		loading: {
			type: Boolean,
		},
	},
	data() {
		return {
			isActive: false,
		};
	},
	methods: {
		updateSearchString(newValue) {
			this.$emit("input", newValue);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.live-search {
	position: relative;
	width: 100%;
	max-width: var(--size-content-width-max);
	margin: 0 auto;

	.search-container {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 var(--space-md);
		color: var(--color-black);
		background: var(--color-gray-light);
		border-radius: var(--radius-round);

		input {
			flex: 1;
			padding: var(--space-md) var(--space-xs);
			padding: var(--space-xs);
			font-size: var(--text-md);
			background: transparent;
			border: 0;
			outline: none;
		}

		.search-icon {
			font-size: var(--text-md);
			transition: transform var(--duration-transition-medium) ease-in-out;
		}

		.clear-btn {
			display: flex;
			align-items: center;
			padding: var(--space-xs);
			line-height: 100%;
			cursor: pointer;
			background: transparent;
			border: none;

			&.fade-enter-active,
			&.fade-leave-active {
				transition: opacity var(--duration-transition-medium);
			}
			&.fade-enter,
			&.fade-leave-to {
				opacity: 0;
			}
		}
	}

	&.active {
		.search-icon {
			transform: rotate(90deg);
		}
	}
}
</style>
