import { storiesOf } from "@storybook/vue";

import DeleteModal from "@components/molecules/DeleteModal";
import { boolean, text } from "@storybook/addon-knobs";

storiesOf("4 Base UI Components/Modals", module).add("Delete Modal", () => ({
	components: { DeleteModal },
	data: () => ({
		showDeleteModal: boolean("showDeleteModal", true),
		confirmationText: text(
			"confirmationText",
			"Willst du die Aufgabe wirklich löschen?"
		),
	}),
	template: `<delete-modal
                        :show-delete-modal.sync="showDeleteModal"
                        :confirmation-text="confirmationText"
                    ></delete-modal>`,
}));
