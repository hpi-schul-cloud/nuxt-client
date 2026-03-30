import { UserLoginMigrationMapper } from "./userLoginMigration.mapper";
import { userLoginMigrationResponseFactory } from "@@/tests/test-utils";

describe("UserLoginMigrationMapper", () => {
	describe("mapToDate", () => {
		describe("when apiDateString is undefined", () => {
			it("should return undefined", () => {
				const result = UserLoginMigrationMapper.mapToDate(undefined);

				expect(result).toBeUndefined();
			});
		});

		describe("when apiDateString is a valid date string", () => {
			it("should return a Date object", () => {
				const dateString = "2024-01-15T10:30:00.000Z";

				const result = UserLoginMigrationMapper.mapToDate(dateString);

				expect(result).toBeInstanceOf(Date);
				expect(result?.toISOString()).toBe(dateString);
			});
		});
	});

	describe("mapToUserLoginMigration", () => {
		describe("when all fields are provided", () => {
			const setup = () => {
				const startedAt = "2024-01-01T00:00:00.000Z";
				const closedAt = "2024-02-01T00:00:00.000Z";
				const finishedAt = "2024-03-01T00:00:00.000Z";
				const mandatorySince = "2024-01-15T00:00:00.000Z";

				const response = userLoginMigrationResponseFactory.build({
					sourceSystemId: "source-system-id",
					targetSystemId: "target-system-id",
					startedAt,
					closedAt,
					finishedAt,
					mandatorySince,
				});

				return { response, startedAt, closedAt, finishedAt, mandatorySince };
			};

			it("should map sourceSystemId", () => {
				const { response } = setup();

				const result = UserLoginMigrationMapper.mapToUserLoginMigration(response);

				expect(result.sourceSystemId).toBe("source-system-id");
			});

			it("should map targetSystemId", () => {
				const { response } = setup();

				const result = UserLoginMigrationMapper.mapToUserLoginMigration(response);

				expect(result.targetSystemId).toBe("target-system-id");
			});

			it("should map startedAt to Date", () => {
				const { response, startedAt } = setup();

				const result = UserLoginMigrationMapper.mapToUserLoginMigration(response);

				expect(result.startedAt).toBeInstanceOf(Date);
				expect(result.startedAt.toISOString()).toBe(startedAt);
			});

			it("should map closedAt to Date", () => {
				const { response, closedAt } = setup();

				const result = UserLoginMigrationMapper.mapToUserLoginMigration(response);

				expect(result.closedAt).toBeInstanceOf(Date);
				expect(result.closedAt?.toISOString()).toBe(closedAt);
			});

			it("should map finishedAt to Date", () => {
				const { response, finishedAt } = setup();

				const result = UserLoginMigrationMapper.mapToUserLoginMigration(response);

				expect(result.finishedAt).toBeInstanceOf(Date);
				expect(result.finishedAt?.toISOString()).toBe(finishedAt);
			});

			it("should map mandatorySince to Date", () => {
				const { response, mandatorySince } = setup();

				const result = UserLoginMigrationMapper.mapToUserLoginMigration(response);

				expect(result.mandatorySince).toBeInstanceOf(Date);
				expect(result.mandatorySince?.toISOString()).toBe(mandatorySince);
			});
		});

		describe("when optional fields are undefined", () => {
			const setup = () => {
				const response = userLoginMigrationResponseFactory.build({
					sourceSystemId: undefined,
					closedAt: undefined,
					finishedAt: undefined,
					mandatorySince: undefined,
				});

				return { response };
			};

			it("should return undefined for sourceSystemId", () => {
				const { response } = setup();

				const result = UserLoginMigrationMapper.mapToUserLoginMigration(response);

				expect(result.sourceSystemId).toBeUndefined();
			});

			it("should return undefined for closedAt", () => {
				const { response } = setup();

				const result = UserLoginMigrationMapper.mapToUserLoginMigration(response);

				expect(result.closedAt).toBeUndefined();
			});

			it("should return undefined for finishedAt", () => {
				const { response } = setup();

				const result = UserLoginMigrationMapper.mapToUserLoginMigration(response);

				expect(result.finishedAt).toBeUndefined();
			});

			it("should return undefined for mandatorySince", () => {
				const { response } = setup();

				const result = UserLoginMigrationMapper.mapToUserLoginMigration(response);

				expect(result.mandatorySince).toBeUndefined();
			});
		});
	});
});
