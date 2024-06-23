import { useRoles } from '@/app/contexts/RolesContext'
import { RoleEnum } from '@/app/models/role.model'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Info } from 'lucide-react'
import React from 'react'

interface RoleDetailsProps {
  roleName: RoleEnum
}

const RoleDetails = ({ roleName }: RoleDetailsProps) => {

  const { roles } = useRoles();

  return (
    <Card className='hover:bg-secondary'>
      <CardHeader>
        <CardTitle>
          {roleName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <span className='text-muted-foreground'>Nom du groupe</span>
          <p className='text-lg font-semibold'>{roleName}</p>
        </div>
        <div>
          <span className='text-muted-foreground'>Membres</span>
          <p className='text-lg font-semibold'>{roles.find(role => roleName === role.name)?.users.length}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default RoleDetails