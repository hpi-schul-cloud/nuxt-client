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
				v-for="language in otherLanguages"
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

export default {
	data() {
		return {
			mdiMenuDown,
			mdiMenuUp,
			languages: [
				{ locale: "de", name: "Deutsch", icon: "$langIconDe" },
				{ locale: "en", name: "English", icon: "$langIconEn" },
				{ locale: "es", name: "Espanol", icon: "$langIconEs" },
				{ locale: "ua", name: "Ukrainski", icon: "$langIconUa" },
			],
			selectedLanguage: { locale: "de", name: "Deutsch", icon: "$langIconDe" },
			menuVisible: false,
		};
	},
	computed: {
		otherLanguages: {
			get() {
				return this.languages.filter(
					(lang) => lang.locale !== this.selectedLanguage.locale
				);
			},
		},
	},
	methods: {
		toggleMenu() {
			this.menuVisible = !this.menuVisible;
		},
		changeLanguage(language) {
			this.selectedLanguage = { ...language };
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
