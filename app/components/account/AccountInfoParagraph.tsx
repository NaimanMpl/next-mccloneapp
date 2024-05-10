import React from 'react'

const AccountInfoParagraph = ({ color = 'text-neutral-50', children }: { color?: string, children: string }) => {
  return (
    <p className={`text-sm ${color}`}>{children}</p>
  )
}

export default AccountInfoParagraph