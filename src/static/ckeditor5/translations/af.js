!(function (e) {
	const n = (e.af = e.af || {});
	(n.dictionary = Object.assign(n.dictionary || {}, {
		"%0 of %1": "%0 van %1",
		"Block quote": "Verwysingsaanhaling",
		Bold: "Vet",
		Cancel: "Kanselleer",
		Code: "Bronkode",
		Italic: "Kursief",
		Save: "Stoor",
		"Show more items": "Wys meer items",
		Subscript: "Onderskrif",
		Superscript: "Boskrif",
		Underline: "Onderstreep",
	})),
		(n.getPluralForm = function (e) {
			return 1 != e;
		});
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));
