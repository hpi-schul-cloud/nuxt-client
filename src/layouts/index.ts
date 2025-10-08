import BorderlessLayout from "./Borderless.layout.vue";
import LernStoreLayout from "./lernStore.layout.vue";
import LoggedInLayout from "./LoggedIn.layout.vue";
import LoggdOutLayout from "./loggedOut.layout.vue";
import { Layouts } from "./types";

type AnyLayout = typeof LoggedInLayout | typeof LoggdOutLayout | typeof LernStoreLayout | typeof BorderlessLayout;

const availableLayouts: Record<Layouts, AnyLayout> = {
	[Layouts.LOGGED_IN]: LoggedInLayout,
	[Layouts.LOGGED_OUT]: LoggdOutLayout,
	[Layouts.LERN_STORE]: LernStoreLayout,
	[Layouts.BORDERLESS]: BorderlessLayout,
};

const isLayout = (name: string): name is Layouts => Object.keys(availableLayouts).includes(name as Layouts);

export { availableLayouts, isLayout };
