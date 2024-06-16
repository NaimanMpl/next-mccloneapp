import { useRoles } from "@/app/contexts/RolesContext"
import { deletePermission } from "@/app/services/roleservice"
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { MouseEventHandler } from "react"

interface DeletePermissionDialogProps {
  permissionName: string,
  permissionId: number
}

const DeletePermissionDialog = ({ permissionName, permissionId }: DeletePermissionDialogProps) => {

  const { roles, setRoles } = useRoles();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      await deletePermission(permissionId);
      toast({ title: 'Succès', description: `La permission ${permissionName} a été supprimée.`, variant: 'default' });
      setRoles(roles => roles.map(role => ({...role, permissions: role.permissions.filter(permission => permission.id !== permissionId)})))
    } catch (e) {
      const message = (e as Error).message;
      toast({ title: 'Uh-oh', description: message, variant: 'destructive' });
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Supprimer la permission {permissionName}</AlertDialogTitle>
        <AlertDialogDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, animi.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction onClick={handleSubmit}>Supprimer</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default DeletePermissionDialog