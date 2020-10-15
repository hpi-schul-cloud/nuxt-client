import { storiesOf } from "@storybook/vue";

import ContentInitialState from "@components/molecules/ContentInitialState";

storiesOf("5 Molecules/Content/States", module).add(
	"ContentInitialState",
	() => ({
		components: { ContentInitialState },
		data: () => ({}),

		template: `<content-initial-state/>`,
	})
);
