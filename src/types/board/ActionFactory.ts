export type EmptyPayload = Record<string, never>;
export type PermittedStoreActions<T extends { [k: string]: GenericActionFactory }> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : never;
}[keyof T];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Props = Record<string, any>;
declare type ActionProps<T extends Props> = T;

export function props<T extends Props>(): ActionProps<T> {
	return {} as T;
}

export function createAction<T extends string, P extends Props>(
	type: T,
	// eslint-disable-next-line
	props: ActionProps<P>
): ActionFactory<T, P> {
	return (payload: P) => ({ type, payload }) as const;
}

type ActionFactory<T extends string, P extends Props> = (payload: P) => {
	type: T;
	payload: P;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericActionFactory = ActionFactory<any, any>;
export type Action = ReturnType<GenericActionFactory>;

export function handle(action: Action, ...ons: ReturnType<typeof on>[]) {
	ons.forEach((on) => on(action));
}

export function on<T extends GenericActionFactory, P extends ReturnType<T>>(
	action: T,
	callback: (payload: P["payload"]) => void
) {
	const permittedAction = action({}).type;
	return (a: ReturnType<T>) => (permittedAction === a.type ? callback(a.payload as P["payload"]) : null);
}
