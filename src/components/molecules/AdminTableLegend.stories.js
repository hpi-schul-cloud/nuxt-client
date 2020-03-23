import { storiesOf } from "@storybook/vue";

import AdminTableLegend from "./AdminTableLegend";

storiesOf("5 Molecules/AdminTableLegend", module).add("default", () => ({
	components: { AdminTableLegend },
	template: `<admin-table-legend :icons="icons" :show-ldap-hint="true"/>`,
	data: () => ({
		icons: [
			{
				icon: "check",
				color: "var(--color-success)",
				style: "position: relative; left: -17.5px; margin-right: -1rem",
				i18n: "Alle Einverständniserklärungen vorhanden",
				class: "double",
			},
			{
				icon: "check",
				color: "var(--color-warning)",
				style: "margin-right: 0.5rem",
				i18n: "Eltern haben zugestimmt",
			},
			{
				icon: "clear",
				color: "var(--color-danger)",
				style: "margin-right: 0.5rem",
				i18n: "Keine Einverständniserklärungen vorhanden",
			},
		],
		showLdapHint: {
			type: Boolean,
		},
	}),
}));
