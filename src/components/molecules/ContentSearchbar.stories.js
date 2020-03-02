import { storiesOf } from "@storybook/vue";
import { text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import ContentSearchbar from "@components/molecules/ContentSearchbar";

storiesOf("5 Molecules/ContentSearchbar", module).add(
	"ContentSearchbar",
	() => ({
		components: { ContentSearchbar },
		data: () => ({
			searchQuery: text("searchQuery", ""),
			placeholder: text("placeholder", "Lernstore durchsuchen"),
			activateTransition: boolean("activateTransition", false),
			loading: boolean("loading", false),
		}),
		methods: {
			transitionHandler: action("transitionHandler"),
		},
		template: `
			<content-searchbar
				v-model.lazy="searchQuery"
				:class="
					!activateTransition ? 'first-search__searchbar' : 'content__searchbar'
				"
				:placeholder="placeholder"
				:loading="loading"
				@keyup:enter="transitionHandler"
			/>
		`,
	})
);
