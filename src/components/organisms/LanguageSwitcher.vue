<template>
	<div>
		<p class="current-language">
			{{ $t("pages.account.language.user.currentLanguage") }}
		</p>
		<div
			class="dropdown"
			tabindex="0"
			:aria-expanded="open"
			aria-controls="dropdown-content"
			@click="handleClick"
			@blur="open = false"
		>
			<div
				class="button"
				:class="{ 'border-top': border }"
				@click="border = true"
			>
				<div class="langPlaceholder">
					<base-icon
						source="custom"
						:icon="'flag_' + value"
						class="flag-icon"
					/>
					{{ value }}
				</div>
				<base-icon source="custom" icon="sort-down" />
			</div>
			<div id="`dropdown-content`" class="content" :class="{ open }">
				<p
					v-for="lang in languages"
					:key="lang.longName"
					:value="lang.longName"
					:label="lang.longName"
					@click="changeLanguage(lang)"
				>
					<base-icon
						source="custom"
						:icon="'flag_' + lang.longName"
						class="flag-icon"
					/>
					{{ lang.longName }}
				</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		language: {
			type: String,
			default: "de",
		},
	},
	data() {
		return {
			languages: [
				{ name: "de", longName: "Deutsch" },
				{ name: "en", longName: "English" },
			],
			open: false,
			border: false,
			value: this.$t(
				`pages.account.index.user.locale.longName.${this.language}`
			),
		};
	},
	methods: {
		handleClick() {
			this.open = !this.open;
		},
		changeLanguage: function (lang) {
			this.value = lang.longName;
			this.$store.commit("auth/setLocale", lang.name);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.current-language {
	margin-bottom: var(--sidebar-sub-item-height);
	font-weight: var(--font-weight-bold);
}

.dropdown {
	position: relative;
	display: inline-block;
	width: 100%;

	&:focus {
		outline: 0;
	}
}

.button {
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: var(--space-sm) var(--space-md);
	color: var(--color-black);
	cursor: pointer;
	border-bottom: 1px solid var(--color-black);

	&.border-top {
		border-bottom: 1px solid var(--color-primary) !important;
	}
}

.container {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.content {
	position: absolute;
	z-index: var(--layer-dropdown);
	display: none;
	flex-direction: column;
	width: 100%;
	cursor: pointer;
	background-color: var(--color-white);

	p {
		padding: 8px 0 8px var(--space-md);
		margin-bottom: 0;
		&:hover {
			background-color: var(--color-gray-light);
		}
	}

	&.open {
		display: flex;
		box-shadow: 1px 2px 5px 0 rgba(0, 0, 0, 0.75);
	}
}
.flag-icon {
	margin-top: calc(-4 * var(--border-width));
}
</style>
