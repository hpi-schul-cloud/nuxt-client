import MemberInvitationsTable from "./MemberInvitationsTable.vue";
import { useI18nGlobal } from "@/plugins/i18n";
import { createTestAppStoreWithUser, mockedPiniaStoreTyping, registrationFactory } from "@@/tests/test-utils";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { type Registration, useRegistrationStore } from "@data-room";
import { mdiMagnify, mdiMenuDown, mdiMenuUp } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { KebabMenuActionRemoveInvitation } from "@ui-kebab-menu";
import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap.mjs";
import { Mock, vi } from "vitest";
import { nextTick, ref } from "vue";
import { VDataTable, VTextField } from "vuetify/lib/components/index";

vi.mock("@ui-confirmation-dialog");
const mockedUseConfirmationDialog = vi.mocked(useConfirmationDialog);

vi.mock("@vueuse/integrations/useFocusTrap");

vi.mock("@/plugins/i18n");
(useI18nGlobal as Mock).mockReturnValue({ t: (key: string) => key });

describe("MemberInvitationsTable", () => {
	let askConfirmationMock: Mock;

	let pauseMock: Mock;
	let unpauseMock: Mock;
	let deactivateMock: Mock;
	let activateMock: Mock;

	beforeEach(() => {
		askConfirmationMock = vi.fn();

		setupConfirmationComposableMock({
			askConfirmationMock,
		});

		mockedUseConfirmationDialog.mockReturnValue({
			askConfirmation: askConfirmationMock,
			isDialogOpen: ref(false),
		});

		pauseMock = vi.fn();
		unpauseMock = vi.fn();
		deactivateMock = vi.fn();
		activateMock = vi.fn();

		(useFocusTrap as Mock).mockReturnValue({
			pause: pauseMock,
			unpause: unpauseMock,
			deactivate: deactivateMock,
			activate: activateMock,
		});
	});

	const tableHeaders = [
		"common.labels.firstName",
		"common.labels.lastName",
		"common.labels.email",
		"common.labels.invitedDate",
		"pages.rooms.members.tableHeader.actions",
	];

	const setup = (
		options?: Partial<{
			windowWidth: number;
			registrations: Registration[];
		}>
	) => {
		const registrations = options?.registrations ?? registrationFactory.buildList(3);
		const windowWidth = options?.windowWidth ?? 1280;

		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: windowWidth,
		});

		createTestingPinia({
			initialState: {
				registrationStore: {
					registrations,
				},
			},
		});
		createTestAppStoreWithUser();

		const registrationStore = mockedPiniaStoreTyping(useRegistrationStore);
		registrationStore.registrations = registrations;

		const wrapper = mount(MemberInvitationsTable, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		const registrationItems = registrationStore.registrations;

		return {
			wrapper,
			registrationStore,
			registrationItems,
		};
	};

	// index 0 is the header checkbox
	const selectCheckboxes = async (indices: number[], wrapper: VueWrapper) => {
		const dataTable = wrapper.getComponent(VDataTable);
		const checkboxes = dataTable.findAll("input[type='checkbox']");

		for (const index of indices) {
			const checkbox = checkboxes[index];
			await checkbox.trigger("click");
		}

		return { checkboxes };
	};

	const getCheckedIndices = (checkboxes: DOMWrapper<Element>[]) => {
		const result = checkboxes.reduce((selectedIndices, checkbox, index) => {
			if (checkbox.attributes("checked") === "") {
				selectedIndices.push(index);
			}
			return selectedIndices;
		}, [] as Array<number>);

		return result;
	};

	it("should render invitations table component", () => {
		const { wrapper } = setup();
		expect(wrapper.exists()).toBe(true);
	});

	it("should have column style for extra small display sizes", () => {
		const { wrapper } = setup({ windowWidth: 599 });

		const dataTable = wrapper.get(".table-title-header");

		expect(dataTable.classes()).toContain("flex-column");
	});

	it("should not have column style when display size is over 599px", () => {
		const { wrapper } = setup({ windowWidth: 800 });

		const dataTable = wrapper.get(".table-title-header");

		expect(dataTable.classes()).not.toContain("flex-column");
	});

	it("should render data table", () => {
		const { wrapper, registrationItems } = setup();

		const dataTable = wrapper.getComponent(VDataTable);

		expect(dataTable.props("headers")!.map((header) => header.title)).toEqual(tableHeaders);
		expect(dataTable.props("items")).toEqual(registrationItems);
		expect(dataTable.props("sortAscIcon")).toEqual(mdiMenuDown);
		expect(dataTable.props("sortDescIcon")).toEqual(mdiMenuUp);
	});

	it("should render checkboxes", () => {
		const { wrapper, registrationItems } = setup();

		const dataTable = wrapper.findComponent(VDataTable);
		const checkboxes = dataTable.findAll("input[type='checkbox']");

		expect(checkboxes.length).toEqual(registrationItems.length + 1);
	});

	describe("when selecting members", () => {
		it("should select all members when header checkbox is clicked", async () => {
			const { wrapper, registrationItems } = setup();

			const { checkboxes } = await selectCheckboxes([0], wrapper);
			const checkedIndices = getCheckedIndices(checkboxes);
			const expectedIndices = Array.from({ length: registrationItems.length + 1 }, (_, i) => i);

			expect(checkedIndices).toEqual(expectedIndices);
		});

		it("should select single member", async () => {
			const { wrapper } = setup();

			const { checkboxes } = await selectCheckboxes([1], wrapper);
			const checkedIndices = getCheckedIndices(checkboxes);
			const expectedIndices = [1];

			expect(checkedIndices).toEqual(expectedIndices);
		});
	});

	describe("remove invitation action", () => {
		const triggerInvitationRemoval = async (wrapper: VueWrapper, index: number) => {
			const dataTable = wrapper.getComponent(VDataTable);
			const menuBtn = dataTable.findComponent(`[data-testid="kebab-menu-${index}"]`);

			await menuBtn.trigger("click");
			await nextTick();

			const removeBtn = wrapper.findComponent(KebabMenuActionRemoveInvitation);

			await removeBtn.trigger("click");
		};

		it("should open confirmation dialog for single invitation", async () => {
			const { wrapper } = setup();
			askConfirmationMock.mockResolvedValue(true);

			await triggerInvitationRemoval(wrapper, 0);

			expect(askConfirmationMock).toHaveBeenCalledWith({
				message: "pages.rooms.members.registrations.remove.confirmation",
				confirmActionLangKey: "common.actions.delete",
			});
		});

		it("should call removeInvitations when confirmed", async () => {
			const { wrapper, registrationStore, registrationItems } = setup();
			askConfirmationMock.mockResolvedValue(true);

			await triggerInvitationRemoval(wrapper, 0);

			expect(registrationStore.removeInvitations).toHaveBeenCalledWith([registrationItems[0].id]);
		});

		it("should not call removeInvitations when cancelled", async () => {
			const { wrapper, registrationStore } = setup();
			askConfirmationMock.mockResolvedValue(false);

			await triggerInvitationRemoval(wrapper, 0);

			expect(registrationStore.removeInvitations).not.toHaveBeenCalled();
		});
	});

	describe("when searching for members", () => {
		it("should render the search component", () => {
			const { wrapper } = setup();

			const search = wrapper.getComponent(VTextField);

			expect(search.props("label")).toEqual("common.labels.search");
			expect(search.props("prependInnerIcon")).toEqual(mdiMagnify);
		});

		it("should render search component with flex order 1 for extra small display sizes", () => {
			const { wrapper } = setup({
				windowWidth: 599,
			});

			const search = wrapper.findComponent(VTextField);

			expect(search.classes()).toContain("order-1");
		});

		it("should not render search component with flex order 1 for display sizes greater than 599px", () => {
			const { wrapper } = setup({
				windowWidth: 800,
			});

			const search = wrapper.findComponent(VTextField);

			expect(search.classes()).not.toContain("order-1");
		});

		it("should filter the invitations based on the search value", async () => {
			const { wrapper, registrationItems } = setup();

			const search = wrapper.getComponent(VTextField);
			const searchValue = registrationItems[0].firstName;
			await search.setValue(searchValue);

			const dataTable = wrapper.getComponent(VDataTable);
			const dataTableTextContent = dataTable.text();

			expect(dataTable.props("search")).toEqual(searchValue);
			expect(dataTableTextContent).toContain(registrationItems[0].firstName);
			expect(dataTableTextContent).not.toContain(registrationItems[1].firstName);
			expect(dataTableTextContent).not.toContain(registrationItems[2].firstName);
		});
	});
});
