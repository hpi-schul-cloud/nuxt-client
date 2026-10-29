import type { BoardResponseAllowedOperations } from "@api-server";

type AllowedOperations = BoardResponseAllowedOperations;

export const canManageLinkElements = (allowedOperations: AllowedOperations) => allowedOperations.updateElement;

export const canManageFileElements = (allowedOperations: AllowedOperations) =>
	allowedOperations.updateElement || allowedOperations.createFileElement;

export const canManageExternalToolElements = (allowedOperations: AllowedOperations) =>
	allowedOperations.updateElement || allowedOperations.createExternalToolElement;

export const canManageH5pElements = (allowedOperations: AllowedOperations) => allowedOperations.updateElement;

export const canSeeDeletedElements = (allowedOperations: AllowedOperations) => allowedOperations.deleteElement;

/**
 * Elements without content render a placeholder for users who can manage them and nothing for everyone else.
 */
export const isContentElementShown = (state: { isEditMode: boolean; hasContent: boolean; canManage: boolean }) =>
	state.isEditMode || state.hasContent || state.canManage;
