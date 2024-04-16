import { ComponentProps } from "@/types/vue";
import { mediaLineResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { useMediaQuery } from "@vueuse/core";
import { nextTick, ref } from "vue";
import MediaBoardLine from "./MediaBoardLine.vue";
import MediaBoardLineHeader from "./MediaBoardLineHeader.vue";
import MediaBoardLineMenu from "./MediaBoardLineMenu.vue";

jest.mock("@vueuse/core", () => {
	return {
		...jest.requireActual("@vueuse/core"),
		useMediaQuery: jest.fn(),
	};
});

jest.mocked(useMediaQuery).mockReturnValue(ref(true));

describe("MediaBoardLine", () => {
	const getWrapper = (
		props: ComponentProps<typeof MediaBoardLine> = {
			line: mediaLineResponseFactory.build(),
			index: 0,
		}
	) => {
		const wrapper = mount(MediaBoardLine, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					MediaBoardLineMenu: true,
				},
			},
			props,
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when rendering the line", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should render the line", () => {
			const { wrapper } = setup();

			const line = wrapper.findComponent(MediaBoardLine);

			expect(line.exists()).toEqual(true);
		});
	});

	describe("when opening the menu", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should have a menu", async () => {
			const { wrapper } = setup();

			const menu = wrapper.findComponent(MediaBoardLineMenu);

			expect(menu.isVisible()).toEqual(true);
		});
	});

	describe("when updating a line title", () => {
		const setup = () => {
			const { wrapper } = getWrapper();
			const newTitle = "new title";

			return {
				wrapper,
				newTitle,
			};
		};

		it("should emit the update:line-title event", async () => {
			const { wrapper, newTitle } = setup();

			const header = wrapper.findComponent(MediaBoardLineHeader);
			header.vm.$emit("update:title", newTitle);
			await nextTick();

			expect(wrapper.emitted("update:line-title")).toEqual([[newTitle]]);
		});
	});

	describe("when deleting a line", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should emit the delete:line event", async () => {
			const { wrapper } = setup();

			const menu = wrapper.findComponent(MediaBoardLineMenu);
			menu.vm.$emit("delete:line", "lineId");
			await nextTick();

			expect(wrapper.emitted("delete:line")).toEqual([["lineId"]]);
		});
	});

	describe("when dragging an element to another line", () => {
		it("should emit the update:element-position event", () => {
			// TODO
		});
	});

	describe("when dragging an element to the available line", () => {
		// TODO
	});
});
