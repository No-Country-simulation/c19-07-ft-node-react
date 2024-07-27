import { TablePagination } from "@mui/material";
import {
    ConfirmModal,
    CustomDialog,
    CustomTable,
} from "../../../../components";
import { useContextUser } from "../../components/hooks/useContextUser";
import { userTableColumns } from "../../pages/AdminUsersPage";
import { useModal } from "../hooks/useModal";
import { UserForm } from "./UserForm";
export const TableUser = () => {
  const { user, deleteUser, filter, setFilter } = useContextUser();
  const { closeModal, openModal, modalState } = useModal();
  const handleDeleteUser = (row: { user_id: string; name: string }) => {
    openModal("delete", row);
  };
  const handleEditUser = (row: { user_id: string }) => {
    openModal("edit", row);
  };
  const handleUpdateOrCreateUser = (row: string) => {
    console.log("esty aca en update o create-->", row);
  };
  const handleChangePage = (_: any, newPage: number) => {
    setFilter((prev) => ({
      ...prev,
      page:String(newPage + 1),
    }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      limit: event.target.value,
      page: '1', 
    }));
  };
  if (user === null) return <p>...cargando</p>;
  return (
    <>
      <CustomTable
        rows={user.data.items}
        columns={userTableColumns}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        isLoading={false}
      >
        <TablePagination
          rowsPerPageOptions={[10,20,30,40,50]}
          component="div"
          count={user.data.meta.totalItems}
          rowsPerPage={Number(filter.limit)}
          page={Number(filter.page) - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <CustomDialog
          open={modalState.type === "edit"}
          onClose={closeModal}
          title={"Edit User"}
        >
          <UserForm
            userToEdit={modalState.payload}
            onSubmit={handleUpdateOrCreateUser}
          />
        </CustomDialog>

        <ConfirmModal
          open={modalState.type === "delete"}
          onClose={closeModal}
          confirmText={`Are you sure to delete the user "${modalState.payload?.name}"?`}
          onConfirmDeletion={() =>
            deleteUser(modalState.payload?.user_id).then(closeModal)
          }
        />
      </CustomTable>
    </>
  );
};
