import Image from 'next/image'
import React, { ReactNode } from 'react'
import AccountInfoParagraph from './AccountInfoParagraph'

interface AccountInfoCardProps {
  title: string,
  children: ReactNode,
  borderColor?: string,
  tipBgColor?: string,
  img?: string,
  tip: string,
  button?: ReactNode
}

const AccountInfoCard = ({ title, children, img, tip, borderColor = 'border-neutral-700', tipBgColor = 'bg-transparent', button }: AccountInfoCardProps) => {
  return (
    <div>
      <div className={`bg-black flex justify-between w-full gap-10 px-6 py-7 border border-solid ${borderColor} rounded-t-md`}>
        <div className=''>
          <h2 className='text-xl font-semibold pb-4'>{title}</h2>
          {children}
        </div>
        {img && <img className='rounded-full w-24 h-24' src={img} alt='' />}
      </div>
      <div className={`${tipBgColor} relative px-6 py-4 border w-full border-solid ${borderColor} border-t-transparent rounded-b-md ${tipBgColor} `}>
        <AccountInfoParagraph color='text-neutral-400'>{tip}</AccountInfoParagraph>
        <div className='absolute right-6 top-1/2 -translate-y-1/2'>
          {button}
        </div>
      </div>
    </div>
  )
}

export default AccountInfoCard