import {
	NavigationGuard,
	RouteLocationNormalized,
	RouteLocationRaw,
	RouteMeta,
} from "vue-router";
import { Multiguard } from "@/router/guards/multi.guard";

const createRoute = (name: string, path: string): RouteLocationNormalized => {
	return {
		matched: [],
		meta: {} as RouteMeta,
		redirectedFrom: {} as RouteLocationNormalized,
		name,
		path,
		fullPath: path,
		hash: "",
		query: {},
		params: {},
	};
};

describe("Multiguard", () => {
	describe("when the argument is not an array", () => {
		const setup = () => {
			const guards = {} as NavigationGuard[];

			return { guards };
		};

		it("throws an error", () => {
			const { guards } = setup();

			expect(() => Multiguard(guards)).toThrowError(
				"You must specify an array of guards"
			);
		});
	});

	describe("when the argument is an empty array", () => {
		const setup = () => {
			const to: RouteLocationNormalized = createRoute("to", "/to");
			const from: RouteLocationNormalized = createRoute("from", "/from");
			const next = jest.fn();

			const multiguard = Multiguard([]);

			return { to, from, next, multiguard };
		};

		it("should call next", () => {
			const { to, from, next, multiguard } = setup();

			multiguard(to, from, next);

			expect(next).toHaveBeenCalled();
		});
	});

	describe("when a single guard is specified", () => {
		const setup = () => {
			const expected: RouteLocationRaw = {
				path: "/path",
			};
			const to = createRoute("to", "/to");
			const from = createRoute("from", "/from");
			const next = jest.fn();

			const multiguard = Multiguard([(to, from, next) => next(expected)]);

			return { expected, to, from, next, multiguard };
		};

		it("should call next with the expected value", () => {
			const { expected, to, from, next, multiguard } = setup();

			multiguard(to, from, next);

			expect(next).toHaveBeenCalledWith(expected);
		});
	});

	describe("when all guards pass", () => {
		const setup = () => {
			const to = createRoute("to", "/to");
			const from = createRoute("from", "/from");
			const next = jest.fn();

			const multiguard = Multiguard([
				(to, from, next) => next(),
				(to, from, next) => next(),
			]);

			return { to, from, next, multiguard };
		};

		it("should call next after passing each guard", () => {
			const { to, from, next, multiguard } = setup();

			multiguard(to, from, next);

			expect(next).toHaveBeenCalled();
		});
	});

	describe("when the first guard has a non-undefined value", () => {
		const setup = () => {
			const expected: RouteLocationRaw = {
				path: "/path",
			};
			const to = createRoute("to", "/to");
			const from = createRoute("from", "/from");
			const next = jest.fn();

			const multiguard = Multiguard([
				(to, from, next) => next(expected),
				(to, from, next) => next(),
			]);

			return { expected, to, from, next, multiguard };
		};

		it("should call next with the value of the first guard", () => {
			const { expected, to, from, next, multiguard } = setup();

			multiguard(to, from, next);

			expect(next).toHaveBeenCalledWith(expected);
		});
	});

	describe("when the first guard has a non-undefined value and should not call the second guard", () => {
		const setup = () => {
			const expected: RouteLocationRaw = {
				path: "/path",
			};
			const to = createRoute("to", "/to");
			const from = createRoute("from", "/from");
			const next = jest.fn();

			const multiguard = Multiguard([
				(to, from, next) => next(expected),
				() => fail("Second guard called when it shouldn't have been"),
			]);

			return { expected, to, from, next, multiguard };
		};

		it("should call next with the value of the first guard and not the second guard", () => {
			const { expected, to, from, next, multiguard } = setup();

			multiguard(to, from, next);

			expect(next).toHaveBeenCalledWith(expected);
		});
	});
});
