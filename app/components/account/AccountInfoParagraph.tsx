import React from 'react'

const AccountInfoParagraph = ({ color = 'text-foreground', children }: { color?: string, children: string }) => {
  return (
    <p className={`text-sm ${color}`}>{children}</p>
  )
}

export default AccountInfoParagraph