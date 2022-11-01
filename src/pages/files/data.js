export function getFileOverviewHeaders(t) {
	return [
		{
			name: t("pages.files.overview.favorites"),
			icon: { name: "favorite", colored: true },
			path: "/",
			size: "320kB",
			lastChanged: new Date(2022, 10, 1, 14, 4),
		},
		{
			name: t("pages.files.overview.personalFiles"),
			icon: { name: "folder" },
			path: "/files/my",
			size: "640kB",
			lastChanged: new Date(2022, 10, 1, 14, 4),
		},
		{
			name: t("pages.files.overview.courseFiles"),
			icon: { name: "folder_shared" },
			path: "/files/courses",
			size: "1.28MB",
			lastChanged: new Date(2021, 10, 1, 14, 4),
		},
		{
			name: t("pages.files.overview.teamFiles"),
			icon: { name: "folder_shared" },
			path: "/cfiles/teams",
			size: "2.56MB",
			lastChanged: new Date(2019, 11, 1, 14, 4),
		},
		{
			name: t("pages.files.overview.sharedFiles"),
			icon: { name: "folder_shared" },
			path: "/files/shared",
			size: "5.12MB",
			lastChanged: new Date(2022, 10, 1, 9, 4),
		},
	];
}
