import RoomMoveDialog from "./RoomMoveDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { setActivePinia } from "pinia";
import { VRadio, VRadioGroup } from "vuetify/components";

describe("RoomMoveDialog", () => {
	let wrapper: ReturnType<typeof mount<typeof RoomMoveDialog>> | undefined;

	const targets = [
		{ key: "ungrouped", label: "Nicht gruppiert", testId: "room-move-target-ungrouped" },
		{ key: "group-a", label: "Informatik", testId: "room-move-target-0" },
		{ key: "group-b", label: "Deutsch", testId: "room-move-target-1" },
	];

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		wrapper?.unmount();
	});

	const setup = () => {
		wrapper = mount(RoomMoveDialog, {
			props: { modelValue: true, roomName: "Mathe", targets, currentKey: "group-a" },
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { UseFocusTrap: true },
			},
			attachTo: document.body,
		});
		return wrapper;
	};

	it("lists the ungrouped section and all groups", () => {
		setup();

		const testIds = wrapper?.findAllComponents(VRadio).map((radio) => radio.attributes("data-testid"));
		expect(testIds).toEqual(["room-move-target-ungrouped", "room-move-target-0", "room-move-target-1"]);
	});

	it("marks and disables the current location", () => {
		setup();

		const current = wrapper?.findAllComponents(VRadio)[1];
		expect(current?.props("disabled")).toBe(true);
		expect(current?.props("label")).toBe("pages.rooms.groups.moveDialog.current");
	});

	it("does not allow confirming without a new target", () => {
		setup();

		expect(wrapper?.findComponent(SvsDialog).props("confirmBtnDisabled")).toBe(true);
		wrapper?.findComponent(SvsDialog).vm.$emit("confirm");
		expect(wrapper?.emitted("confirm")).toBeUndefined();
	});

	it("emits the selected target", async () => {
		setup();
		await wrapper?.findComponent(VRadioGroup).setValue("ungrouped");
		wrapper?.findComponent(SvsDialog).vm.$emit("confirm");

		expect(wrapper?.emitted("confirm")).toEqual([["ungrouped"]]);
	});
});
