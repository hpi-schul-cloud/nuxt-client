import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";
import { select } from "@storybook/addon-knobs";

import ContentSearchbar from "@components/molecules/ContentSearchbar";

const template = `
	<content-searchbar
		v-model.lazy="searchQuery"
		:class="
			!activateTransition ? 'first-search__searchbar' : 'content__searchbar'
		"
		placeholder="Lernstore durchsuchen"
		:loading="loading"
		@keyup:enter="transitionHandler"
	/>
`;

storiesOf("5 Molecules/ContentSearchbar", module).add(
	"ContentSearchbar",
	() => ({
		components: { ContentSearchbar },
		data: () => ({
			searchQuery: text("searchQuery", ""),
			placeholder: text("placeholder", "Lernstore durchsuchen"),
			activateTransition: select(
				"activateTransition",
				{ true: true, false: false },
				false
			),
		}),
		template,
	})
);
