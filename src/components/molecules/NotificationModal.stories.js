import { storiesOf } from "@storybook/vue";
import { boolean } from "@storybook/addon-knobs";

import NotificationModal from "@components/molecules/NotificationModal";

storiesOf("5 Molecules/NotificationModal", module).add(
	"NotificationModal",
	() => ({
		components: { NotificationModal },
		data: () => ({
			showNotificationModal: boolean("showNotificationModal", true),
			isSuccess: boolean("Success", true),
		}),

		template: `
        <div>
            <base-button @click="showNotificationModal = true">
                    Open Modal
            </base-button>
            <notification-modal 
            :show-notification-modal.sync="showNotificationModal"
            :is-success="isSuccess"
            :success-msg="$t('pages.content.notification.successMsg')"
            :error-msg="$t('pages.content.notification.errorMsg')"
            @click="showNotificationModal = false"
            />
        </div>`,
	})
);
