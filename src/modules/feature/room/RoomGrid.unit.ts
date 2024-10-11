import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import RoomGrid from "./RoomGrid.vue";

describe("@feature-room/RoomGrid", () => {
	const setup = (props?: ComponentProps<typeof RoomGrid>) => {
		const wrapper = mount(RoomGrid, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		return { wrapper };
	};

	it.todo("should render loading state when rooms are loading");

	it.todo("should render empty state when no rooms were found");

	it.todo("should render tiles for each room");
});
