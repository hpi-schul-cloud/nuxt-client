import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import Vue from "vue";
import RoomExternalToolCard from "./RoomExternalToolCard.vue";
import { I18N_KEY } from "@/utils/inject";

describe("RoomVideoConferenceCard", () => {
	const getWrapper = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper: Wrapper<Vue> = mount(
			RoomExternalToolCard as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
					mocks: {
						$t: (key: string): string => key,
					},
				}),
				propsData: {},
				provide: {
					[I18N_KEY as symbol]: {
						$t: (key: string): string => key,
						tc: (key: string): string => key,
					},
				},
			}
		);

		return wrapper;
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when ???", () => {
		const setup = () => {
			const wrapper = getWrapper();

			return {
				wrapper,
			};
		};

		it("should ???", () => {
			setup();

			expect(true).toBe(true);
		});
	});
});
