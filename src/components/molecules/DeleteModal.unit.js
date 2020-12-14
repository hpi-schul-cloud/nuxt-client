import DeleteModal from "./DeleteModal";

describe("@components/molecules/DeleteModal", () => {
	const wrapper = mount(DeleteModal, {
		...createComponentMocks({
			i18n: true,
		}),
		propsData: {
			confirmationText: "Willst du die Aufgabe wirklich löschen?",
			showDeleteModal: true,
		},
	});

	it(...isValidComponent(DeleteModal));

	it("renders its classes", () => {
		expect(wrapper.find(".modal-container").exists()).toBe(true);
		expect(wrapper.find(".modal-body").exists()).toBe(true);
		expect(wrapper.find(".modal-title").exists()).toBe(true);
		expect(wrapper.find(".modal-description").exists()).toBe(true);
	});

	it("renders action buttons", () => {
		expect(wrapper.find(".right-container > .button").exists()).toBe(true);
		expect(wrapper.find(".right-container > .delete-btn").exists()).toBe(true);
	});

	it("close Modal on 'Cancel' button", async () => {
		const cancelBtn = wrapper.find(".right-container > .button");
		await cancelBtn.trigger("click");
		expect(wrapper.emitted("update:show-delete-modal")).toHaveLength(1);
	});

	it("close Modal on 'Delete' button", async () => {
		const deleteBtn = wrapper.find(".right-container > .delete-btn");
		await deleteBtn.trigger("click");
		expect(wrapper.emitted("update:show-delete-modal")).toHaveLength(2);
	});
});
