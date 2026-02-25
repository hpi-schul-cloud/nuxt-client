import DeleteUserDialog from "./DeleteUserDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VCard, VCardTitle, VDialog, VListItem } from "vuetify/components";

describe("DeleteUserDialog", () => {
	type User = {
		_id: string;
		firstName: string;
		lastName: string;
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = () => {
		const selectedUsers: User[] = [
			{ _id: "1", firstName: "John", lastName: "Doe" },
			{ _id: "2", firstName: "Jane", lastName: "Smith" },
		];

		const wrapper = mount(DeleteUserDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				selectedUsers,
				userType: "student",
				modelValue: true,
			},
		});
		const dialog = wrapper.findComponent(VDialog);
		const card = dialog.findComponent(VCard);

		return { wrapper, dialog, card };
	};

	it("should render correctly", () => {
		const { wrapper } = setup();
		expect(wrapper.exists()).toBe(true);
	});

	it("should render the correct title based on user type", () => {
		const { wrapper, dialog } = setup();
		logger.log(wrapper.html(), dialog.html());
		expect(dialog.findComponent(VCard).findComponent(VCardTitle).text()).toContain(
			"pages.administration.students.index.remove.confirm.message.multiple"
		);
	});

	it("should render the list of selected users", () => {
		const { card } = setup();
		logger.log(card.html());
		expect(card.findAllComponents(VListItem)).toHaveLength(2);
	});
});
