import { FileRecord } from "@/types/file/File";
import { defineStore } from "pinia";

interface FileRecordsState {
	recordsByParent: Map<string, Map<string, FileRecord>>;
}

export const useFileRecordsStore = defineStore("fileRecords", {
	state: (): FileRecordsState => ({
		recordsByParent: new Map(),
	}),

	actions: {
		getFileRecordsByParentId(parentId: string): FileRecord[] {
			const parentRecords = this.recordsByParent.get(parentId);
			return parentRecords ? Array.from(parentRecords.values()) : [];
		},

		getFileRecordById(fileRecordId: string): FileRecord | undefined {
			for (const parentRecords of this.recordsByParent.values()) {
				const record = parentRecords.get(fileRecordId);

				if (record) return record;
			}
		},

		upsertFileRecords(updatedRecords: FileRecord[]): void {
			updatedRecords.forEach((updatedRecord) => {
				const { parentId, id } = updatedRecord;
				const parentRecords = this.recordsByParent.get(parentId) || new Map();

				parentRecords.set(id, { ...parentRecords.get(id), ...updatedRecord });
				this.recordsByParent.set(parentId, parentRecords);
			});
		},

		deleteFileRecords(fileRecords: FileRecord[]): void {
			fileRecords.forEach((fileRecord) => {
				const { parentId, id } = fileRecord;
				const parentRecords = this.recordsByParent.get(parentId);

				if (parentRecords) {
					parentRecords.delete(id);
					if (parentRecords.size === 0) {
						this.recordsByParent.delete(parentId);
					}
				}
			});
		},
	},
});
