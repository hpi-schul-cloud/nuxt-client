import { storiesOf } from "@storybook/vue";

import LdapRolesSection from "./LdapRolesSection";

storiesOf("6 Organisms/Ldap Page/Ldap Roles Section", module).add(
	"LdapRolesSection",
	() => {
		return {
			components: { LdapRolesSection },
			template: `<ldap-roles-section v-model="ldapConfigData" />`,
			data: () => ({
				ldapConfigData: {
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
