import LoggedInLayout from "./LoggedIn.layout.vue";
import LoggdOutLayout from "./loggedOut.layout.vue";
import LernStoreLayout from "./lernStore.layout.vue";
import { Layouts } from "./types";

type AnyLayout =
	| typeof LoggedInLayout
	| typeof LoggdOutLayout
	| typeof LernStoreLayout;

type LayoutComponents = Record<Layouts, AnyLayout>;

const availableLayouts: LayoutComponents = {
	[Layouts.LOGGED_IN]: LoggedInLayout,
	[Layouts.LOGGED_OUT]: LoggdOutLayout,
	[Layouts.LERN_STORE]: LernStoreLayout,
};

const isLayout = (name: string): name is Layouts => {
	return Object.keys(availableLayouts).includes(name as Layouts);
};

export {
	LoggedInLayout,
	LoggdOutLayout,
	LernStoreLayout,
	availableLayouts,
	isLayout,
};
