import { FileTableItem } from "@pages/files/file-table-item";

export function getFileOverviewItems(
	t: (key: string) => string
): FileTableItem[] {
	return [
		{
			name: t("pages.files.overview.favorites"),
			icon: { name: "favorite", colored: true },
			path: "/cfiles/",
			size: "320 kB",
			lastChanged: new Date(2022, 10, 1, 14, 4),
		},
		{
			name: t("pages.files.overview.personalFiles"),
			icon: { name: "folder" },
			path: "/files/my",
			size: "640 kB",
			lastChanged: new Date(2022, 10, 1, 14, 4),
		},
		{
			name: t("pages.files.overview.courseFiles"),
			icon: { name: "folder_shared" },
			path: "/files/courses",
			size: "1.28 MB",
			lastChanged: new Date(2021, 10, 1, 14, 4),
		},
		{
			name: t("pages.files.overview.teamFiles"),
			icon: { name: "folder_shared" },
			path: "/cfiles/teams",
			size: "2.56 MB",
			lastChanged: new Date(2019, 11, 1, 14, 4),
		},
		{
			name: t("pages.files.overview.sharedFiles"),
			icon: { name: "folder_shared" },
			path: "/files/shared",
			size: "5.12 MB",
			lastChanged: new Date(2022, 10, 1, 9, 4),
		},
	];
}
