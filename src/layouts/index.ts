import BorderlessLayout from "./Borderless.layout.vue";
import LoggedInLayout from "./LoggedIn.layout.vue";
import LoggedOutLayout from "./LoggedOut.layout.vue";
import RegistrationLayout from "./Registration.layout.vue";
import { Layouts } from "./types";

type AnyLayout = typeof LoggedInLayout | typeof LoggedOutLayout | typeof BorderlessLayout | typeof RegistrationLayout;

const availableLayouts: Record<Layouts, AnyLayout> = {
	[Layouts.LOGGED_IN]: LoggedInLayout,
	[Layouts.LOGGED_OUT]: LoggedOutLayout,
	[Layouts.BORDERLESS]: BorderlessLayout,
	[Layouts.REGISTRATION]: RegistrationLayout,
};

const isLayout = (name: string): name is Layouts => Object.keys(availableLayouts).includes(name as Layouts);

export { availableLayouts, BorderlessLayout, isLayout, LoggedInLayout, LoggedOutLayout, RegistrationLayout };
