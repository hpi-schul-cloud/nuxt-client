import { storiesOf } from "@storybook/vue";

import BaseTitle from "@components/base/BaseTitle";

storiesOf("Base|Base UI|BaseTitle", module).add("BaseTitle", () => ({
	components: { BaseTitle },
	template: `
		<BaseTitle>BaseTitle Component</BaseTitle>`,
}));
