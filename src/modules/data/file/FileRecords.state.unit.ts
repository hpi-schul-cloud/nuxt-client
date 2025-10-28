import { useFileRecordsStore } from "./FileRecords.state";
import { fileRecordFactory } from "@@/tests/test-utils";
import { createPinia, setActivePinia } from "pinia";

describe("FileRecords Store", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	describe("getFileRecordsByParentId and upsertFileRecords", () => {
		describe("when store is empty", () => {
			it("should initialize with an empty recordsByParent map", () => {
				const store = useFileRecordsStore();

				expect(store.recordsByParent.size).toBe(0);
			});

			it("should return an empty array if no records exist for a parentId", () => {
				const store = useFileRecordsStore();

				const records = store.getFileRecordsByParentId("nonexistent");

				expect(records).toEqual([]);
			});

			it("should add file records to store", () => {
				const store = useFileRecordsStore();
				const parentId = "parent1";

				const record1 = fileRecordFactory.build({ parentId });
				const record2 = fileRecordFactory.build({ parentId });

				store.upsertFileRecords([record1, record2]);

				const records = store.getFileRecordsByParentId(parentId);

				expect(records).toHaveLength(2);
				expect(records).toEqual(
					expect.arrayContaining([expect.objectContaining(record1), expect.objectContaining(record2)])
				);
			});
		});

		describe("when store has record with parent id", () => {
			const setup = () => {
				const store = useFileRecordsStore();
				const parentId = "parent1";
				const fileRecordId = "file1";

				const record = fileRecordFactory.build({
					id: fileRecordId,
					parentId,
					updatedAt: "0",
				});

				return { store, record, parentId, fileRecordId };
			};

			it("should update existing file records correctly", () => {
				const { store, record, parentId, fileRecordId } = setup();
				const updatedRecord = fileRecordFactory.build({
					id: fileRecordId,
					parentId,
					updatedAt: "1",
				});

				store.upsertFileRecords([record]);
				store.upsertFileRecords([updatedRecord]);

				const records = store.getFileRecordsByParentId("parent1");

				expect(records).toHaveLength(1);
				expect(records[0]).toEqual(expect.objectContaining(updatedRecord));
			});

			it("should add new file records correctly", () => {
				const { store, record, parentId } = setup();
				const newRecord = fileRecordFactory.build({
					id: "file2",
					parentId,
				});

				store.upsertFileRecords([record]);
				store.upsertFileRecords([newRecord]);

				const records = store.getFileRecordsByParentId(parentId);

				expect(records).toHaveLength(2);
				expect(records).toEqual(
					expect.arrayContaining([expect.objectContaining(record), expect.objectContaining(newRecord)])
				);
			});
		});

		describe("when store has record with other parent id", () => {
			const setup = () => {
				const store = useFileRecordsStore();
				const parentId1 = "parent1";
				const record1 = fileRecordFactory.build({
					parentId: parentId1,
				});

				const parentId2 = "parent2";
				const record2 = fileRecordFactory.build({
					parentId: parentId2,
				});

				return { store, record1, record2, parentId1, parentId2 };
			};

			it("should add new file records correctly", () => {
				const { store, record1, record2, parentId1, parentId2 } = setup();

				store.upsertFileRecords([record1]);
				store.upsertFileRecords([record2]);

				const records1 = store.getFileRecordsByParentId(parentId1);
				const records2 = store.getFileRecordsByParentId(parentId2);

				expect(records1).toHaveLength(1);
				expect(records1).toEqual(expect.arrayContaining([expect.objectContaining(record1)]));

				expect(records2).toHaveLength(1);
				expect(records2).toEqual(expect.arrayContaining([expect.objectContaining(record2)]));
			});
		});
	});

	describe("getFileRecordById", () => {
		describe("when store is empty", () => {
			it("should return undefined if no records exist", () => {
				const store = useFileRecordsStore();

				const result = store.getFileRecordById("nonexistent");

				expect(result).toBeUndefined();
			});
		});

		describe("when store has records", () => {
			const setup = () => {
				const store = useFileRecordsStore();

				const record1 = fileRecordFactory.build();
				const record2 = fileRecordFactory.build();
				const record3 = fileRecordFactory.build();

				return {
					store,
					record1,
					record2,
					record3,
				};
			};

			it("should return the correct file record when it exists", () => {
				const { store, record1, record2, record3 } = setup();

				store.upsertFileRecords([record1, record2, record3]);

				const result = store.getFileRecordById(record2.id);

				expect(result).toEqual(expect.objectContaining(record2));
			});

			it("should return the correct file record from different parent ids", () => {
				const { store, record1, record2, record3 } = setup();

				store.upsertFileRecords([record1, record2, record3]);

				const result = store.getFileRecordById(record3.id);

				expect(result).toEqual(expect.objectContaining(record3));
			});

			it("should return undefined if the file record does not exist", () => {
				const { store, record1, record2, record3 } = setup();

				store.upsertFileRecords([record1, record2, record3]);

				const result = store.getFileRecordById("nonexistent");

				expect(result).toBeUndefined();
			});
		});
	});

	describe("deleteFileRecords", () => {
		describe("when store is empty", () => {
			it("should not throw an error when deleting from an empty store", () => {
				const store = useFileRecordsStore();
				const fileRecord = fileRecordFactory.build();

				expect(() => {
					store.deleteFileRecords([fileRecord]);
				}).not.toThrow();
			});
		});

		describe("when store has records", () => {
			it("should remove the specified file records", () => {
				const store = useFileRecordsStore();
				const parentId = "parent1";

				const record1 = fileRecordFactory.build({ parentId });
				const record2 = fileRecordFactory.build({ parentId });

				store.upsertFileRecords([record1, record2]);

				store.deleteFileRecords([record1]);

				const records = store.getFileRecordsByParentId(parentId);

				expect(records).toHaveLength(1);
				expect(records).toEqual(expect.arrayContaining([expect.objectContaining(record2)]));
			});
		});

		describe("when store has records with different parent ids", () => {
			it("should remove the specified file records from the correct parent id", () => {
				const store = useFileRecordsStore();
				const parentId1 = "parent1";
				const parentId2 = "parent2";

				const record1 = fileRecordFactory.build({ parentId: parentId1 });
				const record2 = fileRecordFactory.build({ parentId: parentId2 });

				store.upsertFileRecords([record1, record2]);

				store.deleteFileRecords([record1]);

				const records1 = store.getFileRecordsByParentId(parentId1);
				const records2 = store.getFileRecordsByParentId(parentId2);

				expect(records1).toHaveLength(0);
				expect(records2).toHaveLength(1);
				expect(records2).toEqual(expect.arrayContaining([expect.objectContaining(record2)]));
			});
		});

		describe("when store has multiple records with the same parent id", () => {
			it("should remove only the specified file records", () => {
				const store = useFileRecordsStore();
				const parentId = "parent1";

				const record1 = fileRecordFactory.build({ parentId });
				const record2 = fileRecordFactory.build({ parentId });
				const record3 = fileRecordFactory.build({ parentId });

				store.upsertFileRecords([record1, record2, record3]);

				store.deleteFileRecords([record1, record3]);

				const records = store.getFileRecordsByParentId(parentId);

				expect(records).toHaveLength(1);
				expect(records).toEqual(expect.arrayContaining([expect.objectContaining(record2)]));
			});
		});
	});
});
