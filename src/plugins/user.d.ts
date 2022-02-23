import Vue from "vue";

interface User {
	_id: number;
	name: string;
	schoolId: string;
	firstName: string;
	lastName: string;
}

declare module "vue/types/vue" {
	interface Vue {
		$user: User;
	}
}
