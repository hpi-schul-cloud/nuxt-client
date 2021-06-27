import federalStatesModule from "./federal-states";

jest.useFakeTimers();
describe("store/env-config", () => {
	describe("actions", () => {
		// describe("fetchFederalStates", () => {
		// 	it("should fetch federal states from server", async () => {
		// 		const serverResponseMock = {
		// 			_id: "0000b186816abba584714c53",
		// 			counties: [
		// 				{
		// 					antaresKey: "BRB",
		// 					_id: "5fa55eb53f472a2d986c8812",
		// 					countyId: 12051,
		// 					name: "Brandenburg an der Havel",
		// 				},
		// 				{
		// 					antaresKey: "CB",
		// 					_id: "5fa55eb53f472a2d986c8813",
		// 					countyId: 12052,
		// 					name: "Cottbus",
		// 				},
		// 			],
		// 			name: "Brandenburg",
		// 			abbreviation: "BB",
		// 			logoUrl:
		// 				"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Brandenburg_Wappen.svg/354px-Brandenburg_Wappen.svg.png",
		// 			__v: 0,
		// 		};
		// 		let receivedUrl;
		// 		federalStatesModule.actions.$axios = {
		// 			$get: (url) => {
		// 				receivedUrl = url;
		// 				return Promise.resolve({ data: serverResponseMock });
		// 			},
		// 		};
		// 		const spyCommit = jest.fn();
		// 		await federalStatesModule.actions.fetchFederalStates({
		// 			commit: spyCommit,
		// 		});
		// 		expect(receivedUrl).toBe("/federalStates");
		// 		expect(spyCommit.mock.calls).toHaveLength(3);
		// 		expect(spyCommit.mock.calls[0][0]).toBe("setRequestSuccessful");
		// 		expect(spyCommit.mock.calls[0][1]).toBe(false);
		// 		expect(spyCommit.mock.calls[1][0]).toBe("setFederalStates");
		// 		expect(spyCommit.mock.calls[1][1]).toStrictEqual({
		// 			...serverResponseMock,
		// 		});
		// 		expect(spyCommit.mock.calls[2][0]).toBe("setRequestSuccessful");
		// 		expect(spyCommit.mock.calls[2][1]).toBe(true);
		// 	});
		// });

		describe("fetchCurrentFederalState", () => {
			it("should fetch the specified federal state from server", async () => {
				const serverResponseMock = {
					antaresKey: "BRB",
					_id: "5fa55eb53f472a2d986c8812",
					countyId: 12051,
					name: "Brandenburg an der Havel",
				};
				let receivedUrl;
				federalStatesModule.actions.$axios = {
					$get: (url) => {
						receivedUrl = url;
						return Promise.resolve(serverResponseMock);
					},
				};
				const spyCommit = jest.fn();
				await federalStatesModule.actions.fetchCurrentFederalState(
					{
						commit: spyCommit,
					},
					"12345"
				);
				expect(receivedUrl).toBe("/federalStates/12345");
				expect(spyCommit.mock.calls).toHaveLength(3);
				expect(spyCommit.mock.calls[0][0]).toBe("setRequestSuccessful");
				expect(spyCommit.mock.calls[0][1]).toBe(false);
				expect(spyCommit.mock.calls[1][0]).toBe("setCurrentFederalState");
				expect(spyCommit.mock.calls[1][1]).toStrictEqual({
					...serverResponseMock,
				});
				expect(spyCommit.mock.calls[2][0]).toBe("setRequestSuccessful");
				expect(spyCommit.mock.calls[2][1]).toBe(true);
			});
		});
	});
});
