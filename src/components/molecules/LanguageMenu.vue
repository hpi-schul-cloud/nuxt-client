<template>
	<v-list>
		<v-list-item dense @click.stop="toggleMenu">
			<v-list-item-icon>
				<v-icon>{{ selectedLanguage.icon }}</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				{{ selectedLanguage.name }}
			</v-list-item-content>
			<v-list-item-action>
				<v-icon>{{ mdiMenuDown }}</v-icon>
			</v-list-item-action>
		</v-list-item>
		<template v-if="menuVisible">
			<v-list-item
				v-for="language in availableLanguages"
				:key="language.locale"
				dense
				@click="changeLanguage(language)"
			>
				<v-list-item-icon>
					<v-icon>{{ language.icon }}</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					{{ language.name }}
				</v-list-item-content>
			</v-list-item>
		</template>
	</v-list>
</template>

<script>
import { mdiMenuDown, mdiMenuUp } from "@mdi/js";
import EnvConfigModule from "@/store/env-config";
import AuthModule from "@/store/auth";

export default {
	data() {
		return {
			mdiMenuDown,
			mdiMenuUp,
			menuVisible: false,
		};
	},
	computed: {
		availableLanguages: {
			get() {
				const languages = EnvConfigModule.getAvailableLanguages
					.split(",")
					.map((locale) => this.buildLanguageObject(locale))
					.filter((language) => {
						return language.locale !== this.selectedLanguage.locale;
					});
				return languages;
			},
		},
		selectedLanguage: {
			get() {
				const language = this.buildLanguageObject(
					AuthModule.getLocale || EnvConfigModule.getFallbackLanguage
				);
				return language;
			},
		},
	},
	methods: {
		toggleMenu() {
			this.menuVisible = !this.menuVisible;
		},
		changeLanguage(language) {
			AuthModule.updateUserLanguage(language.locale);
			window.location.reload();
		},
		buildLanguageObject(locale) {
			const name = this.$t(`global.topbar.locale.longName.${locale}`);
			const icon =
				"$langIcon" + locale.charAt(0).toUpperCase() + locale.slice(1);
			return { locale, name, icon };
		},
	},
};
</script>

<style scoped>
.v-list-item__icon {
	margin-right: var(--space-xs);
	margin-left: var(--space-xs);
}
.v-list-item:focus {
	outline: none;
}
</style>
