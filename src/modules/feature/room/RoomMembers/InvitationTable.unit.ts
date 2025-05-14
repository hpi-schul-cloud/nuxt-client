import { createTestingPinia } from "@pinia/testing";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import InvitationTable from "./InvitationTable.vue";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { roomInvitationLinkFactory } from "@@/tests/test-utils/factory/room/roomInvitationLinkFactory";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { useRoomInvitationLinkStore } from "@data-room";
import { nextTick, ref } from "vue";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import { useConfirmationDialog } from "@ui-confirmation-dialog";

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({ t: (key: string) => key }),
	};
});

jest.mock("@ui-confirmation-dialog");
const mockedUseRemoveConfirmationDialog = jest.mocked(useConfirmationDialog);

describe("InvitationTable", () => {
	let askConfirmationMock: jest.Mock;
	const notifierModule = createModuleMocks(NotifierModule);
	beforeEach(() => {
		askConfirmationMock = jest.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});
		mockedUseRemoveConfirmationDialog.mockReturnValue({
			askConfirmation: askConfirmationMock,
			isDialogOpen: ref(false),
		});
	});
	const roomInvitationLinks = roomInvitationLinkFactory.buildList(3);

	const setup = () => {
		const wrapper = mount(InvitationTable, {
			global: {
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
				plugins: [
					createTestingI18n(),
					createTestingVuetify(),
					createTestingPinia({
						initialState: {
							roomInvitationLinks,
							isInvitationDialogOpen: false,
							selectedIds: [],
							isLoading: false,
						},
					}),
				],
			},
			stubs: {
				KebabMenuActionRemoveMember: true,
				DataTable: true,
				BatchActionMenu: true,
			},
		});

		const roomInvitationLinkStore = mockedPiniaStoreTyping(
			useRoomInvitationLinkStore
		);

		roomInvitationLinkStore.roomInvitationLinks = roomInvitationLinks;

		return { wrapper, roomInvitationLinkStore };
	};

	describe("rendering", () => {
		it("renders properly", () => {
			const { wrapper } = setup();

			const dataTable = wrapper.findComponent({ name: "DataTable" });

			expect(wrapper.exists()).toBe(true);
			expect(dataTable.exists()).toBe(true);
		});

		it("should pass tableHeader prop to DataTable", () => {
			const headers = [
				"pages.rooms.members.tableHeader.description",
				"pages.rooms.members.tableHeader.onlyValidWithinTheSchool",
				"pages.rooms.members.tableHeader.validForStudents",
				"pages.rooms.members.tableHeader.expirationDate",
				"pages.rooms.members.tableHeader.confirmationRequired",
				"pages.rooms.members.tableHeader.status",
				"pages.rooms.members.tableHeader.actions",
			];
			const { wrapper } = setup();
			const dataTable = wrapper.getComponent({ name: "DataTable" });

			expect(
				dataTable
					.props("tableHeaders")!
					.map((header: { title: string }) => header.title)
			).toEqual(headers);
		});
	});

	describe("actions", () => {
		it("should set selectedIds after emit", async () => {
			const { wrapper, roomInvitationLinkStore } = setup();

			const dataTable = wrapper.findComponent({ name: "DataTable" });

			expect(roomInvitationLinkStore.selectedIds).toEqual([]);
			await dataTable.vm.$emit("update:selected-ids", ["item-1", "item-2"]);

			expect(roomInvitationLinkStore.selectedIds).toEqual(["item-1", "item-2"]);
		});

		it.each([
			{
				description: "single link",
				selectedLinks: [roomInvitationLinks[0].id],
				expectedMessage:
					"pages.rooms.members.invitationTable.delete.confirmation",
			},
			{
				description: "multiple links",
				selectedLinks: [roomInvitationLinks[0].id, roomInvitationLinks[1].id],
				expectedMessage:
					"pages.rooms.members.invitationTable.multipleDelete.confirmation",
			},
		])(
			"should render confirmation dialog with text for $description when remove action is clicked",
			async ({ selectedLinks, expectedMessage }) => {
				const { wrapper, roomInvitationLinkStore } = setup();
				roomInvitationLinkStore.selectedIds = selectedLinks;
				await nextTick();

				askConfirmationMock.mockResolvedValue(true);

				const actionButton = wrapper.find('[data-testid="action-menu-button"]');
				await actionButton.trigger("click");

				const deleteButton = wrapper.findComponent(".v-list-item");
				await deleteButton.trigger("click");

				expect(roomInvitationLinkStore.deleteLinks).toHaveBeenCalledWith(
					selectedLinks
				);
				expect(askConfirmationMock).toHaveBeenCalledWith({
					confirmActionLangKey: "common.actions.remove",
					message: expectedMessage,
				});
			}
		);
	});
});
