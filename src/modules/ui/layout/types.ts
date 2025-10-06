import { ConfigResponse, Permission, SchulcloudTheme } from "@/serverApi/v3";

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

export type FeatureValue = string | number | boolean;

export type SidebarItemBaseData = {
	icon?: string;
	title: string;
	testId: string;
	permissions?: Permission[];
	feature?: keyof ConfigResponse;
	featureValue?: FeatureValue;
	theme?: SchulcloudTheme[];
};

export type SidebarSingleItem = SidebarItemBaseData & (ExternalLink | RouterLink);

export type SidebarGroupItem = {
	children: SidebarSingleItem[];
} & SidebarItemBaseData;

export type SidebarItems = (SidebarSingleItem | SidebarGroupItem)[];
