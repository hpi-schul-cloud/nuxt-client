!(function (e) {
	const a = (e.hr = e.hr || {});
	(a.dictionary = Object.assign(a.dictionary || {}, {
		"%0 of %1": "%0 od %1",
		Aquamarine: "Akvamarin",
		Black: "Crna",
		"Block quote": "Blok citat",
		Blue: "Plava",
		Bold: "Podebljano",
		"Break text": "Prelomi tekst",
		"Bulleted List": "Obična lista",
		Cancel: "Poništi",
		"Centered image": "Centrirana slika",
		"Change image text alternative": "Promijeni alternativni tekst slike",
		"Choose heading": "Odaberite naslov",
		Code: "Kod",
		Column: "Kolona",
		"Delete column": "Obriši kolonu",
		"Delete row": "Obriši red",
		"Dim grey": "Tamnosiva",
		Downloadable: "Moguće preuzeti",
		"Dropdown toolbar": "Traka padajućeg izbornika",
		"Edit block": "Uredi blok",
		"Edit link": "Uredi vezu",
		"Editor toolbar": "Traka uređivača",
		"Enter image caption": "Unesite naslov slike",
		"Full size image": "Slika pune veličine",
		Green: "Zelena",
		Grey: "Siva",
		"Header column": "Kolona zaglavlja",
		"Header row": "Red zaglavlja",
		Heading: "Naslov",
		"Heading 1": "Naslov 1",
		"Heading 2": "Naslov 2",
		"Heading 3": "Naslov 3",
		"Heading 4": "Naslov 4",
		"Heading 5": "Naslov 5",
		"Heading 6": "Naslov 6",
		"Image toolbar": "Traka za slike",
		"image widget": "Slika widget",
		"In line": "U istom redu",
		"Insert column left": "Umetni stupac lijevo",
		"Insert column right": "Umetni stupac desno",
		"Insert image": "Umetni sliku",
		"Insert paragraph after block": "Umetni odlomak poslije bloka",
		"Insert paragraph before block": "Umetni odlomak prije bloka",
		"Insert row above": "Ubaci red iznad",
		"Insert row below": "Ubaci red ispod",
		"Insert table": "Ubaci tablicu",
		Italic: "Ukošeno",
		"Left aligned image": "Lijevo poravnata slika",
		"Light blue": "Svijetloplava",
		"Light green": "Svijetlozelena",
		"Light grey": "Svijetlosiva",
		Link: "Veza",
		"Link URL": "URL veze",
		"Merge cell down": "Spoji ćelije prema dolje",
		"Merge cell left": "Spoji ćelije prema lijevo",
		"Merge cell right": "Spoji ćelije prema desno",
		"Merge cell up": "Spoji ćelije prema gore",
		"Merge cells": "Spoji ćelije",
		Next: "Sljedeći",
		"Numbered List": "Brojčana lista",
		"Open in a new tab": "Otvori u novoj kartici",
		"Open link in new tab": "Otvori vezu u novoj kartici",
		Orange: "Narančasta",
		Paragraph: "Paragraf",
		Previous: "Prethodni",
		Purple: "Ljubičasta",
		Red: "Crvena",
		Redo: "Ponovi",
		"Rich Text Editor": "Rich Text Editor",
		"Rich Text Editor, %0": "Rich Text Editor, %0",
		"Right aligned image": "Slika poravnata desno",
		Row: "Red",
		Save: "Snimi",
		"Select all": "Odaberi sve",
		"Select column": "Odaberi stupac",
		"Select row": "Odaberi redak",
		"Show more items": "Prikaži više stavaka",
		"Side image": "Slika sa strane",
		"Split cell horizontally": "Razdvoji ćeliju vodoravno",
		"Split cell vertically": "Razdvoji ćeliju okomito",
		Subscript: "Indeks",
		Superscript: "Eksponent",
		"Table toolbar": "Traka za tablice",
		"Text alternative": "Alternativni tekst",
		"This link has no URL": "Ova veza nema URL",
		"Toggle caption off": "Isključite natpis",
		"Toggle caption on": "Uključite natpis",
		Turquoise: "Tirkizna",
		Underline: "Podcrtavanje",
		Undo: "Poništi",
		Unlink: "Ukloni vezu",
		"Upload failed": "Slanje nije uspjelo",
		"Upload in progress": "Slanje u tijeku",
		White: "Bijela",
		"Widget toolbar": "Traka sa spravicama",
		"Wrap text": "Prelamanje teksta",
		Yellow: "Žuta",
	})),
		(a.getPluralForm = function (e) {
			return e % 10 == 1 && e % 100 != 11
				? 0
				: e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20)
				? 1
				: 2;
		});
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));
