import { RoleEnum } from "@/app/models/role.model"
import { Badge } from "@/components/ui/badge"
import { EnumDictionnary } from "@/lib/utils"

interface RoleBadgeProps {
  role: RoleEnum
}

const RoleBadge = ({ role }: RoleBadgeProps) => {

  const roleCircleColors: EnumDictionnary<RoleEnum, string> = {
    [RoleEnum.Joueur] : 'bg-neutral-50',
    [RoleEnum.Administrateur] : 'bg-red-500'
  }
  

  return (
    <Badge 
      className='gap-2 flex items-center w-fit'
      variant={role}
    >
      <div className={`w-2 h-2 ${roleCircleColors[role]} rounded-full`}></div>
      {role}
    </Badge>
  )
}

export default RoleBadge