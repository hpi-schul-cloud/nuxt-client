import { BaseTableItem } from "@basecomponents/BaseTable/BaseTableItem";

export interface FileTableItem extends BaseTableItem {
    name: string;
    icon: {
        name: string;
        colored?: boolean;
    };
    size: string;
    lastChanged: Date;
}
