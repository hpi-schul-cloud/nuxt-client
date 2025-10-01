import { Group, useGroupApi, useGroupState } from "./index";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { mountComposable } from "@@/tests/test-utils";
import { groupFactory } from "@@/tests/test-utils/factory/groupFactory";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import type { Mocked } from "vitest";

vi.mock("@data-group/GroupApi.composable");

describe("GroupState.composable", () => {
	let useGroupApiMock: DeepMocked<ReturnType<typeof useGroupApi>>;
	const notifierModule: Mocked<NotifierModule> = createModuleMocks(NotifierModule);

	beforeEach(() => {
		useGroupApiMock = createMock<ReturnType<typeof useGroupApi>>();

		vi.mocked(useGroupApi).mockReturnValue(useGroupApiMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const getComposable = () => {
		const composable = mountComposable(() => useGroupState(), {
			global: {
				plugins: [createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
		});

		return {
			composable,
		};
	};

	describe("fetchGroup", () => {
		describe("when no data is loaded", () => {
			it("should not have data", async () => {
				const { composable } = getComposable();

				expect(composable.group.value).toBeUndefined();
			});
		});

		describe("when data is loaded", () => {
			const setup = () => {
				const { composable } = getComposable();
				const groupMock: Group = groupFactory.build();

				useGroupApiMock.getGroup.mockResolvedValue(groupMock);

				return {
					groupMock,
					composable,
				};
			};

			it("should call the api to get a group", async () => {
				const { composable } = setup();

				await composable.fetchGroup("groupId");

				expect(useGroupApiMock.getGroup).toHaveBeenCalledWith("groupId");
			});

			it("should set the group in the state", async () => {
				const { composable, groupMock } = setup();

				await composable.fetchGroup("groupId");

				expect(composable.group.value).toEqual(groupMock);
			});
		});

		describe("when an error occurs during loading", () => {
			const setup = () => {
				const { composable } = getComposable();
				const error = new Error("unable to load");

				useGroupApiMock.getGroup.mockRejectedValue(error);

				return {
					error,
					composable,
				};
			};

			it("should show notification", async () => {
				const { composable } = setup();

				await composable.fetchGroup("groupId");

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "error.load",
					status: "error",
				});
			});
		});
	});
});
