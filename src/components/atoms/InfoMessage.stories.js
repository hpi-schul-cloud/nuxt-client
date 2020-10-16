import { storiesOf } from "@storybook/vue";

import InfoMessage from "@components/atoms/InfoMessage";

storiesOf("3 Atoms/InfoMessage", module)
	.add("Info Message", () => ({
		components: { InfoMessage },
		template: `<InfoMessage message="I have an interesting information for you"/>`,
	}))
	.add("Error Message", () => ({
		components: { InfoMessage },
		template: `<InfoMessage message="Something went wrong" type="error"/>`,
	}))
	.add("Success Message", () => ({
		components: { InfoMessage },
		template: `<InfoMessage message="Something went well" type="success"/>`,
	}))
	.add("Warning Message", () => ({
		components: { InfoMessage },
		template: `<InfoMessage message="Something is a bit off, but not really bad" type="warning"/>`,
	}));
