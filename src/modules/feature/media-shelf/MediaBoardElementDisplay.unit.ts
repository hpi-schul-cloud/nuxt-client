import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { ContentElementBar } from "@ui-board";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import { VImg, VSkeletonLoader } from "vuetify/lib/components/index";
import MediaBoardElementDisplay from "./MediaBoardElementDisplay.vue";

describe("MediaBoardElementDisplay", () => {
	const getWrapper = (
		props: ComponentProps<typeof MediaBoardElementDisplay>
	) => {
		const wrapper = mount(MediaBoardElementDisplay, {
			global: {
				plugins: [createTestingVuetify()],
			},
			props,
		});

		return {
			wrapper,
		};
	};

	describe("when no display data is provided", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				element: undefined,
			});

			return {
				wrapper,
			};
		};

		it("should display a loading state", () => {
			const { wrapper } = setup();

			const loader = wrapper.findComponent(VSkeletonLoader);

			expect(loader.isVisible()).toEqual(true);
		});
	});

	describe("when the display data has a title and description", () => {
		const setup = () => {
			const title = "title";
			const description = "description";

			const { wrapper } = getWrapper({
				element: {
					title,
					description,
				},
			});

			return {
				wrapper,
				title,
				description,
			};
		};

		it("should display the title", () => {
			const { wrapper, title } = setup();

			const contentElementBar = wrapper.findComponent(ContentElementBar);

			expect(contentElementBar.text()).toContain(title);
		});

		it("should display the description", () => {
			const { wrapper, description } = setup();

			const contentElementBar = wrapper.findComponent(ContentElementBar);

			expect(contentElementBar.text()).toContain(description);
		});
	});

	describe("when the display data has a thumbnail", () => {
		const setup = () => {
			const thumbnailUrl = "https://thumbnail.mock.com";
			const { wrapper } = getWrapper({
				element: {
					title: "title",
					thumbnail: thumbnailUrl,
				},
			});

			return {
				wrapper,
				thumbnailUrl,
			};
		};

		it("should display the thumbnail", () => {
			const { wrapper, thumbnailUrl } = setup();

			const thumbnail = wrapper.findComponent<typeof VImg>(
				"[data-testid=media-element-thumbnail]"
			);

			expect(thumbnail.isVisible()).toEqual(true);
			expect(thumbnail.props().src).toEqual(thumbnailUrl);
		});
	});

	describe("when the display data has no thumbnail", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				element: {
					title: "title",
					thumbnail: undefined,
				},
			});

			return {
				wrapper,
			};
		};

		it("should display the default thumbnail", () => {
			const { wrapper } = setup();

			const thumbnail = wrapper.findComponent<typeof VImg>(
				"[data-testid=media-element-default-thumbnail]"
			);

			expect(thumbnail.isVisible()).toEqual(true);
		});
	});
});
