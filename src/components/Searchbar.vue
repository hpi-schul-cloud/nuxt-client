<template>
	<div :class="{ 'live-search': true, active: isActive }">
		<div class="search-container">
			<base-icon class="search-icon" source="custom" icon="search" />
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
				<button
					v-if="isActive && value !== ''"
					type="button"
					class="clear-btn"
					@click="updateSearchString('')"
				>
					<base-icon class="clear-icon" source="custom" icon="clear" />
				</button>
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
	max-width: 500px;
	margin: 0 auto 2rem;

	.search-container {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 16px;
		color: var(--color-text);
		background: var(--gray-1);
		border-radius: 50rem;

		.search-icon,
		input {
			padding: 16px 4px;
			font-size: 1.3rem;
		}

		input {
			flex: 1;
			padding: 12px;
			background: transparent;
			border: 0;
			outline: none;
		}

		.search-icon {
			transition: transform var(--duration-transition-medium) ease-in-out;
		}

		.clear-btn {
			display: flex;
			align-items: center;
			padding: 0;
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

			.clear-icon {
				padding: 16px;
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
