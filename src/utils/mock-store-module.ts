import { ActionTree, Module as Mod, MutationTree } from "vuex";
import { VuexModule } from "vuex-module-decorators";

type ConstructorOf<C> = { new (...args: any[]): C };
type StaticsType = Record<string, any>;

const mockMutations = <M>(
	module: Function & Mod<M, any>,
	statics: StaticsType
) => {
	Object.keys(module.mutations as MutationTree<M>).forEach((key) => {
		// eslint-disable-next-line jest/prefer-spy-on
		statics[key] = jest.fn();
	});
};

const mockActions = <M>(
	module: Function & Mod<M, any>,
	statics: StaticsType
) => {
	Object.keys(module.actions as ActionTree<M, any>).forEach((key) => {
		// eslint-disable-next-line jest/prefer-spy-on
		statics[key] = jest.fn();
	});
};

export function createModuleMocks<M extends VuexModule>(
	moduleClass: ConstructorOf<M>,
	getters: Partial<M> = {}
): M {
	const module: Function & Mod<M, any> = moduleClass;

	const statics: StaticsType = {};

	// -------- mutations --------
	if (module.mutations) {
		mockMutations(module, statics);
	}
	// -------- actions ---------
	if (module.actions) {
		mockActions(module, statics);
	}

	return { ...statics, ...getters } as M;
}
