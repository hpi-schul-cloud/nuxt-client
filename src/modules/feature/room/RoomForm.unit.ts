import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import RoomForm from "./RoomForm.vue";
import { RoomCreateParams } from "@/types/room/Room";
import { RoomColor } from "@/serverApi/v3";
import { nextTick } from "vue";

const mockRoom: RoomCreateParams = {
	name: "A11Y for Beginners",
	color: RoomColor.Magenta,
	startDate: "",
	endDate: "",
};

const invalidMockRoom: RoomCreateParams = {
	name: "",
	color: RoomColor.Magenta,
};

const emptyMockRoom: RoomCreateParams = {
	name: "",
	color: RoomColor.Magenta,
	startDate: undefined,
	endDate: undefined,
};

describe("@feature-room/RoomForm", () => {
	const setup = (props: ComponentProps<typeof RoomForm>) => {
		const wrapper = mount(RoomForm, {
			sync: false,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
			attachTo: document.body,
		});

		return { wrapper };
	};

	describe("when save button is clicked", () => {
		describe("when room data is invalid", () => {
			it("should not emit 'save' event", async () => {
				const { wrapper } = setup({ room: emptyMockRoom });

				const saveBtn = wrapper.findComponent(
					"[data-testid='room-form-save-btn']"
				);
				await saveBtn.trigger("click");
				await nextTick();

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
				await nextTick();
				await nextTick();

				expect(wrapper.emitted("save")).toHaveLength(1);
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
					'[data-testId="room-form-cancel-btn"]'
				);
				await cancelButton.trigger("click");

				expect(wrapper.emitted("cancel")).toBeUndefined();
			});
		});
	});
});
