import createComponentMocksJS from "../unit/setup";

type componentMockOptions = {
	i18n?: boolean;
	vueMeta?: boolean;
	user?: boolean;
	store?: {
		[property: string]: {
			state: any;
			getters: any;
			mutations: any;
			actions: any;
		};
	};
	$route?: string;
	$router?: any;
	router?: boolean;
	uiState?: any;
	dialog?: {
		confirm: (params: any) => void;
	};
	mocks?: any;
	stubs?: any;
	$config?: any;
};

export default function createComponentMocks({
	i18n,
	vueMeta,
	user,
	store,
	$route,
	$router,
	router,
	uiState,
	dialog,
	mocks,
	stubs,
	$config,
}: componentMockOptions) {
	return createComponentMocksJS({
		i18n,
		vueMeta,
		user,
		store,
		$route,
		$router,
		router,
		uiState,
		dialog,
		mocks,
		stubs,
		$config,
	});
}
