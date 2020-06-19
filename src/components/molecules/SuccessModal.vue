<template>
    <base-modal :active="showSuccessModal">
        <template v-slot:body>
            <modal-body-info :title="msg">
                <template v-slot:icon>
                    <base-icon
                            source="material"
                            icon="check_circle"
                            style="color: var(--color-success);"
                    />
                </template>
            </modal-body-info>
        </template>
        <template v-slot:footer>
            <modal-footer-confirm text="Ok" @click="closeModal" />
        </template>
    </base-modal>
</template>

<script>
    import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
    import ModalFooterConfirm from "@components/molecules/ModalFooterConfirm";
    export default {
        name: "SuccessModal",
        components: {
            ModalBodyInfo,
            ModalFooterConfirm,
        },
        props: {
            msg: { type: String, default: "" },
            showSuccessModal: {
                type: Boolean,
                required: true,
            },
        },
        methods: {
            closeModal() {
                this.showSuccessModal = false;
            },
        }
    }
</script>

<style scoped>

</style>