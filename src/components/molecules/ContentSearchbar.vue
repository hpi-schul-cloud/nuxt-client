<template>
	<div class="search">
		<div :class="[isActive ? 'input-active' : '', 'search__container']">
			<input
				ref="searchInput"
				v-autowidth="{ maxWidth: '960px', minWidth: '0px', comfortZone: 40 }"
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
					v-if="isActive"
					class="search-icon"
					source="custom"
					icon="search"
					@click="enterKeyHandler"
				/>
				<base-icon
					v-else
					class="search-icon"
					source="custom"
					icon="clear"
					@click="clearBtnHandler"
				/>
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
		};
	},
	mounted() {
		window.addEventListener("keydown", this.backspaceKeyHandler);
		this.$refs.searchInput.focus();
	},
	beforeDestroy() {
		window.removeEventListener("keydown", this.backspaceKeyHandler);
	},
	methods: {
		updateSearchString(newValue) {
			this.inputValue = newValue;
			this.$emit("input", this.inputValue);
		},
		enterKeyHandler() {
			if (this.isActive && this.inputValue.length > 0) {
				this.isActive = false;
				this.inputValue = "";
			}
			this.$emit("enter-key-event");
			this.$refs.searchInput.blur();
		},
		clearBtnHandler() {
			this.$emit("input", "");
			this.inputValue = "";
			this.isActive = true;
			this.$refs.searchInput.focus();
		},
		backspaceKeyHandler(e) {
			if (!this.isActive && (e.keyCode === 8 || e.keyCode === 27)) {
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
	width: 100%;

	&__container {
		display: flex;
		align-items: center;
		color: var(--color-gray);

		input {
			flex: 1;
			padding: var(--space-sm) 0;
			font-size: var(--heading-4);
			text-align: center;
			border: 0;
			border-bottom: 3px transparent solid;
			outline: none;

			&:focus {
				border-bottom: 3px var(--color-gray-light) solid;
			}
			&::placeholder {
				color: var(--color-gray);
			}
			&:hover {
				border-bottom: 3px var(--color-black) solid;
			}
		}

		&--icon {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			font-size: var(--heading-2);
			cursor: pointer;
		}
	}
}
</style>
