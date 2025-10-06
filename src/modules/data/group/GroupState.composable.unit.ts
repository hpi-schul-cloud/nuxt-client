import { Group, useGroupApi, useGroupState } from "./index";
import { expectNotification, mountComposable } from "@@/tests/test-utils";
import { groupFactory } from "@@/tests/test-utils/factory/groupFactory";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

vi.mock("@data-group/GroupApi.composable");

describe("GroupState.composable", () => {
	let useGroupApiMock: DeepMocked<ReturnType<typeof useGroupApi>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
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
			},
		});

		return {
			composable,
		};
	};

	describe("fetchGroup", () => {
		describe("when no data is loaded", () => {
			it("should not have data", () => {
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

				expectNotification("error");
			});
		});
	});
});
