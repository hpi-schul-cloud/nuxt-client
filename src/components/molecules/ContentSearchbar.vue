<template>
	<div class="search">
		<div :class="[isActive ? 'input-active' : '', 'search__container']">
			<input
				ref="searchInput"
				v-autowidth="{
					maxWidth: '960px',
					minWidth: '300px',
					comfortZone: extraInputSpace,
				}"
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
				<base-button v-if="isActive" design="none" @click="enterKeyHandler">
					<base-icon
						class="search-icon"
						source="custom"
						aria-label="search"
						icon="search"
					/>
				</base-button>
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
			extraInputSpace: 40,
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
		updateSearchString(newValue) {
			this.inputValue = newValue;
			this.$emit("input", this.inputValue);
			setTimeout((...args) => {
				this.search(...args);
			}, 1000);
		},
		enterKeyHandler(...args) {
			this.search(...args);
			this.$refs.searchInput.blur();
		},
		search(...args) {
			if (this.isActive && this.inputValue.length > 0) {
				this.isActive = false;
			}
			this.$emit("keyup:enter", ...args);
		},
		clearBtnHandler() {
			this.$emit("input", "");
			this.inputValue = "";
			this.isActive = true;
			this.$refs.searchInput.focus();
		},
		escKeyHandler(e) {
			if (e.keyCode === 27) {
				this.$refs.searchInput.focus();
				this.inputValue = "";
				this.isActive = true;
				this.$emit("input", this.inputValue);
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
		padding-right: var(--space-sm);
		color: var(--color-gray);

		@include breakpoint(tablet) {
			padding-right: 0;
		}

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
