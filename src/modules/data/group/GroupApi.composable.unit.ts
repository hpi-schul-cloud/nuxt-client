import * as serverApi from "@/serverApi/v3/api";
import { GroupResponse } from "@/serverApi/v3/api";
import { mockApiResponse } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { groupResponseFactory } from "@@/tests/test-utils/factory/groupResponseFactory";
import { Group, GroupType, GroupUserRole, useGroupApi } from "@data-group";

describe("GroupApi.composable", () => {
	let groupApi: DeepMocked<serverApi.GroupApiInterface>;

	beforeEach(() => {
		groupApi = createMock<serverApi.GroupApiInterface>();

		jest.spyOn(serverApi, "GroupApiFactory").mockReturnValue(groupApi);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getGroup", () => {
		const setup = () => {
			const group: GroupResponse = groupResponseFactory.build();

			groupApi.groupControllerGetGroup.mockResolvedValue(
				mockApiResponse({ data: group })
			);

			return {
				group,
			};
		};

		it("should call the api for groups", async () => {
			setup();

			await useGroupApi().getGroup("groupId");

			expect(groupApi.groupControllerGetGroup).toHaveBeenCalledWith("groupId");
		});

		it("should return a group", async () => {
			const { group } = setup();

			const result: Group = await useGroupApi().getGroup("groupId");

			expect(result).toEqual<Group>({
				id: group.id,
				name: group.name,
				type: GroupType.Class,
				organizationId: group.organizationId,
				users: [
					{
						id: group.users[0].id,
						firstName: group.users[0].firstName,
						lastName: group.users[0].lastName,
						role: GroupUserRole.Student,
					},
				],
				externalSource: group.externalSource,
			});
		});
	});
});
