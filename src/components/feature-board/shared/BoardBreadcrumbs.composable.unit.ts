import { Wrapper, shallowMount } from "@vue/test-utils";
import {
	useBoardBreadcrumbs,
	setBoardBreadcrumbs,
} from "./BoardBreadcrumbs.composable";
import Vue, { defineComponent, provide } from "vue";
import { I18N_KEY } from "@/utils/inject";

let wrapper: Wrapper<Vue>;

const mountComposable = (
	composable: () => unknown,
	providers: Record<string | symbol, unknown> = {}
) => {
	const ParentComponent = defineComponent({
		setup() {
			for (const [key, mockFn] of Object.entries(providers)) {
				provide(key, mockFn);
			}
		},
		provide: providers,
	});

	const TestComponent = {
		template: "<div></div>",
	};

	wrapper = shallowMount(TestComponent, {
		setup() {
			const result = composable();
			return { result };
		},
		parentComponent: ParentComponent,
	});
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return wrapper.vm.result;
};

describe("BoardBreadcrumbs.composable", () => {
	it("should generate breadcrumb list", () => {
		const courseBreadCrumbsData = {
			courseName: "Mathe",
			courseUrl: "/test-url",
			boardName: "Board",
		};
		setBoardBreadcrumbs(
			courseBreadCrumbsData.courseName,
			courseBreadCrumbsData.courseUrl,
			courseBreadCrumbsData.boardName
		);
		const breadcrumbList = mountComposable(() => useBoardBreadcrumbs(), {
			[I18N_KEY as symbol]: { t: (key: string) => key },
		});
		expect(breadcrumbList.length).toBe(2);
		expect(breadcrumbList[0].text).toStrictEqual(
			courseBreadCrumbsData.courseName
		);
		expect(breadcrumbList[0].to).toStrictEqual(courseBreadCrumbsData.courseUrl);
		expect(breadcrumbList[1].text).toStrictEqual(
			courseBreadCrumbsData.boardName
		);
		expect(breadcrumbList[1].disabled).toBe(true);
	});
});
