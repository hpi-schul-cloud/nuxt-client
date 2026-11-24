import RoomGroupDeleteDialog from "./RoomGroupDeleteDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { VCheckbox } from "vuetify/components";

describe("RoomGroupDeleteDialog", () => {
	let wrapper: ReturnType<typeof mount<typeof RoomGroupDeleteDialog>> | undefined;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		wrapper?.unmount();
	});

	const setup = (isDeleting = false) => {
		wrapper = mount(RoomGroupDeleteDialog, {
			props: { modelValue: true, groupName: "Informatik", isDeleting },
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { UseFocusTrap: true },
			},
			attachTo: document.body,
		});
		return wrapper;
	};

	const click = (testId: string) => document.querySelector<HTMLElement>(`[data-testid='${testId}']`)?.click();

	it("explains that the rooms are kept and moved to the ungrouped section", () => {
		setup();

		expect(document.querySelector("[data-testid='room-group-delete-dialog']")?.textContent).toContain(
			"pages.rooms.groups.deleteDialog.text"
		);
	});

	it("confirms without opting out by default", () => {
		setup();
		click("room-group-delete-confirm");

		expect(wrapper?.emitted("confirm")).toEqual([[false]]);
	});

	it("passes the opt-out choice with the confirmation", async () => {
		setup();
		await wrapper?.findComponent(VCheckbox).setValue(true);
		click("room-group-delete-confirm");

		expect(wrapper?.emitted("confirm")).toEqual([[true]]);
	});

	it("cancels without confirming", () => {
		setup();
		click("room-group-delete-cancel");

		expect(wrapper?.emitted("cancel")).toHaveLength(1);
		expect(wrapper?.emitted("confirm")).toBeUndefined();
	});

	it("resets the opt-out checkbox when reopened", async () => {
		setup();
		await wrapper?.findComponent(VCheckbox).setValue(true);
		await wrapper?.setProps({ modelValue: false });
		await wrapper?.setProps({ modelValue: true });

		expect(wrapper?.findComponent(VCheckbox).props("modelValue")).toBe(false);
	});

	describe("room count", () => {
		const mountWithCount = (roomCount: number) => {
			wrapper = mount(RoomGroupDeleteDialog, {
				props: { modelValue: true, groupName: "Informatik", roomCount },
				global: { plugins: [createTestingVuetify(), createTestingI18n()], stubs: { UseFocusTrap: true } },
				attachTo: document.body,
			});
		};
		const text = () => document.querySelector("[data-testid='room-group-delete-text']")?.textContent ?? "";

		it("mentions that the rooms of the group are kept", () => {
			mountWithCount(2);

			expect(text()).toBe("pages.rooms.groups.deleteDialog.text");
		});

		it("states that an empty group moves no rooms", () => {
			mountWithCount(0);

			expect(text()).toBe("pages.rooms.groups.deleteDialog.textEmpty");
		});
	});
});
