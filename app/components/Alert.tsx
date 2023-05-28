'use client';

import React from 'react'
import { Toaster } from 'react-hot-toast';
import Toast from './Toast';

export default function Alert() {
    return (
        <Toaster>
            {(t) => (
                <Toast toast={t} />
            )}
        </Toaster>
    )
}
