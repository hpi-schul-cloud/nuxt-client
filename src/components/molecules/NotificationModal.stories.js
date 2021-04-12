import { storiesOf } from "@storybook/vue";
import { boolean } from "@storybook/addon-knobs";

import NotificationModal from "@components/molecules/NotificationModal";

storiesOf("5 Molecules/Modals", module).add("NotificationModal", () => ({
	components: { NotificationModal },
	data: () => ({
		showNotificationModal: boolean("showNotificationModal", true),
		isError: boolean("Error", false),
	}),

	template: `
        <div>
            <base-button @click="showNotificationModal = true">
                    Open Modal
            </base-button>
            <notification-modal 
            :show-notification-modal.sync="showNotificationModal"
            :is-success="!isError"
            :success-msg="$t('pages.content.notification.successMsg')"
            :error-msg="$t('pages.content.notification.errorMsg')"
            @click="showNotificationModal = false"
            />
        </div>`,
}));
