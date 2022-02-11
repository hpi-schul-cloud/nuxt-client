import Vuetify from "vuetify";
import importUsers from "./importUsers";
import SchoolsModule from "@/store/schools";

const schoolMock = {
	_id: "5f2987e020834114b8efd6f8",
	officialSchoolNumber: "100000",
	inMaintenance: true,
	inUserMigration: true,
};

/*
const importUsersMock = {
	"total": 23,
	"skip": 5,
	"limit": 5,
	"data": [
		{
			"flagged": false,
			"importUserId": "6204fe1d0da0925bf74100c7",
			"loginName": "dennist1",
			"firstName": "Dennis",
			"lastName": "Timm",
			"roleNames": [
				"student"
			],
			"classNames": [
				"1c"
			],
			"match": {
				"userId": "0000d213816abba584714c0a",
				"loginName": "admin@schul-cloud.org",
				"firstName": "Thorsten",
				"lastName": "Test",
				"roleNames": [
					"admin"
				],
				"matchedBy": "admin"
			}
		},
		{
			"flagged": false,
			"importUserId": "6204fe1d0da0925bf7410162",
			"loginName": "bettina.melzer",
			"firstName": "Bettina",
			"lastName": "Melzer",
			"roleNames": [
				"admin",
				"teacher"
			],
			"classNames": [
				"4b"
			]
		},
	]
};*/

describe("importUsers", () => {
	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(importUsers));

	describe("show import users table", () => {
		beforeEach(() => {
			SchoolsModule.setSchool(schoolMock);
		});
	});

	it("should show error message if school is not in userMigration", () => {
		schoolMock.inUserMigration = false;
		SchoolsModule.setSchool(schoolMock);
		const wrapper = mount(importUsers, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					vueMeta: true,
					dialog: true,
				},
				vuetify
			),
		});
		const findText = wrapper.find(".v-alert");
		const errorMsg = wrapper.vm.$i18n.t(
			"pages.administration.migration.cannotStart"
		);
		expect(findText.html().replace(/\s/g, "")).toContain(
			errorMsg.replace(/\s/g, "")
		);
	});
});
