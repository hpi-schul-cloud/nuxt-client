/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.41.0(38e1e3d097f84e336c311d071a9ffb5191d4ffd1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/ini/ini.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "ini",
  extensions: [".ini", ".properties", ".gitconfig"],
  filenames: ["config", ".gitattributes", ".gitconfig", ".editorconfig"],
  aliases: ["Ini", "ini"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/ini/ini"], resolve, reject);
      });
    } else {
      return import("./ini.js");
    }
  }
});
