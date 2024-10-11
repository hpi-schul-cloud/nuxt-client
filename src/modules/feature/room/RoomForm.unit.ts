import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import RoomForm from "./RoomForm.vue";

describe("@feature-room/RoomForm", () => {
	const setup = (props?: ComponentProps<typeof RoomForm>) => {
		const wrapper = mount(RoomForm, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		return { wrapper };
	};

	it.todo("should not save invalid room");

	it.todo("should emit save if room is valid");

	it.todo("should show cancel dialog when room values were changed");

	it.todo("should not show cancel dialog when form was not touched");
});
