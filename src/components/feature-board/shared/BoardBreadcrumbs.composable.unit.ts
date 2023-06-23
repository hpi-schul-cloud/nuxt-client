import { I18N_KEY } from "@/utils/inject";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { createMock } from "@golevelup/ts-jest";
import * as axios from "axios";
import * as serverApi from "../../../serverApi/v3/api";
import {
	AncestorEntityType,
	AncestorListApiInterface,
	AncestorResponseTypeEnum,
} from "../../../serverApi/v3/api";
import { useSharedBoardBreadcrumbs } from "./BoardBreadcrumbs.composable";

const mockApiFunction = (values: Partial<axios.AxiosResponse>) => {
	return jest.fn(async () => mockAxiosResponse(values));
};

const mockAxiosResponse = (values: Partial<axios.AxiosResponse>) => {
	const response = {
		data: [],
		status: 200,
		statusText: "",
		headers: createMock<axios.AxiosResponseHeaders>(),
		config: { headers: createMock<axios.AxiosHeaders>() },
		...values,
	};
	return response;
};

/**
 * hint: this is difficult to test, as we are testing a shared composable (and all mocked return values need to be set before mounting the composable... but the composable is a singleton... due to being a shared composable...)
 */
describe("BoardBreadcrumbs.composable", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when course is provided", () => {
		it.only("should return the course- and course-overview- page", async () => {
			const mockAncestorListApi: AncestorListApiInterface = {
				ancestorListControllerGetAncestorsOf: mockApiFunction({
					data: [
						{
							text: "myCourse",
							id: "courseId",
							type: AncestorResponseTypeEnum.Course,
						},
						{
							text: "myColumnBoard",
							id: "columnId",
							type: AncestorResponseTypeEnum.Columnboard,
						},
					],
				}),
			};

			jest
				.spyOn(serverApi, "AncestorListApiFactory")
				.mockReturnValueOnce(mockAncestorListApi);

			const { createBreadcrumbsFor, breadcrumbs } = mountComposable(
				() => useSharedBoardBreadcrumbs(),
				{
					[I18N_KEY as symbol]: { t: (key: string) => key },
				}
			);
			const fakeId = "abc123";

			await createBreadcrumbsFor(fakeId, AncestorEntityType.Columnboard);

			expect(breadcrumbs.value).toHaveLength(2);
		});
	});
});
