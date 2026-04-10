export type Nullish = null | undefined;
export const isNotNullish = <T>(value: T | Nullish): value is T => value !== undefined && value !== null;
