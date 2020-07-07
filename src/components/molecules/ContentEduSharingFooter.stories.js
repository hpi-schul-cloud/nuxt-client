import { storiesOf } from "@storybook/vue";

import ContentEduSharingFooter from "@components/molecules/ContentEduSharingFooter";

storiesOf("5 Molecules/Content/ContentEduSharingFooter", module).add(
	"ContentEduSharingFooter",
	() => ({
		components: { ContentEduSharingFooter },
		data: () => ({}),
		template: `<content-edu-sharing-footer />`,
	})
);
