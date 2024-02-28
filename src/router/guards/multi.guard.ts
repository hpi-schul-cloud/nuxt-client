import {
	NavigationGuard,
	NavigationGuardNext,
	RouteLocationNormalized,
} from "vue-router";

function isUndefined(value: unknown): value is undefined {
	return value === undefined;
}

function evaluateGuards(
	guards: NavigationGuard[],
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
): void {
	const guardsLeft: NavigationGuard[] = [...guards];
	const nextGuard: NavigationGuard | undefined = guardsLeft.shift();

	if (isUndefined(nextGuard)) {
		next();
		return;
	}

	nextGuard(to, from, (nextArg?: unknown) => {
		if (isUndefined(nextArg)) {
			evaluateGuards(guardsLeft, to, from, next);
			return;
		}

		// TODO improve typings or replace Multiguard
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		next(nextArg);
	});
}

/**
 * Calls the given guards in order, passing the same arguments to each of them.
 * See https://github.com/atanas-dev/vue-router-multiguard
 *
 * @param guards The guards to call
 * @returns A guard that calls the given guards in order
 */
export const Multiguard = function (
	guards: NavigationGuard[]
): NavigationGuard {
	if (!Array.isArray(guards)) {
		throw new Error("You must specify an array of guards");
	}

	return (
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: NavigationGuardNext
	) => {
		evaluateGuards(guards, to, from, next);
	};
};
