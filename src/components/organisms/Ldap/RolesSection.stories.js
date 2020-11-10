import { storiesOf } from "@storybook/vue";

import RolesSection from "./RolesSection";

storiesOf("6 Organisms/Ldap Page/RolesSection", module).add(
	"RolesSection",
	() => {
		return {
			components: { RolesSection },
			template: `<roles-section :data="fetchedData" />`,
			data: () => ({
				fetchedData: {
					member: "description",
					student: "cn=schueler,ou=rolle",
					teacher: "cn=lehrer,ou=rolle",
					admin: "cn=admin,ou=rolle",
					user: "cn=ehemalige,ou=rolle",
				},
			}),
			methods: {},
		};
	}
);
