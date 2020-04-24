import { storiesOf } from "@storybook/vue";

import MailNotification from "./MailNotification";

storiesOf("Legacy/MailNotification", module).add("default", () => ({
	components: { MailNotification },
	template: `<MailNotification />`,
	data: () => ({}),
}));
