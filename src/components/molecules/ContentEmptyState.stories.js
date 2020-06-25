import { storiesOf } from "@storybook/vue";

import ContentEmptyState from "@components/molecules/ContentEmptyState";

storiesOf("5 Molecules/ContentEmptyState", module).add(
	"ContentEmptyState",
	() => ({
		components: { ContentEmptyState },
		data: () => ({}),

		template: `<content-empty-state/>`,
	})
);
