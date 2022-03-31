<template>
	<v-list>
		<v-list-item
			dense
			:data-testid="`selected-language-${selectedItem.language}`"
			@click.stop="toggleMenu"
		>
			<v-list-item-icon>
				<v-icon>{{ selectedItem.icon }}</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				{{ selectedItem.name }}
			</v-list-item-content>
			<v-list-item-action>
				<v-icon>{{ mdiMenuDown }}</v-icon>
			</v-list-item-action>
		</v-list-item>
		<template v-if="menuVisible">
			<v-list-item
				v-for="item in availableItems"
				:key="item.language"
				dense
				:data-testid="`available-language-${item.language}`"
				@click="changeLanguage(item)"
			>
				<v-list-item-icon>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					{{ item.name }}
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
		availableItems: {
			get() {
				const languages = EnvConfigModule.getAvailableLanguages
					.split(",")
					.map((language) => this.buildLanguageItem(language))
					.filter((language) => {
						return language.language !== this.selectedItem.language;
					});
				return languages;
			},
		},
		selectedItem: {
			get() {
				const language = this.buildLanguageItem(
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
		async changeLanguage(item) {
			await AuthModule.updateUserLanguage(item.language);
			window.location.reload();
		},
		buildLanguageItem(language) {
			const name = this.$t(`global.topbar.language.longName.${language}`);
			const icon =
				"$langIcon" + language.charAt(0).toUpperCase() + language.slice(1);
			return { language, name, icon };
		},
	},
};
</script>

<style scoped>
.v-list-item__icon {
	margin-right: var(--space-xs);
	margin-left: var(--space-xs);
}
.v-list-item__action {
	margin-top: var(--space-xs);
	margin-bottom: var(--space-xs);
}
.v-list-item:focus {
	outline: none;
}
</style>
