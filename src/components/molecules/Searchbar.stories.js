import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import Searchbar from "@components/molecules/Searchbar";

storiesOf("4 Molecules/Searchbar", module).add("Searchbar", () => ({
	components: { Searchbar },
	data: () => ({
		searchQuery: text("searchQuery", ""),
		placeholder: text("placeholder", "Suche nach..."),
	}),
	template: `<searchbar v-model.lazy="searchQuery" :placeholder="placeholder" />`,
}));
