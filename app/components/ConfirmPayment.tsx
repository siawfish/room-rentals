'use Client';

import { Dialog } from '@headlessui/react'
import Modal from './Modal'

interface Props {
    open: boolean;
    onClose: () => void;
    title: string;
    message: string;
    onConfirm: () => void;
    isLoading?: boolean;
}

export default function ConfirmPayment({
    open,
    onClose,
    title="Confirm Payment",
    message="Are you sure you want to confirm payment for this rental? This action will be recorded under the rental history.",
    onConfirm
}: Props) {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    {title}
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        {message}
                    </p>
                </div>

                <div className="mt-4">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-[13px] font-mono font-medium text-black-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={onConfirm}
                    >
                        Got it, Confirm!
                    </button>
                </div>
            </>
        </Modal>
    )
}
