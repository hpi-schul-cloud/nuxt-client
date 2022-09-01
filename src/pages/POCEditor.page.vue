<template>
	<div>
		<default-wireframe headline="POC - Editor CKEditor 5" :full-width="false">
			<ckeditor
				v-model="editorData"
				:editor="editor"
				:config="editorConfig"
			></ckeditor>
		</default-wireframe>
	</div>
</template>
<script>
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/de";
// import MathType from '@wiris/mathtype-ckeditor5';

// https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/frameworks/vuejs-v2.html#using-the-component-locally

export default {
	components: {
		DefaultWireframe,
		ckeditor: CKEditor.component,
	},
	layout: "defaultVuetify",
	data() {
		return {
			editor: ClassicEditor,
			editorData: `<iframe src="https://www.google.com" style="width: 300px; height: 100px">This iframe should be converted into safe text.</iframe>
			<br>
			Es handelt sich um eine Drehung der Figur um 180°.
			"<h3>Mit wenigen Buchstaben, Ziffern &amp; Sonderzeichen k&ouml;nnt ihr ein eindrucksvolles Bild der <a href=\"https://artikel.de.softonic.com/ascii-kunst-bilder-aus-textzeichen-zaubern\">ASCII-Kunstrichtung</a> selbst erstellen.</h3>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"https://s3.hidrive.strato.com/cloud-instances/default/images/hero.svg\" style=\"height:353px; width:500px\" /></p>\r\n\r\n<p>&copy; Softonic&nbsp;International S.A. 1997-2016&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<div data-oembed-url=\"https://web.de/\">\r\n<div style=\"left: 0; width: 700px; height: 400px; position: relative; \"><iframe allowfullscreen=\"\" scrolling=\"no\" src=\"https://s3.hidrive.strato.com/cloud-instances/default/images/hero.svg/\" style=\"border: 0; top: 0; left: 0; width:  700px; height: 400px; position: relative;\" tabindex=\"-1\"></iframe></div>\r\n</div>\r\n\r\n<p>&nbsp;</p>\r\n\r\n
			<ul>\r\n\t<li>&Uuml;berlegungen am Einheitskreis</li>\r\n\t<li>Sinus, Cosinus, Tangens</li>\r\n</ul>\r\n
<h2>h1</h2>
<h3>h2</h3>
<p>h3</p>
<p><img src="https://s3.hidrive.strato.com/cloud-instances/default/images/hero.svg" style="height:30px; width:30px" />Bearbeite das Quiz.</p>\r\n
<p>some
	<strong>bold</strong>
	<i>italic</i>
	<u>underline</u>
	<s>strike-through</s>
	<sub>sub</sub> and
	<sup>sup</sup>
</p>
<p>checking span
	<span style="color:#F44336">color</span> and
	<span style="background-color:#9C27B0">background color</span>
</p>
<blockquote>
	<p>and some blockquote</p>
</blockquote>
<p>come code comes here:
	<code>while (editor) { alert('does it render?') }</code>
</p>
<p>Line:<hr />
</p>
<p>
	<ol>
		<li>ordered list</li>
	</ol>
	<ul>
		<li>unordered list</li>
	</ul>
</p>
<p>symbols $₹₻≡⇒</p>
<p>Some <a href="http://www.gogle.com">Link</a></p>
<p>
	<figure class="table">
<table>
	<tbody>
	<tr>
			<th>Col 1</th>
			<th>Col 2</th>
			<th>Col 3</th>
		</tr>
		<tr>
			<td>table td 1 1</td>
			<td>table td 1 2</td>
			<td rowspan="2">merged table rows</td>
		</tr>
		<tr>
			<td>table td 2 1</td>
			<td>table td 2 2</td>
		</tr>
	</tbody>
</table>
	</figure>
</p>
<p>Math formula: <span class="math-tex">\\(x = {-b \\pm \\sqrt{b^2-4ac} \\over 3a}\\)</span></p>
<p>IMAGE:
	<figure class="image"><img src="http://192.168.1.136/cat.jpg" alt="alt image attr"></figure>
</p>
<p>VIDEO:</p>
	<video src="http://192.168.1.136/film.mp4" controls="true" controlslist="nodownload"></video>
<p>AUDIO:</p>
<audio src="http://192.168.1.136/musik.mp3" controls="true" controlslist="nodownload"></audio>
,`,
			editorConfig: {
				language: "de",
				/*
				editorDisabled: true,
				plugins: [ MathType ],
        		toolbar: [ 'MathType' ] */
			},
		};
	},
	mounted() {},
	methods: {},
};
</script>
