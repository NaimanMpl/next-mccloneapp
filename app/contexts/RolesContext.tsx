import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { RoleData } from "../models/role.model";
import { getRolesAndTheirUsers } from "../services/roleservice";

interface IRolesContext {
  roles: RoleData[],
  setRoles: Dispatch<SetStateAction<RoleData[]>>
}

const RolesContext = createContext<IRolesContext | undefined>(undefined);

export const RolesProvider = ({ children }: { children: ReactNode }) => {
  
  const [ roles, setRoles ] = useState<RoleData[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const rolesAndUsers = await getRolesAndTheirUsers();
      setRoles(rolesAndUsers);
    }

    fetchRoles();
  }, []);

  return (
    <RolesContext.Provider value={{ roles, setRoles }}>
      {children}
    </RolesContext.Provider>
  )
}

export const useRoles = () => {
  const context = useContext(RolesContext);
  if (context === undefined) {
    throw new Error('useRoles must be used within a RolesProvider');
  }
  return context;
}