<template>
	<v-list role="menuitem" density="compact">
		<v-list-item
			role="menu"
			:data-testid="`selected-language-${selectedItem.language}`"
			:aria-label="`${$t('global.topbar.language.select')} ${$t(
				'global.topbar.language.selectedLanguage'
			)} ${selectedItem.translatedName}`"
			@click.stop.prevent="toggleMenu"
		>
			<template v-slot:prepend>
				<v-icon :icon="selectedItem.icon" />
			</template>
			<v-list-item-title>{{ selectedItem.longName }}</v-list-item-title>
			<template v-slot:append>
				<v-icon :icon="mdiMenuDown" />
			</template>
		</v-list-item>
		<template v-if="menuVisible">
			<v-list-item
				v-for="item in availableItems"
				:key="item.language"
				role="menuitem"
				:data-testid="`available-language-${item.language}`"
				:aria-label="item.translatedName"
				@click="changeLanguage(item)"
				:prepend-icon="item.icon"
			>
				<template v-slot:prepend>
					<v-icon :icon="item.icon" />
				</template>
				<v-list-item-title>{{ item.longName }}</v-list-item-title>
			</v-list-item>
		</template>
	</v-list>
</template>

<script>
import { AUTH_MODULE_KEY, ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { mdiMenuDown, mdiMenuUp } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			mdiMenuDown,
			mdiMenuUp,
			menuVisible: false,
		};
	},
	inject: {
		authModule: { from: AUTH_MODULE_KEY },
		envConfigModule: { from: ENV_CONFIG_MODULE_KEY },
	},
	computed: {
		availableItems: {
			get() {
				const languages = this.envConfigModule.getAvailableLanguages
					.map((language) => this.buildLanguageItem(language))
					.filter((language) => {
						return language.language !== this.selectedItem.language;
					});
				return languages;
			},
			set() {
				return;
			},
		},
		selectedItem: {
			get() {
				const language = this.buildLanguageItem(
					this.authModule.getLocale || this.envConfigModule.getFallbackLanguage
				);
				return language;
			},
			set() {
				return;
			},
		},
	},
	methods: {
		toggleMenu() {
			this.menuVisible = !this.menuVisible;
		},
		async changeLanguage(item) {
			await this.authModule.updateUserLanguage(item.language);
			window.location.reload();
		},
		buildLanguageItem(language) {
			const longName = this.$t(`global.topbar.language.longName.${language}`);
			const translatedName = this.$t(`common.words.languages.${language}`);
			const icon =
				"$langIcon" + language.charAt(0).toUpperCase() + language.slice(1);
			return { language, longName, translatedName, icon };
		},
	},
});
</script>

<style lang="scss" scoped>
.v-list-item__icon {
	margin-right: var(--space-xs) !important;
	margin-left: var(--space-xs);
}

.v-list-item__prepend > .v-icon {
	opacity: 1;
	margin-left: var(--space-xs);
}

.v-list-item:focus {
	outline: none;
}
</style>
