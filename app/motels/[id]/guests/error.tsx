'use client';

import React from 'react'
import EmptyList from '../../../components/EmptyList'
import errorImage from '../../../../public/assets/images/error.png'
import CustomButton from '../../../components/Button';
import { useRouter } from 'next/navigation';

export default function Error() {
    const { refresh } = useRouter();
    return (
        <EmptyList  
            title="Something went wrong"
            caption="Please try again later"
            imageSrc={errorImage}
        >
            <div className="flex justify-center mt-5">
                <CustomButton className="text-white text-[13px] font-mono bg-black border-none hover:bg-gray-700 transition-all rounded-md h-10 flex items-center justify-center whitespace-nowrap" onClick={refresh}>Try again</CustomButton>
            </div>
        </EmptyList>
    )
}
