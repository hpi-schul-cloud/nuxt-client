import { GetterTree, ActionTree, Module as Mod, MutationTree } from "vuex";
import { VuexModule } from "vuex-module-decorators";

type ConstructorOf<C> = { new (...args: any[]): C };
type StaticsType = Record<string, any>;

const mockGetters = <M>(
	module: Function & Mod<M, any>,
	statics: StaticsType,
	getters: Record<string, any>
) => {
	Object.keys(module.getters as GetterTree<M, any>).forEach((key) => {
		Object.defineProperty(statics, key, {
			get: () => getters[key],
		});
	});
};

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

	// ------- getters -------
	if (module.getters) {
		mockGetters(module, statics, getters);
	}

	// -------- mutations --------
	if (module.mutations) {
		mockMutations(module, statics);
	}
	// -------- actions ---------
	if (module.actions) {
		mockActions(module, statics);
	}

	return statics as M;
}
