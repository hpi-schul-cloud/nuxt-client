import { storiesOf } from "@storybook/vue";

import ErrorMessage from "@components/atoms/ErrorMessage";

storiesOf("3 Atoms/ErrorMessage", module).add("Error Message", () => ({
	components: { ErrorMessage },
	template: `<ErrorMessage message="Something went wrong"/>`,
}));
