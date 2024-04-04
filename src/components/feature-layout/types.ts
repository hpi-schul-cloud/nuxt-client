// TODO - better typing

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

export type SidebarItemBaseData = {
	title: string;
	testId: string;
	permissions?: string[];
	activeForUrls?: string[];
};

export type SidebarLinkItem = SidebarItemBaseData & (ExternalLink | RouterLink);

export type SidebarGroupItem = {
	icon: string;
	children: SidebarLinkItem[];
} & SidebarItemBaseData;

export type SidebarSingleItem = {
	icon: string;
} & SidebarLinkItem;

export type SidebarItems = (SidebarSingleItem | SidebarGroupItem)[];
