export type ExternalLink = {
	href: string;
	to?: never;
	target?: string;
	rel?: string;
};

export type RouterLink = {
	to: string;
	href?: never;
	target?: string;
	rel?: never;
};

export type SidebarItemBaseData = {
	icon?: string;
	title: string;
	testId: string;
	permissions?: string[];
};

export type SidebarSingleItem = SidebarItemBaseData &
	(ExternalLink | RouterLink);

export type SidebarGroupItem = {
	children: SidebarSingleItem[];
} & SidebarItemBaseData;

export type SidebarItems = (SidebarSingleItem | SidebarGroupItem)[];
