import { Server } from "@/app/models/server.model";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { Circle, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { FormattedRelativeTime } from "react-intl";
import DeleteServerDialog from "../dialogs/DeleteServerDialog";

interface ServerRowProps {
  server: Server;
}

const ServerRow = ({ server }: ServerRowProps) => {
  
  const now = new Date();
  const onlineSince = Math.floor((now.getTime() - new Date(server.onlineSince).getTime()) / 1000);
  const lastUpdate = Math.floor((now.getTime() - new Date(server.lastUpdate).getTime()) / 1000);
  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState(false);

  return (
    <TableRow className="cursor-pointer">
      <TableCell>
        {server.id}
      </TableCell>
      <TableCell>
        {server.ip}:{server.port}
      </TableCell>
      <TableCell>
        {server.status === 'ONLINE' && 
          <Badge className="bg-green-500 space-x-2 hover:bg-green-600">
            <Circle fill="green" className="w-2 h-2 text-transparent" />
            <span>En ligne</span>
          </Badge>
        }
        {server.status === 'OFFLINE' && 
          <Badge variant='destructive' className="space-x-2">
            <Circle fill="red" className="w-2 h-2 text-transparent" />
            <span>Hors ligne</span>
          </Badge>
        }
        {server.status === 'MAINTENANCE' && 
          <Badge className="bg-yellow-300 space-x-2 hover:bg-yellow-400">
            <Circle fill="orange" className="w-2 h-2 text-transparent" />
            <span className="text-yellow-600">Maintenance</span>
          </Badge>
        }
      </TableCell>
      <TableCell>
        {server.onlinePlayers}
      </TableCell>
      <TableCell>
        <FormattedRelativeTime 
          value={-lastUpdate}
          updateIntervalInSeconds={1}
        />
      </TableCell>
      <TableCell>
        <FormattedRelativeTime 
          value={-onlineSince}
          updateIntervalInSeconds={1}
        />
      </TableCell>
      <TableCell>
        {server.primary &&
        <Badge>
          Principal
        </Badge>
        }
        {!server.primary &&
        <Badge variant='outline'>
          Secondaire
        </Badge>
        }
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup='true'
              size='icon'
              variant='ghost'
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem disabled>
              Éditer
            </DropdownMenuItem>
            <DropdownMenuItem
              onClickCapture={() => {
                navigator.clipboard.writeText(server.token);
                toast({title: 'Cinq sur cinq', description: "Jeton d'authentification copié dans le presse-papiers !"})
              }}
            >
              Obtenir le jeton
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-destructive">
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog 
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <DeleteServerDialog serverId={server.id} />
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}

export default ServerRow