import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import ContentSearchbar from "@components/molecules/ContentSearchbar";

storiesOf("5 Molecules/ContentSearchbar", module).add(
	"ContentSearchbar",
	() => ({
		components: { ContentSearchbar },
		data: () => ({
			searchQuery: text("searchQuery", ""),
			placeholder: text("placeholder", "Suche nach..."),
		}),
		template: `<searchbar v-model.lazy="searchQuery" :placeholder="placeholder" />`,
	})
);
