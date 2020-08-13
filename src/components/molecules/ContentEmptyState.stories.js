import { storiesOf } from "@storybook/vue";

import ContentEmptyState from "@components/molecules/ContentEmptyState";

storiesOf("5 Molecules/Content/States", module).add(
	"ContentEmptyState",
	() => ({
		components: { ContentEmptyState },
		data: () => ({}),

		template: `<content-empty-state/>`,
	})
);
