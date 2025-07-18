export interface H5pEditorHooks {
	onCreate(): Promise<void>;
	afterSave(contentId: string): Promise<void>;
}
