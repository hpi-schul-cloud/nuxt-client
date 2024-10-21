import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { groupResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useCourseApi } from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";
import GroupSelectionDialog from "./GroupSelectionDialog.vue";
import StartExistingCourseSyncDialog from "./StartExistingCourseSyncDialog.vue";

vi.mock("@data-room");

describe("StartExistingCourseSyncDialog", () => {
	let courseApiMock: DeepMocked<ReturnType<typeof useCourseApi>>;

	const getWrapper = (
		props: ComponentProps<typeof StartExistingCourseSyncDialog> = {
			isOpen: true,
			courseId: "courseId",
			courseName: "courseName",
		}
	) => {
		const notifierModule = createModuleMocks(NotifierModule);

		const wrapper = mount(StartExistingCourseSyncDialog, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					vueDompurifyHTMLPlugin,
				],
				stubs: {
					GroupSelectionDialog: true,
				},
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
			props,
		});

		return {
			wrapper,
			notifierModule,
		};
	};

	beforeEach(() => {
		courseApiMock = createMock<ReturnType<typeof useCourseApi>>();

		vi.mocked(useCourseApi).mockReturnValue(courseApiMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when the dialog is open", () => {
		it("should open the group dialog", () => {
			const { wrapper } = getWrapper({ isOpen: true });

			const groupSelectionDialog = wrapper.getComponent(GroupSelectionDialog);

			expect(groupSelectionDialog.props().isOpen).toEqual(true);
		});
	});

	describe("when the dialog is closed", () => {
		it("should close the all dialogs", () => {
			const { wrapper } = getWrapper({ isOpen: false });

			const groupSelectionDialog = wrapper.getComponent(GroupSelectionDialog);
			const confirmationDialog = wrapper.getComponent<typeof vCustomDialog>({
				ref: "start-existing-course-sync-dialog",
			});

			expect(groupSelectionDialog.props().isOpen).toEqual(false);
			expect(confirmationDialog.props().isOpen).toEqual(false);
			expect(wrapper.vm.step).toEqual(0);
		});
	});

	describe("when confirming the group selection dialog", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			const group = groupResponseFactory.build();

			return {
				wrapper,
				group,
			};
		};

		it("should open the confirmation dialog", async () => {
			const { wrapper, group } = setup();

			wrapper.getComponent(GroupSelectionDialog).vm.$emit("confirm", group);
			await nextTick();

			const groupSelectionDialog = wrapper.getComponent(GroupSelectionDialog);
			const confirmationDialog = wrapper.getComponent<typeof vCustomDialog>({
				ref: "start-existing-course-sync-dialog",
			});

			expect(groupSelectionDialog.props().isOpen).toEqual(false);
			expect(confirmationDialog.props().isOpen).toEqual(true);
		});
	});

	describe("when confirming the confirm dialog", () => {
		const setup = async () => {
			const { wrapper, notifierModule } = getWrapper();

			const group = groupResponseFactory.build();

			wrapper.getComponent(GroupSelectionDialog).vm.$emit("confirm", group);
			await nextTick();

			const confirmationDialog = wrapper.getComponent<typeof vCustomDialog>({
				ref: "start-existing-course-sync-dialog",
			});
			const confirmBtn = confirmationDialog.findComponent(
				"[data-testid=dialog-confirm]"
			);
			await confirmBtn.trigger("click");

			return {
				wrapper,
				notifierModule,
				group,
			};
		};

		it("should close the dialog", async () => {
			const { wrapper } = await setup();

			expect(wrapper.vm.isOpen).toEqual(false);
			expect(wrapper.emitted("update:isOpen")).toBeDefined();
		});

		it("should call the api", async () => {
			const { group } = await setup();

			expect(courseApiMock.startSynchronization).toHaveBeenCalledWith(
				"courseId",
				group.id
			);
		});

		it("should show a success notification", async () => {
			const { notifierModule } = await setup();

			expect(notifierModule.show).toHaveBeenCalledWith({
				text: "feature-course-sync.StartExistingCourseSyncDialog.success",
				status: "success",
			});
		});

		it("should emit a success event", async () => {
			const { wrapper } = await setup();

			expect(wrapper.emitted("success")).toBeDefined();
		});
	});

	describe("when starting the sync fails", () => {
		const setup = async () => {
			const { wrapper, notifierModule } = getWrapper();

			courseApiMock.startSynchronization.mockRejectedValueOnce(new Error());

			const group = groupResponseFactory.build();

			wrapper.getComponent(GroupSelectionDialog).vm.$emit("confirm", group);
			await nextTick();

			const confirmationDialog = wrapper.getComponent<typeof vCustomDialog>({
				ref: "start-existing-course-sync-dialog",
			});
			const confirmBtn = confirmationDialog.findComponent(
				"[data-testid=dialog-confirm]"
			);
			await confirmBtn.trigger("click");

			return {
				wrapper,
				notifierModule,
				group,
			};
		};

		it("should show an error notification", async () => {
			const { notifierModule } = await setup();

			expect(notifierModule.show).toHaveBeenCalledWith({
				text: "common.notification.error",
				status: "error",
			});
		});

		it("should not emit a success event", async () => {
			const { wrapper } = await setup();

			expect(wrapper.emitted("success")).toBeUndefined();
		});
	});

	describe("when data is missing on confirming the group", () => {
		const setup = async () => {
			const { wrapper, notifierModule } = getWrapper({
				isOpen: true,
			});

			wrapper.getComponent(GroupSelectionDialog).vm.$emit("confirm", undefined);
			await nextTick();

			const confirmationDialog = wrapper.getComponent<typeof vCustomDialog>({
				ref: "start-existing-course-sync-dialog",
			});
			const confirmBtn = confirmationDialog.findComponent(
				"[data-testid=dialog-confirm]"
			);
			await confirmBtn.trigger("click");

			return {
				wrapper,
				notifierModule,
			};
		};

		it("should show an error notification", async () => {
			const { notifierModule } = await setup();

			expect(notifierModule.show).toHaveBeenCalledWith({
				text: "common.notification.error",
				status: "error",
			});
		});

		it("should not emit a success event", async () => {
			const { wrapper } = await setup();

			expect(wrapper.emitted("success")).toBeUndefined();
		});
	});
});
