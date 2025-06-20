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
import { InvitationStep, useRoomInvitationLinkStore } from "@data-room";
import { nextTick, ref } from "vue";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import {
	useConfirmationDialog,
	useDeleteConfirmationDialog,
} from "@ui-confirmation-dialog";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import { useI18n } from "vue-i18n";

vi.mock("vue-i18n", () => {
	return {
		...vi.importActual("vue-i18n"),
		useI18n: vi.fn().mockReturnValue({
			t: vi.fn().mockImplementation((key: string) => key),
		}),
	};
});
const mockI18n = vi.mocked(useI18n());

vi.mock("@ui-confirmation-dialog");
const mockedUseRemoveConfirmationDialog = vi.mocked(useConfirmationDialog);
vi.mocked(useDeleteConfirmationDialog);

describe("InvitationTable", () => {
	let askConfirmationMock: vi.Mock;
	let askDeleteConfirmationMock: vi.Mock;
	const notifierModule = createModuleMocks(NotifierModule);
	beforeEach(() => {
		askConfirmationMock = vi.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});
		mockedUseRemoveConfirmationDialog.mockReturnValue({
			askConfirmation: askConfirmationMock,
			isDialogOpen: ref(false),
		});

		askDeleteConfirmationMock = vi.fn();
		setupDeleteConfirmationComposableMock({
			askDeleteConfirmationMock,
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
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
			expect(mockI18n.t).toHaveBeenCalled();
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
			headers.forEach((header) => {
				expect(mockI18n.t).toHaveBeenCalledWith(header);
			});
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
			"should render confirmation dialog with text for $description when delete action is clicked",
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
					confirmActionLangKey: "common.actions.delete",
					message: expectedMessage,
				});
			}
		);

		describe("when share button clicked", () => {
			it("should set invitation step to 'share'", async () => {
				const { wrapper, roomInvitationLinkStore } = setup();
				await nextTick();

				expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(false);
				expect(roomInvitationLinkStore.invitationStep).toBe(
					InvitationStep.PREPARE
				);

				const shareButton = wrapper.findComponent(
					`[data-testid="share-button-${roomInvitationLinks[0].id}"]`
				);
				await shareButton.trigger("click");
				await nextTick();
				const expectedLink = `/rooms/invitation-link/${roomInvitationLinks[0].id}`;

				expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(true);
				expect(roomInvitationLinkStore.invitationStep).toBe(
					InvitationStep.SHARE
				);
				expect(roomInvitationLinkStore.sharedUrl).toContain(expectedLink);
			});
		});

		describe("when edit button clicked", () => {
			it("should set invitation step to 'edit'", async () => {
				askDeleteConfirmationMock.mockResolvedValue(true);
				const { wrapper, roomInvitationLinkStore } = setup();
				await nextTick();
				await nextTick();

				expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(false);
				expect(roomInvitationLinkStore.invitationStep).toBe(
					InvitationStep.PREPARE
				);

				const dataTable = wrapper.findComponent({ name: "DataTable" });
				const kebabMenu = dataTable.findComponent(
					`[data-testid="kebab-menu-${roomInvitationLinks[0].id}"]`
				);
				await kebabMenu.trigger("click");

				const editButton = wrapper.findComponent(
					`[data-testid="menu-edit-button-${roomInvitationLinks[0].id}"]`
				);
				await editButton.trigger("click");
				await nextTick();

				expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(true);
				expect(roomInvitationLinkStore.invitationStep).toBe(
					InvitationStep.EDIT
				);
			});
		});

		describe("when menu share button clicked", () => {
			it("should set invitation step to 'share'", async () => {
				const { wrapper, roomInvitationLinkStore } = setup();
				await nextTick();

				expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(false);
				expect(roomInvitationLinkStore.invitationStep).toBe(
					InvitationStep.PREPARE
				);

				const dataTable = wrapper.findComponent({ name: "DataTable" });
				const kebabMenu = dataTable.findComponent(
					`[data-testid="kebab-menu-${roomInvitationLinks[0].id}"]`
				);
				await kebabMenu.trigger("click");

				const shareButton = wrapper.findComponent(
					`[data-testid="menu-share-button-${roomInvitationLinks[0].id}"]`
				);
				await shareButton.trigger("click");
				await nextTick();

				expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(true);
				expect(roomInvitationLinkStore.invitationStep).toBe(
					InvitationStep.SHARE
				);
			});
		});

		describe("when menu delete button clicked", () => {
			it("should call deleteLinks with the correct id", async () => {
				askConfirmationMock.mockResolvedValue(true);
				const { wrapper, roomInvitationLinkStore } = setup();
				await nextTick();

				expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(false);
				expect(roomInvitationLinkStore.invitationStep).toBe(
					InvitationStep.PREPARE
				);

				const dataTable = wrapper.findComponent({ name: "DataTable" });
				const kebabMenu = dataTable.findComponent(
					`[data-testid="kebab-menu-${roomInvitationLinks[0].id}"]`
				);
				await kebabMenu.trigger("click");

				const deleteButton = wrapper.findComponent(
					`[data-testid="menu-delete-button-${roomInvitationLinks[0].id}"]`
				);

				await deleteButton.trigger("click");
				await nextTick();
				await nextTick();

				expect(roomInvitationLinkStore.deleteLinks).toHaveBeenCalledWith([
					roomInvitationLinks[0].id,
				]);
			});
		});
	});
});
