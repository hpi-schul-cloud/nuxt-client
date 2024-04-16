import MediaBoardLine from "./MediaBoardLine.vue";
import { mount } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import MediaBoardLineMenu from "./MediaBoardLineMenu.vue";
import { MediaLineResponse } from "@/serverApi/v3";
import { mediaLineResponseFactory } from "@@/tests/test-utils";
import MediaBoardLineHeader from "./MediaBoardLineHeader.vue";

describe("MediaBoardLine", () => {
	const getWrapper = (
		line: MediaLineResponse = mediaLineResponseFactory.build(),
		index = 0
	) => {
		const wrapper = mount(MediaBoardLine, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					MediaBoardLineMenu: true,
				},
			},
			props: {
				line,
				index,
			},
		});

		return {
			wrapper,
			line,
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

			expect(menu.exists()).toEqual(true);
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
			await header.vm.$emit("update:title", newTitle);

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
			await menu.vm.$emit("delete:line", "deleted");

			expect(wrapper.emitted("delete:line")).toEqual([["deleted"]]);
		});
	});

	describe("when dragging an element to another line", () => {
		it("should emit the update:element-position event", () => {});
	});

	describe("when dragging an element to the available line", () => {});
});
