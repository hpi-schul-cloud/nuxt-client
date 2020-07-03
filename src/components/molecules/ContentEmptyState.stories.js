import { storiesOf } from "@storybook/vue";

import ContentEmptyState from "@components/molecules/ContentEmptyState";

storiesOf("5 Molecules/Content/ContentEmptyState", module).add(
	"ContentEmptyState",
	() => ({
		components: { ContentEmptyState },
		data: () => ({}),

		template: `<content-empty-state/>`,
	})
);
