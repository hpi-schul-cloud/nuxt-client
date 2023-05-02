import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue, { ref } from "vue";
import { useInternalDeleteConfirmation } from "./delete-confirmation.composable";
import DeleteConfirmation from "./DeleteConfirmation.vue";

jest.mock("./delete-confirmation.composable");
const mockedUseInternalDeleteConfirmation = jest.mocked(
	useInternalDeleteConfirmation
);

describe(DeleteConfirmation.name, () => {
	const confirmSpy = jest.fn();
	const cancelSpy = jest.fn();
	const setup = (options: {
		isDeleteModalOpen?: boolean;
		title?: string;
		typeName?: string;
	}) => {
		document.body.setAttribute("data-app", "true");

		mockedUseInternalDeleteConfirmation.mockReturnValue({
			confirm: confirmSpy,
			cancel: cancelSpy,
			askInternal: jest.fn(),
			dialogOptions: ref({ message: "TestMessage" }),
			isDialogOpen: ref(true),
		});

		const wrapper = shallowMount(DeleteConfirmation as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				i18n: { t: (key: string) => key },
			},
			propsData: {
				isDeleteModalOpen: options?.isDeleteModalOpen ?? true,
				title: options.title ?? "title",
				typeName: options.typeName ?? "card",
			},
		});
		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const wrapper = setup({});
			expect(wrapper.findComponent(DeleteConfirmation).exists()).toBe(true);
		});
	});

	describe("when a dialog button clicked", () => {
		it("should broadcast 'confirm' if 'remove' button clicked", () => {
			const wrapper = setup({});
			const dialog = wrapper.findComponent({ name: "vCustomDialog" });
			dialog.vm.$emit("dialog-confirmed");
			expect(confirmSpy).toHaveBeenCalled();
		});

		it("should emit 'dialog-cancel' if 'cancel' button clicked", () => {
			const wrapper = setup({});
			const dialog = wrapper.findComponent({ name: "vCustomDialog" });
			dialog.vm.$emit("dialog-closed");
			expect(cancelSpy).toHaveBeenCalled();
		});
	});
});
