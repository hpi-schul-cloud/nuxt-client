import {
	canManageExternalToolElements,
	canManageFileElements,
	canManageH5pElements,
	canManageLinkElements,
	canSeeDeletedElements,
	isContentElementShown,
} from "./content-element-visibility";
import { boardResponseFactory } from "@@/tests/test-utils";
import { BoardResponseAllowedOperations } from "@api-server";

const allowedOperationsWith = (overrides: Partial<BoardResponseAllowedOperations>) => {
	const { allowedOperations } = boardResponseFactory.build({ allowedOperations: overrides });
	if (!allowedOperations) throw new Error("The board factory always provides allowed operations");

	return allowedOperations;
};

describe("content-element-visibility", () => {
	describe("permissions", () => {
		it.each([
			["link", canManageLinkElements, { updateElement: true }],
			["h5p", canManageH5pElements, { updateElement: true }],
			["file", canManageFileElements, { updateElement: true }],
			["file", canManageFileElements, { createFileElement: true }],
			["external tool", canManageExternalToolElements, { updateElement: true }],
			["external tool", canManageExternalToolElements, { createExternalToolElement: true }],
			["deleted", canSeeDeletedElements, { deleteElement: true }],
		])("should allow %s elements with %o", (_name, canManage, allowedOperations) => {
			expect(canManage(allowedOperationsWith(allowedOperations))).toBe(true);
		});

		it.each([
			["link", canManageLinkElements],
			["h5p", canManageH5pElements],
			["file", canManageFileElements],
			["external tool", canManageExternalToolElements],
			["deleted", canSeeDeletedElements],
		])("should not allow %s elements without permissions", (_name, canManage) => {
			expect(canManage(allowedOperationsWith({}))).toBe(false);
		});
	});

	describe("isContentElementShown", () => {
		it.each([
			[{ isEditMode: true, hasContent: false, canManage: false }, true],
			[{ isEditMode: false, hasContent: true, canManage: false }, true],
			[{ isEditMode: false, hasContent: false, canManage: true }, true],
			[{ isEditMode: false, hasContent: false, canManage: false }, false],
		])("should return the visibility for %o", (state, expected) => {
			expect(isContentElementShown(state)).toBe(expected);
		});
	});
});
