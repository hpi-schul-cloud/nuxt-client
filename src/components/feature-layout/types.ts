// TODO - better typing

export type BaseData = {
	title: string;
	testId: string;
	permission?: string;
	activeForUrls?: string[];
};

export type ItemData = {
	title: string;
	icon: string;
	testId: string;
	permission?: string;
	activeForUrls?: string[];
} & (ExternalLink | RouterLink);

export type CategoryData = {
	title: string;
	icon: string;
	testId: string;
	permission?: string;
	activeForUrls?: string[];
	children: ChildData[];
};

export type ChildData = {
	title: string;
	testId: string;
	permission?: string;
	activeForUrls?: string[];
} & (ExternalLink | RouterLink);

export type SidebarItems = (ItemData | CategoryData)[];

// -------------

// export type SidebarItemBaseData = {
// 	title: string;
// 	icon: string;
// 	testId: string;
// 	permission?: string;
// 	activeForUrls?: string[];
// 	children?: SidebarItemData[];
// };

export type ExternalLink = {
	href: string;
	to?: never;
	target?: string;
};

export type RouterLink = {
	to: string;
	href?: never;
	target?: string;
};

// export type SidebarItemData = SidebarItemBaseData & (ExternalLink | RouterLink);

// TODO - is it better/cleaner to have a CategoryItem type?
