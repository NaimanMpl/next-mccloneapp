import { UsersProvider } from "@/app/contexts/UsersContext";
import * as hooks from '@/app/hooks/useAddUserForm';
import { useAddUserForm } from "@/app/hooks/useAddUserForm";
import { Dialog } from "@/components/ui/dialog";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddUserDialog from "../AddUserDialog";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/app/hooks/useAddUserForm', () => ({
  onSubmit: jest.fn()
}))

describe('<AddUserDialog />', () => {
  
  it('should not submit the form with empty fields', async () => {
    render(
      <>
        <UsersProvider>
          <Dialog open>
            <AddUserDialog />
          </Dialog>
        </UsersProvider>
        <Toaster />
      </>
    );

    const submitButton = screen.getByText('Sauvegarder');
    fireEvent.click(submitButton);

    const { onSubmit } = useAddUserForm();
    expect(onSubmit).not.toHaveBeenCalled();
  })

}) 