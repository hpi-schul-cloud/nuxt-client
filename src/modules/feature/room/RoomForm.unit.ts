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
};

const invalidMockRoom: RoomCreateParams = {
	name: "",
	color: RoomColor.Magenta,
};

describe("@feature-room/RoomForm", () => {
	const setup = (props: ComponentProps<typeof RoomForm>) => {
		const wrapper = mount(RoomForm, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
			attachTo: document.body,
		});

		return { wrapper };
	};

	it("should not save invalid room", async () => {
		const { wrapper } = setup({ room: invalidMockRoom });

		// validation needs to be triggered manually due to code structure
		await wrapper.vm.v$.$validate();

		await wrapper.find("[type='submit']").trigger("click");
		await nextTick();

		expect(wrapper.vm.v$.$invalid).toEqual(true);
		expect(wrapper.emitted("save")).toBeUndefined();
	});

	it("should emit save if room is valid", async () => {
		const { wrapper } = setup({ room: mockRoom });

		// validation needs to be triggered manually due to code structure
		await wrapper.vm.v$.$validate();

		await wrapper.find("[type='submit']").trigger("click");
		await nextTick();

		expect(wrapper.vm.v$.$invalid).toEqual(false);
		expect(wrapper.emitted("save")).toHaveLength(1);
	});

	it("should not directly emit cancel when room values were changed", async () => {
		const { wrapper } = setup({ room: mockRoom });

		const textField = wrapper.findComponent({ name: "VTextField" });
		const input = textField.find("input");

		input.setValue("New Name");
		await nextTick();

		const cancelButton = wrapper.get('[data-testId="room-form-cancel-btn"]');
		await cancelButton.trigger("click");

		expect(wrapper.vm.v$.$anyDirty).toEqual(true);
		expect(wrapper.emitted("cancel")).toBeUndefined();
	});

	it("should emit cancel when room values were not touched", async () => {
		const { wrapper } = setup({ room: mockRoom });

		const cancelButton = wrapper.get('[data-testId="room-form-cancel-btn"]');
		await cancelButton.trigger("click");

		expect(wrapper.vm.v$.$anyDirty).toEqual(false);
		expect(wrapper.emitted("cancel")).toHaveLength(1);
	});
});
