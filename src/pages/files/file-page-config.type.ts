import { Breadcrumb } from "@components/templates/default-wireframe.types";

export type FilesPageConfig = {
	title: string;
	breadcrumbs: Breadcrumb[];
	loadFilesFunction: () => Promise<void>;
};
