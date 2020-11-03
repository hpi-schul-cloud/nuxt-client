<template>
	<div :class="{ 'live-search': true, active: isActive }">
		<div class="search-container">
			<base-spinner v-if="loading" />
			<base-input
				ref="searchStringInput"
				:value="value"
				:aria-label="ariaLabel"
				type="text"
				class="search"
				name="search"
				v-bind="$attrs"
				@input="updateSearchString($event)"
				@focus="isActive = true"
				@blur="isActive = false"
			>
				<template v-slot:icon>
					<base-icon source="material" icon="search" />
				</template>
			</base-input>
			<transition name="fade">
				<!-- shouldn't this be baseButton -->
				<base-button
					v-if="isActive && value !== ''"
					design="icon"
					type="button"
					class="clear-btn"
					@click="emit('')"
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
		delay: {
			type: Number,
			default: 400,
		},
	},
	data() {
		return {
			isActive: false,
			timeout: null,
		};
	},
	methods: {
		updateSearchString(newValue) {
			if (this.delay && this.delay === 0) this.emit(newValue);
			if (this.timeout) clearTimeout(this.timeout);
			this.timeout = setTimeout(() => this.emit(newValue), this.delay);
		},
		emit(newValue) {
			this.$emit("input", newValue);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.live-search {
	position: relative;
	max-width: var(--size-content-width-max);
	margin: 0 auto;

	.search-container {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 0 var(--space-md);

		input {
			flex: 10;
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
