'use client';

import { useGetServersQuery } from "@/app/api/slice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListFilter, Plus, Search } from "lucide-react";
import ServerRow from "./ServerRow";
import ServerRowSkeleton from "./SeverRowSkeleton";

const ServersTableContainer = () => {

  const { data, isLoading, error } = useGetServersQuery();

  return (
    <div className='mt-6'>
      <Card>
        <CardHeader>
          <CardTitle>Serveurs</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, tempora!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end gap-2 pb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className='mr-auto flex gap-2'>
                  <Plus className='w-5 h-5'/>
                  Ajouter un serveur
                </Button>
              </DialogTrigger>
            </Dialog>
            <div className="relative lg:w-96">
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input className='pl-8' placeholder='Rechercher' />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-1 text-sm'
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span>Filtrer</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Adresse IP
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Status
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Nombre de joueurs
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Adresse IP</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joueurs connectés</TableHead>
                <TableHead>Dernière mis à jour</TableHead>
                <TableHead>En ligne depuis</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                Array.from({ length: 10 }).map((item, index) => (
                  <ServerRowSkeleton key={index} />
                ))
              )}
              {data && data.map(server => (
                <ServerRow key={server.id} server={server} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ServersTableContainer;