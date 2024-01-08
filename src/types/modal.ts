export type ModalProps = {
    title?: string,
    children: React.ReactNode,
    toggle: () => void
};

export type ModalOverlayProps = {
    children: React.ReactNode,
    toggle: () => void
};
