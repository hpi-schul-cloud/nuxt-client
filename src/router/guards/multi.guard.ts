import { RawLocation, Route } from "vue-router";
import Vue from "vue";

type NextFunctionArg =
	| false
	| void
	| RawLocation
	| ((vm: Vue) => unknown)
	| undefined;
type NextFunction = (nextArg?: NextFunctionArg) => void;
type Guard = (to: Route, from: Route, next: NextFunction) => void;

function isUndefined(value: unknown): value is undefined {
	return value === undefined;
}

function evaluateGuards(
	guards: Guard[],
	to: Route,
	from: Route,
	next: NextFunction
): void {
	const guardsLeft: Guard[] = [...guards];
	const nextGuard: Guard | undefined = guardsLeft.shift();

	if (isUndefined(nextGuard)) {
		next();
		return;
	}

	nextGuard(to, from, (nextArg?: NextFunctionArg) => {
		if (isUndefined(nextArg)) {
			evaluateGuards(guardsLeft, to, from, next);
			return;
		}

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
export const Multiguard = function (guards: Guard[]): Guard {
	if (!Array.isArray(guards)) {
		throw new Error("You must specify an array of guards");
	}

	return (to: Route, from: Route, next: NextFunction) => {
		evaluateGuards(guards, to, from, next);
	};
};
