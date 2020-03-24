import { storiesOf } from "@storybook/vue";

import AdminTableLegend from "./AdminTableLegend";

storiesOf("5 Molecules/AdminTableLegend", module).add("default", () => ({
	components: { AdminTableLegend },
	template: `<admin-table-legend :icons="icons" :show-ldap-hint="true"/>`,
	data: () => ({
		icons: [
			{
				icon: "doublecheck",
				color: "var(--color-success)",
				style: "margin: -3px 3px",
				i18n: "Alle Einverständniserklärungen vorhanden",
			},
			{
				icon: "check",
				color: "var(--color-warning)",
				i18n: "Eltern haben zugestimmt",
			},
			{
				icon: "clear",
				color: "var(--color-danger)",
				i18n: "Keine Einverständniserklärungen vorhanden",
			},
		],
		showLdapHint: {
			type: Boolean,
		},
	}),
}));
