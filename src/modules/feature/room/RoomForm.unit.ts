import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { flushPromises, mount, VueWrapper } from "@vue/test-utils";
import RoomForm from "./RoomForm.vue";
import { RoomColor, RoomCreateParams } from "@/types/room/Room";
import { RoomFeatures } from "@/serverApi/v3";
import { roomFactory } from "@@/tests/test-utils";
import { VTextField } from "vuetify/components";
import { nextTick } from "vue";

describe("@feature-room/RoomForm", () => {
	let wrapper: VueWrapper<InstanceType<typeof RoomForm>>;

	const setup = (roomOverrides: Partial<RoomCreateParams> = {}) => {
		const defaultRoom: RoomCreateParams = {
			name: "A11Y for Beginners",
			color: RoomColor.Magenta,
			startDate: "",
			endDate: "",
			features: [],
		};
		const room = roomFactory.build({
			...defaultRoom,
			...roomOverrides,
		});

		wrapper = mount(RoomForm, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { ConfirmationDialog: true },
			},
			props: { room },
			attachTo: document.body,
		});
		return { wrapper, room };
	};

	afterEach(() => {
		// needed because of attachTo to remove the component from the DOM
		// and ensure a clean state for subsequent tests.
		// More Details: https://test-utils.vuejs.org/api/#attachTo
		wrapper.unmount();
	});

	describe("room name validation", () => {
		it("should show error when name is empty", async () => {
			const { wrapper } = setup();

			const textField = wrapper.getComponent(VTextField);

			// needed to trigger validation for empty value correctly
			await textField.setValue("valid input");
			await textField.setValue("");
			await textField.trigger("blur");

			expect(textField.text()).toContain("common.validation.nonEmptyString");
		});

		it("should show error message when name contains < followed by a string", async () => {
			const { wrapper } = setup();

			const textField = wrapper.getComponent(VTextField);
			await textField.setValue("<abc");
			await textField.trigger("blur");

			expect(textField.text()).toContain(
				"common.validation.containsOpeningTag"
			);
		});

		it("should show error when name exceeds max length", async () => {
			const { wrapper } = setup();
			await nextTick();

			const exceedsMaxLengthName = "a".repeat(101);

			const textField = wrapper.getComponent(VTextField);
			await textField.setValue(exceedsMaxLengthName);
			await textField.trigger("blur");

			expect(textField.text()).toContain("common.validation.tooLong");
		});
	});

	describe("when save button is clicked", () => {
		describe("when room data is invalid", () => {
			it("should not emit 'save' event", async () => {
				const { wrapper } = setup({ name: "" });

				const saveBtn = wrapper.findComponent(
					"[data-testid='room-form-save-btn']"
				);
				await saveBtn.trigger("click");
				await flushPromises();

				expect(wrapper.emitted("save")).toBeUndefined();
			});

			it("should focus first invalid form field", async () => {
				const { wrapper } = setup();

				const textField = wrapper.getComponent(VTextField);
				const invalidInput = textField.find("input");
				await textField.setValue(" ");

				expect(document.activeElement).not.toEqual(invalidInput.element);

				const saveBtn = wrapper.getComponent(
					"[data-testid='room-form-save-btn']"
				);
				await saveBtn.trigger("click");
				await flushPromises();

				expect(document.activeElement).toEqual(invalidInput.element);
			});
		});

		describe("when room data is valid", () => {
			it("should emit 'save' event", async () => {
				const { room, wrapper } = setup();

				const saveBtn = wrapper.getComponent(
					"[data-testid='room-form-save-btn']"
				);
				await saveBtn.trigger("click");
				await flushPromises();

				expect(wrapper.emitted("save")).toHaveLength(1);
				expect(wrapper.emitted("save")?.[0][0]).toStrictEqual({
					room,
				});
			});
		});
	});

	describe("when cancel button is clicked", () => {
		describe("when room values were not changed", () => {
			it("should emit cancel", async () => {
				const { wrapper } = setup();

				const cancelButton = wrapper.get(
					'[data-testid="room-form-cancel-btn"]'
				);
				await cancelButton.trigger("click");

				expect(wrapper.emitted("cancel")).toHaveLength(1);
			});
		});

		describe("when room values were changed", () => {
			it("should not directly emit cancel", async () => {
				const { wrapper } = setup();

				const textField = wrapper.getComponent(VTextField);
				const input = textField.find("input");

				await input.setValue("New Name");

				expect(textField.props().modelValue).toEqual("New Name");

				const cancelButton = wrapper.get(
					'[data-testid="room-form-cancel-btn"]'
				);
				await cancelButton.trigger("click");

				expect(wrapper.emitted("cancel")).toBeUndefined();
			});
		});
	});

	describe("checkbox for video conference feature", () => {
		it("should render the checkbox", () => {
			const { wrapper } = setup();
			const checkbox = wrapper.find(
				'[data-testid="room-video-conference-checkbox"]'
			);
			expect(checkbox.exists()).toBe(true);
			expect(checkbox.text()).toContain(
				"components.roomForm.labels.videoConference.label"
			);
			expect(checkbox.text()).toContain(
				"components.roomForm.labels.videoConference.helperText"
			);
		});

		it("should not check the video conference checkbox if the feature is not enabled", () => {
			const { wrapper } = setup();

			const checkbox = wrapper.get(
				'[data-testid="room-video-conference-checkbox"]'
			);
			expect(checkbox.get("input").element.checked).toBe(false);
		});

		it("should check the video conference checkbox if the feature is enabled", () => {
			const { wrapper } = setup({
				features: [RoomFeatures.EditorManageVideoconference],
			});

			const checkbox = wrapper.get(
				'[data-testid="room-video-conference-checkbox"]'
			);
			expect(checkbox.get("input").element.checked).toBe(true);
		});

		it("should add video conference feature", async () => {
			const { room, wrapper } = setup();

			const checkbox = wrapper.getComponent(
				'[data-testid="room-video-conference-checkbox"]'
			);
			await checkbox.setValue(true);

			expect(room.features).toEqual([RoomFeatures.EditorManageVideoconference]);
		});

		it("should remove video conference feature", async () => {
			const { room, wrapper } = setup({
				features: [RoomFeatures.EditorManageVideoconference],
			});

			const checkbox = wrapper.getComponent(
				'[data-testid="room-video-conference-checkbox"]'
			);
			await checkbox.setValue(false);

			expect(room.features).toEqual([]);
		});
	});
});
