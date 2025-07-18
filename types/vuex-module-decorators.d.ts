import { Module as Mod } from "vuex";
import { ModuleOptions } from "vuex-module-decorators/dist/types/moduleoptions";

declare module "vuex-module-decorators" {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export function Module<S>(options: ModuleOptions): ClassDecorator;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	export function Module<S>(module: Function & Mod<S, unknown>): void;
}
