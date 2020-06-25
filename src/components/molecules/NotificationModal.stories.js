import { storiesOf } from "@storybook/vue";

import NotificationModal from "@components/molecules/NotificationModal";

storiesOf("5 Molecules/NotificationModal", module).add(
	"NotificationModal",
	() => ({
		components: { NotificationModal },
		data: () => ({
			showNotificationModal: true,
		}),

		template: `<notification-modal 
        :show-notification-modal="true"
        :success-msg="Material wurde erfolgreich hinzugefügt"
        :error-msg="Irgendetwas ist schiefgegangen. Material konnte nicht hinzugefügt werden"
        />`,
	})
);
