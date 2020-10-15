<template>
	<div class="search">
		<div :class="[isActive ? 'input-active' : '', 'search__container']">
			<input
				ref="searchInput"
				:value="value"
				:aria-label="ariaLabel"
				label="search-input"
				type="text"
				name="search"
				v-bind="$attrs"
				@keyup.enter="enterKeyHandler"
				@input="updateSearchString($event.target.value)"
				@focus="isActive = true"
			/>
			<div class="search__container--icon">
				<base-icon
					v-if="value === ''"
					class="search-icon"
					source="custom"
					aria-label="search"
					icon="search"
				/>
				<base-button v-else design="none" @click="clearBtnHandler">
					<base-icon
						class="search-icon"
						source="custom"
						aria-label="clear"
						icon="clear"
					/>
				</base-button>
			</div>
		</div>
	</div>
</template>

<script>
let typingTimer;

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
			isActive: true,
			inputValue: "",
		};
	},
	mounted() {
		window.addEventListener("keydown", this.escKeyHandler);
		this.$refs.searchInput.focus();
	},
	beforeDestroy() {
		window.removeEventListener("keydown", this.escKeyHandler);
	},
	methods: {
		search() {
			if (this.isActive && this.inputValue.length > 0) {
				this.isActive = false;
			}
			this.$emit("keyup:enter");
		},
		updateSearchString(newValue) {
			this.inputValue = newValue;
			this.$emit("input", this.inputValue);
			clearTimeout(typingTimer);
			typingTimer = setTimeout(() => {
				this.search();
			}, 200);
		},
		enterKeyHandler() {
			this.search();
			this.$refs.searchInput.blur();
		},
		clearInput() {
			this.inputValue = "";
			this.isActive = true;
			this.$refs.searchInput.focus();
			this.$emit("input", this.inputValue);
		},
		clearBtnHandler() {
			this.clearInput();
		},
		escKeyHandler(e) {
			if (e.keyCode === 27) {
				this.clearInput();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.search {
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 100%;

	&__container {
		display: flex;
		align-items: center;
		color: var(--color-gray);

		input {
			flex: 1;
			padding: var(--space-sm) 0;
			font-size: var(--text-lg);
			text-align: center;
			border: 0;
			border-bottom: 2px transparent solid;
			outline: none;

			@include breakpoint(tablet) {
				font-size: var(--heading-6);
			}

			@include breakpoint(desktop) {
				font-size: var(--heading-4);
			}

			&:focus {
				border-bottom: 2px var(--color-gray-light) solid;
			}
			&::placeholder {
				color: var(--color-gray);
			}
			&:hover {
				border-bottom: 2px var(--color-black) solid;
			}
		}

		&--icon {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			font-size: var(--heading-4);
			color: var(--color-black);
			cursor: pointer;

			.icon {
				cursor: pointer;
			}

			@include breakpoint(tablet) {
				font-size: var(--heading-2);
			}
		}
	}
}
</style>
