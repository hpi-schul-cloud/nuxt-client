import { storiesOf } from "@storybook/vue";


import NotificationMail from "./NotificationMail";

storiesOf("Legacy/NotificationMail", module)
	.add("default", () => ({
		components: { NotificationMail },
		template: `<NotificationMail />`,
		data: () => ({}),
	}));
