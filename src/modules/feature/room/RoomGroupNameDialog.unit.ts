import RoomGroupNameDialog from "./RoomGroupNameDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomGroupNameErrorReason } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { VTextField } from "vuetify/components";

describe("RoomGroupNameDialog", () => {
	let wrapper: ReturnType<typeof mount<typeof RoomGroupNameDialog>> | undefined;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		wrapper?.unmount();
	});

	const setup = (
		props: Partial<{
			mode: "create" | "rename";
			initialName: string;
			groupId: string;
			isSaving: boolean;
			serverError: RoomGroupNameErrorReason;
		}> = {}
	) => {
		wrapper = mount(RoomGroupNameDialog, {
			props: {
				modelValue: true,
				mode: "create",
				existingGroups: [{ id: "group-1", name: "Informatik" }],
				...props,
			},
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { UseFocusTrap: true },
			},
			attachTo: document.body,
		});
		return wrapper;
	};

	const typeName = async (value: string) => {
		const field = wrapper?.findComponent(VTextField);
		await field?.setValue(value);
		await nextTick();
	};

	const messages = () => document.querySelector("[data-testid='room-group-name-input'] .v-messages")?.textContent ?? "";

	const confirm = () => wrapper?.findComponent(SvsDialog).vm.$emit("confirm");

	it("renders the input with a counter limited to 100 code points", async () => {
		setup();
		await typeName("😀".repeat(3));

		const field = wrapper?.findComponent(VTextField);
		expect(field?.props("counter")).toBe(100);
		expect(document.querySelector("[data-testid='room-group-name-input'] .v-counter")?.textContent).toContain(
			"3 / 100"
		);
	});

	it("focuses the input when opened", () => {
		setup();

		expect(wrapper?.findComponent(VTextField).props("autofocus")).toBe(true);
	});

	it.each([
		{ input: "   ", key: "pages.rooms.groups.validation.REQUIRED" },
		{ input: "a".repeat(101), key: "pages.rooms.groups.validation.TOO_LONG" },
		{ input: "Mathe\n6a", key: "pages.rooms.groups.validation.INVALID_CHARACTERS" },
		{ input: " INFORMATIK ", key: "pages.rooms.groups.validation.DUPLICATE" },
	])("shows the local validation error for $input and does not submit", async ({ input, key }) => {
		setup();
		await typeName(input);
		confirm();
		await nextTick();

		expect(messages()).toContain(key);
		expect(wrapper?.emitted("submit")).toBeUndefined();
	});

	it("emits the normalized name on submit", async () => {
		setup();
		await typeName("  Deutsch  ");
		confirm();

		expect(wrapper?.emitted("submit")).toEqual([["Deutsch"]]);
	});

	it("allows keeping the own name when renaming", async () => {
		setup({ mode: "rename", initialName: "Informatik", groupId: "group-1" });
		await typeName("informatik");
		confirm();

		expect(wrapper?.emitted("submit")).toEqual([["informatik"]]);
	});

	it("prefills the current name when renaming", () => {
		setup({ mode: "rename", initialName: "Informatik", groupId: "group-1" });

		expect(wrapper?.findComponent(VTextField).props("modelValue")).toBe("Informatik");
	});

	it("shows a server error inline and keeps the input", async () => {
		setup();
		await typeName("Mathe");
		await wrapper?.setProps({ serverError: "DUPLICATE" });

		expect(messages()).toContain("pages.rooms.groups.validation.DUPLICATE");
		expect(wrapper?.findComponent(VTextField).props("modelValue")).toBe("Mathe");
		expect(wrapper?.props("modelValue")).toBe(true);
	});

	it("asks to clear the server error when the input changes", async () => {
		setup({ serverError: "TOO_LONG" });
		await typeName("Mathe");

		expect(wrapper?.emitted("clear-server-error")).toHaveLength(1);
	});

	it("does not close itself on confirm so a failed save keeps it open", async () => {
		setup();
		await typeName("Mathe");
		confirm();
		await nextTick();

		expect(wrapper?.emitted("update:modelValue")).toBeUndefined();
	});

	it("disables actions and ignores submits while saving", async () => {
		setup({ isSaving: true });
		await typeName("Mathe");
		confirm();

		expect(wrapper?.findComponent(SvsDialog).props("areActionsDisabled")).toBe(true);
		expect(wrapper?.emitted("submit")).toBeUndefined();
	});
});
