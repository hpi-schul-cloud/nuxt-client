import BorderlessLayout from "./Borderless.layout.vue";
import LernStoreLayout from "./LernStore.layout.vue";
import LoggedInLayout from "./LoggedIn.layout.vue";
import LoggedOutLayout from "./LoggedOut.layout.vue";
import { Layouts } from "./types";

type AnyLayout = typeof LoggedInLayout | typeof LoggedOutLayout | typeof LernStoreLayout | typeof BorderlessLayout;

const availableLayouts: Record<Layouts, AnyLayout> = {
	[Layouts.LOGGED_IN]: LoggedInLayout,
	[Layouts.LOGGED_OUT]: LoggedOutLayout,
	[Layouts.LERN_STORE]: LernStoreLayout,
	[Layouts.BORDERLESS]: BorderlessLayout,
};

const isLayout = (name: string): name is Layouts => Object.keys(availableLayouts).includes(name as Layouts);

export { availableLayouts, BorderlessLayout, isLayout, LernStoreLayout, LoggedInLayout, LoggedOutLayout };
