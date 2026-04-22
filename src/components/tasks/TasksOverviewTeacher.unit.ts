import TasksOverviewList from "./TasksOverviewList.vue";
import TasksOverviewTeacher from "./TasksOverviewTeacher.vue";
import CopyModule, { CopyParamsTypeEnum } from "@/store/copy";
import ShareModule from "@/store/share";
import { COPY_MODULE_KEY, SHARE_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeAll } from "vitest";

describe("TasksOverviewTeacher", () => {
	// TODO: WRITE TASK TESTS

	let copyModuleMock: CopyModule;
	let shareModuleMock: ShareModule;

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	const mountComponent = (attrs = {}) =>
		mount(TasksOverviewTeacher, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
					[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
				},
			},
			...attrs,
		});

	beforeEach(() => {
		copyModuleMock = createModuleMocks(CopyModule, {
			getIsResultModalOpen: false,
		});
		shareModuleMock = createModuleMocks(ShareModule, {
			getIsShareModalOpen: false,
		});
	});

	it("should handle copy-task event", () => {
		const wrapper = mountComponent();

		const oneTasksList = wrapper.findComponent(TasksOverviewList);
		const payload = {
			id: "123",
			courseId: "c789",
			type: CopyParamsTypeEnum.Task,
		};
		oneTasksList.vm.$emit("copy-task", payload);

		expect(copyModuleMock.copy).toHaveBeenCalledWith(payload);
	});
});
