/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { localize } from '../../../../nls.js';
import { registerColor } from '../../../../platform/theme/common/colorRegistry.js';
export const diffMoveBorder = registerColor('diffEditor.move.border', { dark: '#8b8b8b9c', light: '#8b8b8b9c', hcDark: '#8b8b8b9c', hcLight: '#8b8b8b9c', }, localize('diffEditor.move.border', 'The border color for text that got moved in the diff editor.'));
