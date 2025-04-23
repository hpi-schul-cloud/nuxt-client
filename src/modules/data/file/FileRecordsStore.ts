import { FileRecordResponse } from "@/fileStorageApi/v3";
import { defineStore } from "pinia";

interface FileRecordsState {
	recordsByParent: Map<string, Map<string, FileRecordResponse>>;
}

export const useFileRecordsStore = defineStore("fileRecords", {
	state: (): FileRecordsState => ({
		recordsByParent: new Map(),
	}),

	actions: {
		getFileRecordsByParentId(parentId: string): FileRecordResponse[] {
			const parentRecords = this.recordsByParent.get(parentId);
			return parentRecords ? Array.from(parentRecords.values()) : [];
		},

		upsertFileRecords(updatedRecords: FileRecordResponse[]): void {
			updatedRecords.forEach((updatedRecord) => {
				const { parentId, id } = updatedRecord;
				const parentRecords = this.recordsByParent.get(parentId) || new Map();

				parentRecords.set(id, { ...parentRecords.get(id), ...updatedRecord });
				this.recordsByParent.set(parentId, parentRecords);
			});
		},
	},
});
