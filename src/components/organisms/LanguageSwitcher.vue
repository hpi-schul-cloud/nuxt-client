<template>
	<div>
		<p class="current-language">{{$t ("pages.account.language.user.currentLanguage") }}</p>
		<div
			class="dropdown"
			tabindex="0"
			:aria-expanded="open"
			aria-controls="dropdown-content"
			@click="handleClick"
			@blur="open = false"
		>
			<div class="button">
				<div class="langPlaceholder">
					<base-icon source="custom" :icon="'flag_' + value" />
					{{ value }}
				</div>
				<base-icon source="custom" icon='sort-down' />
			</div>
			<div id="`dropdown-content`" class="content" :class="{ open }">
				<p
					v-for="lang in languages"
					:key="lang"
					:value="lang"
					:label="lang"
					@click="changeLanguage(lang)"
				>
					<base-icon source="custom" :icon="'flag_' + lang" />
					{{ lang }}
				</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		defaultLanguage: {
			type: String,
			default: "Deutsch",
		},
	},
	data() {
		return {
			languages: ["Deutsch", "English"],
			open: false,
			value: this.defaultLanguage,
		};
	},
	methods: {
		handleClick() {
			this.open = !this.open;
		},
		changeLanguage: function (lang) {
			const language = lang.toLowerCase().substring(0, 2);
			this.value = lang;
			this.$store.commit("auth/setLocale", language);
			this.$i18n.locale = language;
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

.button {
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: var(--space-sm) var(--space-md);
	color: var(--color-black);
	cursor: pointer;
	border-bottom: 1px solid var(--color-black);
}

.container {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.dropdown {
	position: relative;
	display: inline-block;
	width: 100%;

	&:focus {
		outline: 0;
	}
}

// Hidden by default
.content {
	position: absolute;
	z-index: var(--layer-dropdown);
	display: none;
	flex-direction: column;
	width: 100%;
	padding: var(--space-sm) var(--space-md);
	background-color: var(--color-gray-light);

	&.open {
		display: flex;
	}
	.link {
		display: inline-block;
		color: var(--color-black);
		word-break: break-word;
		white-space: normal;
		border-bottom: 0;

		&:not(:last-child) {
			border-bottom: 1px solid var(--color-gray);
		}

		&:hover {
			background-color: var(--color-gray-light);
		}
	}
}
</style>
