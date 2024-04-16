import { ComponentProps } from "@/types/vue";
import {
	axiosErrorFactory,
	externalToolDisplayDataFactory,
	mediaExternalToolElementResponseFactory,
} from "@@/tests/test-utils";
import { useContextExternalToolApi } from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { flushPromises, shallowMount } from "@vue/test-utils";
import { MediaElementDisplay } from "./data/types";
import MediaBoardElementDisplay from "./MediaBoardElementDisplay.vue";
import MediaBoardExternalToolElement from "./MediaBoardExternalToolElement.vue";

jest.mock("@data-external-tool");

describe("MediaBoardExternalToolElement", () => {
	let useContextExternalToolApiMock: DeepMocked<
		ReturnType<typeof useContextExternalToolApi>
	>;

	const getWrapper = (
		props: ComponentProps<typeof MediaBoardExternalToolElement>
	) => {
		const wrapper = shallowMount(MediaBoardExternalToolElement, {
			props,
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useContextExternalToolApiMock =
			createMock<ReturnType<typeof useContextExternalToolApi>>();

		jest
			.mocked(useContextExternalToolApi)
			.mockReturnValue(useContextExternalToolApiMock);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when the api returns display data", () => {
		const setup = async () => {
			const externalToolElement =
				mediaExternalToolElementResponseFactory.build();
			const displayDataResponse = externalToolDisplayDataFactory.build({
				name: "name",
				description: "description",
			});

			useContextExternalToolApiMock.fetchDisplayDataCall.mockResolvedValue(
				displayDataResponse
			);

			const { wrapper } = getWrapper({
				element: externalToolElement,
			});

			await flushPromises();

			return {
				wrapper,
				externalToolElement,
				displayDataResponse,
			};
		};

		it("should call the api", async () => {
			const { externalToolElement } = await setup();

			expect(
				useContextExternalToolApiMock.fetchDisplayDataCall
			).toHaveBeenCalledWith(externalToolElement.content.contextExternalToolId);
		});

		it("should map to the display props", async () => {
			const { wrapper, displayDataResponse } = await setup();

			const displayComponent = wrapper.findComponent(MediaBoardElementDisplay);

			expect(displayComponent.props().element).toEqual<MediaElementDisplay>({
				title: displayDataResponse.name,
				description: displayDataResponse.description,
				thumbnail: undefined,
			});
		});
	});

	describe("when the api returns an error", () => {
		const setup = async () => {
			const externalToolElement =
				mediaExternalToolElementResponseFactory.build();
			const error = axiosErrorFactory.build();

			useContextExternalToolApiMock.fetchDisplayDataCall.mockRejectedValue(
				error
			);

			const logger = jest.spyOn(console, "error").mockImplementation();

			const { wrapper } = getWrapper({
				element: externalToolElement,
			});

			await flushPromises();

			return {
				wrapper,
				logger,
				error,
			};
		};

		it("should log the error", async () => {
			const { logger, error } = await setup();

			expect(logger).toHaveBeenCalledWith(error);
		});
	});
});
