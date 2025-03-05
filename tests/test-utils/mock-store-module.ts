import { GetterTree, ActionTree, Module as Mod, MutationTree } from "vuex";
import { VuexModule } from "vuex-module-decorators";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConstructorOf<C> = { new (...args: any[]): C };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StaticsType = Record<string, any>;

const mockGetters = <M>(
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
	module: Function & Mod<M, any>,
	statics: StaticsType,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getters: Record<string, any>
) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Object.keys(module.getters as GetterTree<M, any>).forEach((key) => {
		Object.defineProperty(statics, key, {
			get: () => getters[key],
		});
	});
};

const mockMutations = <M>(
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
	module: Function & Mod<M, any>,
	statics: StaticsType
) => {
	Object.keys(module.mutations as MutationTree<M>).forEach((key) => {
		statics[key] = jest.fn();
	});
};

const mockActions = <M>(
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
	module: Function & Mod<M, any>,
	statics: StaticsType
) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Object.keys(module.actions as ActionTree<M, any>).forEach((key) => {
		statics[key] = jest.fn();
	});
};

export function createModuleMocks<M extends VuexModule>(
	moduleClass: ConstructorOf<M>,
	getters: Partial<M> = {}
): jest.Mocked<M> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
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

	return statics as jest.Mocked<M>;
}
