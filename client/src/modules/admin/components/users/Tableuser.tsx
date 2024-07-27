import { TablePagination } from "@mui/material";
import {
  ConfirmModal,
  CustomDialog,
  CustomTable,
} from "../../../../components";
import { useContextUser } from "../../components/hooks/useContextUser";
import { userTableColumns } from "../../pages/AdminUsersPage";
import { usePaginate } from "../hooks/usePaginate";
import { useModal } from "../hooks/useModal";
import { UserForm } from "./UserForm";
export const TableUser = () => {
  const { user, deleteUser } = useContextUser();
  const { closeModal, openModal, modalState } = useModal();
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } =
    usePaginate(1, 2);
  const handleDeleteUser = (row: { user_id: string; name: string }) => {
    openModal("delete", row);
  };
  const handleEditUser = (row: { user_id: string }) => {
    openModal("edit", row);
  };
  const handleUpdateOrCreateUser = (row: string) => {
    console.log("esty aca en update o create-->", row);
  };
  if (user === null) return <p>...cargando</p>;
  console.log("table,user", {rowsPerPage,page});
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
          rowsPerPageOptions={[1, 2, 3, 4, 5]}
          component="div"
          count={user.data.meta.totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => handleChangePage(e, newPage)}
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
