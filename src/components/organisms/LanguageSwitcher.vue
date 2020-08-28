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
			<div class="button" :class="{ 'border-top': border }" @click="border = true">
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
			border: false,
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
		box-shadow: 1px 2px 5px 0 rgba(0,0,0,0.75);
	}
}
</style>
