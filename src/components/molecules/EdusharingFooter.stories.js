import { storiesOf } from "@storybook/vue";

import EdusharingFooter from "@components/molecules/EdusharingFooter";

storiesOf("5 Molecules/EdusharingFooter", module).add(
	"EdusharingFooter",
	() => ({
		components: { EdusharingFooter },
		data: () => ({}),
		template: `<edusharing-footer />`,
	})
);
