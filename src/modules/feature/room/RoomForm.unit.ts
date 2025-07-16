import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { flushPromises, mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import RoomForm from "./RoomForm.vue";
import { RoomColor, RoomCreateParams } from "@/types/room/Room";
import { RoomFeatures } from "@/serverApi/v3";

const mockRoom: RoomCreateParams = {
	name: "A11Y for Beginners",
	color: RoomColor.Magenta,
	startDate: "",
	endDate: "",
	features: [],
};

const emptyMockRoom: RoomCreateParams = {
	name: "",
	color: RoomColor.Magenta,
	startDate: undefined,
	endDate: undefined,
	features: [],
};

const mockRoomWithVideoConference: RoomCreateParams = {
	name: "A11Y for Beginners",
	color: RoomColor.Magenta,
	startDate: "",
	endDate: "",
	features: [RoomFeatures.EditorManageVideoconference],
};

describe("@feature-room/RoomForm", () => {
	const setup = (props: ComponentProps<typeof RoomForm>) => {
		const wrapper = mount(RoomForm, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { DatePicker: true, ConfirmationDialog: true },
			},
			props,
			attachTo: document.body,
		});

		return { wrapper };
	};

	describe("when room name contains < followed by a string", () => {
		const setupRoom = () => {
			return {
				name: "Room 1",
				color: RoomColor.Magenta,
				startDate: "",
				endDate: "",
				features: [],
			};
		};

		it("should show error message", async () => {
			const room = setupRoom();
			const { wrapper } = setup({ room });

			const textField = wrapper.findComponent({ name: "VTextField" });
			const input = textField.find("input");

			await input.setValue("<abc");

			expect(wrapper.text()).toContain("common.validation.containsOpeningTag");
		});
	});

	describe("when save button is clicked", () => {
		describe("when room data is invalid", () => {
			it("should not emit 'save' event", async () => {
				const { wrapper } = setup({ room: emptyMockRoom });

				const saveBtn = wrapper.findComponent(
					"[data-testid='room-form-save-btn']"
				);
				await saveBtn.trigger("click");
				await flushPromises();

				expect(wrapper.emitted("save")).toBeUndefined();
			});
		});

		describe("when room data is valid", () => {
			it("should emit 'save' event", async () => {
				const { wrapper } = setup({ room: mockRoom });

				const saveBtn = wrapper.findComponent(
					"[data-testid='room-form-save-btn']"
				);
				await saveBtn.trigger("click");
				await flushPromises();

				expect(wrapper.emitted("save")).toHaveLength(1);
				expect(wrapper.emitted("save")?.[0][0]).toStrictEqual({
					room: mockRoom,
				});
			});
		});
	});

	describe("when cancel button is clicked", () => {
		describe("when room values were not changed", () => {
			it("should emit cancel", async () => {
				const { wrapper } = setup({ room: mockRoom });

				const cancelButton = wrapper.get(
					'[data-testid="room-form-cancel-btn"]'
				);
				await cancelButton.trigger("click");

				expect(wrapper.emitted("cancel")).toHaveLength(1);
			});
		});

		describe("when room values were changed", () => {
			it("should not directly emit cancel", async () => {
				const { wrapper } = setup({ room: mockRoom });

				const textField = wrapper.findComponent({ name: "VTextField" });
				const input = textField.find("input");

				await input.setValue("New Name");

				expect(wrapper.vm.room.name).toEqual("New Name");

				const cancelButton = wrapper.get(
					'[data-testid="room-form-cancel-btn"]'
				);
				await cancelButton.trigger("click");

				expect(wrapper.emitted("cancel")).toBeUndefined();
			});
		});
	});

	describe("checkbox for video conference feature", () => {
		it("should not check the video conference checkbox if the feature is not enabled", () => {
			const { wrapper } = setup({ room: mockRoom });

			const checkbox = wrapper.get(
				'[data-testid="room-video-conference-checkbox"]'
			);
			expect(checkbox.get("input").element.checked).toBe(false);
		});

		it("should check the video conference checkbox if the feature is enabled", () => {
			const { wrapper } = setup({ room: mockRoomWithVideoConference });

			const checkbox = wrapper.get(
				'[data-testid="room-video-conference-checkbox"]'
			);
			expect(checkbox.get("input").element.checked).toBe(true);
		});
	});
});
