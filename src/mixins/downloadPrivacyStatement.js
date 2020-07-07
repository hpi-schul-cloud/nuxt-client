export default {
    methods: {
        async $_downloadContent_download() {

        const data = await this.$axios.$get(
            `base64Files/${this.consentVersion.consentDataId}`
        );
        const downloadLink = document.createElement("a");
        downloadLink.href = data.data;
        downloadLink.download = "Datenschutzerklärung-der-Schule.pdf";
        downloadLink.click();
    },
}
}
