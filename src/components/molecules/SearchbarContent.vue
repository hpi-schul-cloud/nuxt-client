<template>
	<div class="search">
		<div :class="[isActive ? 'input-active' : '', 'search__container']">
			<input
				ref="searchInput"
				:value="value"
				:aria-label="ariaLabel"
				type="text"
				name="search"
				v-bind="$attrs"
				@keyup.enter="handleEnterKey"
				@input="updateSearchString($event.target.value)"
				@focus="isActive = true"
			/>
			<div class="search__container--icon">
				<base-icon
					v-if="isActive"
					class="search-icon"
					source="custom"
					icon="search"
					@click="handleEnterKey"
				/>
				<base-icon
					v-else
					class="search-icon"
					source="custom"
					icon="clear"
					@click="handleClearBtn"
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
		};
	},
	methods: {
		updateSearchString(newValue) {
			this.$emit("input", newValue);
		},
		handleEnterKey() {
			if (this.isActive) this.isActive = false;
			this.$refs.searchInput.blur();
		},
		handleClearBtn() {
			this.$emit("input", "");
			this.isActive = true;
			this.$refs.searchInput.focus();
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
		width: auto;
		color: var(--color-gray);

		input {
			flex: 1;
			width: 80%;
			padding: var(--space-sm) 0;
			font-size: var(--heading-4);
			text-align: center;
			border: 0;
			border-bottom: 1px transparent solid;
			outline: none;

			&:focus {
				border-bottom: 1px var(--color-gray) solid;
			}
			&::placeholder {
				color: var(--color-gray-dark);
			}
		}

		&--icon {
			width: 20%;
			font-size: var(--heading-2);
		}
	}
	.input-active {
		width: 80%;
	}
}
</style>
