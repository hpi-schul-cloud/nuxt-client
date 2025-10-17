import InvitationTable from "./InvitationTable.vue";
import { createTestEnvStore, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import { roomInvitationLinkFactory } from "@@/tests/test-utils/factory/room/roomInvitationLinkFactory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { InvitationStep, useRoomInvitationLinkStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { useConfirmationDialog, useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { nextTick, ref } from "vue";
import { useI18n } from "vue-i18n";

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
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
	let askConfirmationMock: Mock;
	let askDeleteConfirmationMock: Mock;
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

		const roomInvitationLinkStore = mockedPiniaStoreTyping(useRoomInvitationLinkStore);

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

			expect(dataTable.props("tableHeaders")!.map((header: { title: string }) => header.title)).toEqual(headers);
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
				expectedMessage: "pages.rooms.members.invitationTable.delete.confirmation",
			},
			{
				description: "multiple links",
				selectedLinks: [roomInvitationLinks[0].id, roomInvitationLinks[1].id],
				expectedMessage: "pages.rooms.members.invitationTable.multipleDelete.confirmation",
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

				expect(roomInvitationLinkStore.deleteLinks).toHaveBeenCalledWith(selectedLinks);
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
				expect(roomInvitationLinkStore.invitationStep).toBe(InvitationStep.PREPARE);

				const shareButton = wrapper.findComponent(`[data-testid="share-button-${roomInvitationLinks[0].id}"]`);
				await shareButton.trigger("click");
				await nextTick();
				const expectedLink = `/rooms/invitation-link/${roomInvitationLinks[0].id}`;

				expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(true);
				expect(roomInvitationLinkStore.invitationStep).toBe(InvitationStep.SHARE);
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
				expect(roomInvitationLinkStore.invitationStep).toBe(InvitationStep.PREPARE);

				const dataTable = wrapper.findComponent({ name: "DataTable" });
				const kebabMenu = dataTable.findComponent(`[data-testid="kebab-menu-${roomInvitationLinks[0].id}"]`);
				await kebabMenu.trigger("click");

				const editButton = wrapper.findComponent(`[data-testid="menu-edit-button-${roomInvitationLinks[0].id}"]`);
				await editButton.trigger("click");
				await nextTick();

				expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(true);
				expect(roomInvitationLinkStore.invitationStep).toBe(InvitationStep.EDIT);
			});
		});

		describe("when menu share button clicked", () => {
			it("should set invitation step to 'share'", async () => {
				const { wrapper, roomInvitationLinkStore } = setup();
				await nextTick();

				expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(false);
				expect(roomInvitationLinkStore.invitationStep).toBe(InvitationStep.PREPARE);

				const dataTable = wrapper.findComponent({ name: "DataTable" });
				const kebabMenu = dataTable.findComponent(`[data-testid="kebab-menu-${roomInvitationLinks[0].id}"]`);
				await kebabMenu.trigger("click");

				const shareButton = wrapper.findComponent(`[data-testid="menu-share-button-${roomInvitationLinks[0].id}"]`);
				await shareButton.trigger("click");
				await nextTick();

				expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(true);
				expect(roomInvitationLinkStore.invitationStep).toBe(InvitationStep.SHARE);
			});
		});

		describe("when menu delete button clicked", () => {
			it("should call deleteLinks with the correct id", async () => {
				askConfirmationMock.mockResolvedValue(true);
				const { wrapper, roomInvitationLinkStore } = setup();
				await nextTick();

				expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(false);
				expect(roomInvitationLinkStore.invitationStep).toBe(InvitationStep.PREPARE);

				const dataTable = wrapper.findComponent({ name: "DataTable" });
				const kebabMenu = dataTable.findComponent(`[data-testid="kebab-menu-${roomInvitationLinks[0].id}"]`);
				await kebabMenu.trigger("click");

				const deleteButton = wrapper.findComponent(`[data-testid="menu-delete-button-${roomInvitationLinks[0].id}"]`);

				await deleteButton.trigger("click");
				await nextTick();
				await nextTick();

				expect(roomInvitationLinkStore.deleteLinks).toHaveBeenCalledWith([roomInvitationLinks[0].id]);
			});
		});
	});

	describe("external persons column", () => {
		it("renders external persons header when feature flag is enabled", async () => {
			setActivePinia(createTestingPinia());
			createTestEnvStore({
				FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: true,
			});
			const { wrapper } = setup();
			const dataTable = wrapper.getComponent({ name: "DataTable" });
			const headers = dataTable.props("tableHeaders").map((header: { title: string }) => header.title);
			const fourthHeader = headers[3];
			expect(fourthHeader).toBe("pages.rooms.members.tableHeader.validForExternalPersons");
		});

		it("does not render external persons header when feature flag is disabled", async () => {
			setActivePinia(createTestingPinia());
			createTestEnvStore({
				FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: false,
			});
			const { wrapper } = setup();
			const dataTable = wrapper.getComponent({ name: "DataTable" });
			const headers = dataTable.props("tableHeaders").map((header: { title: string }) => header.title);
			expect(headers).not.toContain("pages.rooms.members.tableHeader.validForExternalPersons");
		});

		it("displays correct value for external persons column", async () => {
			setActivePinia(createTestingPinia());
			createTestEnvStore({
				FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: false,
			});
			const { wrapper, roomInvitationLinkStore } = setup();
			roomInvitationLinkStore.invitationTableData = [
				{
					id: "test-id",
					title: "Test",
					isUsableByStudents: "yes",
					isUsableByExternalPersons: "yes",
					activeUntil: "2099-12-31",
					isExpired: false,
					status: "active",
					restrictedToCreatorSchool: "school",
					requiresConfirmation: "no",
				},
				{
					id: "test-id-2",
					title: "Test-2",
					isUsableByStudents: "yes",
					isUsableByExternalPersons: "no",
					activeUntil: "2099-12-31",
					isExpired: false,
					status: "active",
					restrictedToCreatorSchool: "school",
					requiresConfirmation: "no",
				},
			];
			await nextTick();
			const dataTable = wrapper.getComponent({ name: "DataTable" });
			const rows = dataTable.props("items");
			expect(rows[0].isUsableByExternalPersons).toBe("yes");
			expect(rows[1].isUsableByExternalPersons).toBe("no");
		});
	});
});
