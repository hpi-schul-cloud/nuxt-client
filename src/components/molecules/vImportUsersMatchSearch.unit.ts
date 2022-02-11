import { mount } from "@vue/test-utils";
import vImportUsersMatchSearch from "./vImportUsersMatchSearch.vue";

declare var createComponentMocks: Function;

const testProps = {
	editedItem: {
		flagged: false,
		importUserId: "123",
		loginName: "max_mus",
		firstName: "Max",
		lastName: "Mustermann",
		roleNames: ["student"],
		classNames: ["6a"],
	},
	isDialog: true,
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(vImportUsersMatchSearch, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/molecules/RoomTaskCardTeacher", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
	});

	it("should have correct props", () => {
		const wrapper = getWrapper(testProps);

		expect(wrapper.vm.editedItem).toStrictEqual(testProps.editedItem);
		expect(wrapper.vm.isDialog).toStrictEqual(testProps.isDialog);
	});

	it("should display 'editedItem' property in HTML section", async () => {
		const wrapper = getWrapper(testProps);
		const editedItemElement = wrapper.find("#edited-item");

		expect(editedItemElement.element.textContent).toContain("Max");
		expect(editedItemElement.element.textContent).toContain("Mustermann");
		expect(editedItemElement.element.textContent).toContain("student");
		expect(editedItemElement.element.textContent).toContain("max_mus");
		expect(editedItemElement.element.textContent).toContain("6a");
	});

	it.skip("should set 'flagged' property true when flag-button clicked", async () => {
		const wrapper = getWrapper(testProps);
		const flagButtonElement = wrapper.find("#flag-button");
		await flagButtonElement.trigger("click");

		expect(wrapper.vm.editedItem.flagged).toBe(true);
		// expect(received).toBe(expected) // Object.is equality
		// probably this caused from the 'Avoid mutating a prop directly' error
	});

	it("should set 'selectedItem' property when autoComplete element is selected ", async () => {
		const payload = {
			userId: "0000d231816abba584714c9e",
			loginName: "lehrer@schul-cloud.org",
			firstName: "Cord",
			lastName: "Carl",
			roleNames: ["teacher"],
			text: "Cord Carl",
		};
		const wrapper = getWrapper(testProps);
		const autoCompleteElement = wrapper.find(".v-autocomplete");
		await autoCompleteElement.vm.$emit("input", payload);
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.selectedItem).toStrictEqual(payload);
		expect(wrapper.vm.canSave).toStrictEqual(true);
	});

	it("should saveMatch method triggered when save button clicked", async () => {
		const saveMatch = jest.fn();
		const payload = {
			userId: "0000d231816abba584714c9e",
			loginName: "lehrer@schul-cloud.org",
			firstName: "Cord",
			lastName: "Carl",
			roleNames: ["teacher"],
			text: "Cord Carl",
		};
		const wrapper = getWrapper(testProps);
		wrapper.vm.saveMatch = saveMatch;
		const autoCompleteElement = wrapper.find(".v-autocomplete");
		await autoCompleteElement.vm.$emit("input", payload);
		await wrapper.vm.$nextTick();

		const saveMatchButton = wrapper.find("#save-match-btn");
		await saveMatchButton.trigger("click");

		expect(saveMatch).toHaveBeenCalled();
	});
});
