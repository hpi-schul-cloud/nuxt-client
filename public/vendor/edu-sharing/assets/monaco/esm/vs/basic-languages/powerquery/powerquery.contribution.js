/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.41.0(38e1e3d097f84e336c311d071a9ffb5191d4ffd1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/powerquery/powerquery.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "powerquery",
  extensions: [".pq", ".pqm"],
  aliases: ["PQ", "M", "Power Query", "Power Query M"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/powerquery/powerquery"], resolve, reject);
      });
    } else {
      return import("./powerquery.js");
    }
  }
});
