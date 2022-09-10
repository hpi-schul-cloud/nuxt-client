/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Code from "@ckeditor/ckeditor5-basic-styles/src/code.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import Image from "@ckeditor/ckeditor5-image/src/image.js";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle.js";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar.js";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload.js";
//import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from "@ckeditor/ckeditor5-link/src/link.js";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import MathType from "@wiris/mathtype-ckeditor5";
//import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript.js";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript.js";
import Table from "@ckeditor/ckeditor5-table/src/table.js";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation.js";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline.js";
import Markdown from "@ckeditor/ckeditor5-markdown-gfm/src/markdown";
import HelloWorld from "./plugins/helloworld";

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Markdown,
	HelloWorld,
	BlockQuote,
	Bold,
	Code,
	Essentials,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	//Italic,
	Link,
	List,
	MathType,
	//MediaEmbed,
	Paragraph,
	Subscript,
	Superscript,
	Table,
	TableToolbar,
	TextTransformation,
	Underline,
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			"undo",
			"redo",
			"heading",
			"|",
			"bold",
			//'italic',
			"underline",
			"blockQuote",
			"code",
			"superscript",
			"subscript",
			"link",
			"bulletedList",
			"numberedList",
			"|",
			"MathType",
			"|",
			"imageUpload",
			"insertTable",
			//'mediaEmbed',
			"|",
			"helloworld",
		],
	},
	language: "de",
	image: {
		toolbar: [
			"imageTextAlternative",
			"imageStyle:inline",
			"imageStyle:block",
			"imageStyle:side",
		],
	},
	table: {
		contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
	},
};

export default Editor;
