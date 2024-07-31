import { TablePagination } from "@mui/material";

import { parentTableColumns } from "../../constants";
import { useContextParent, useModal } from "../../hooks";
import { CustomTable, CustomDialog } from "../../../../components";
import { CreateParentFormData, EditParentFormData } from "../../schemas";

import { ParentEditForm } from "./ParentEditForm";
import { ParentCreateForm } from "./ParentCreateForm";
import { showStatusSnackbar } from "../../../../helpers";

interface ParentTableProps {
  openCreateModal: boolean;
  closeCreateModal: () => void;
}

export const ParentTable = ({
  openCreateModal,
  closeCreateModal,
}: ParentTableProps) => {
  const { closeModal, openModal, modalState } = useModal();
  const { parent, filter, setFilter, createParent, updateParent } =
    useContextParent();

  // ? Creation
  const handleSubmitCreateForm = async (data: CreateParentFormData) => {
    await createParent(data)
      .then((res) => {
        showStatusSnackbar(res);
        closeCreateModal();
      })
      .catch((error) => {
        showStatusSnackbar(error);
      });
  };

  // ? Update
  const handleEdit = (row: any) => {
    openModal("edit", {
      user_id: row.user_id,
      name: row.name,
      email: row.email,
    });
  };

  const handleSubmitEditForm = async (data: EditParentFormData) => {
    await updateParent(modalState.payload?.user_id, data)
      .then((res) => {
        showStatusSnackbar(res);
        closeModal();
      })
      .catch((error) => {
        showStatusSnackbar(error);
      });
  };

  // ? Pagination
  const handleChangePage = (_: any, newPage: number) => {
    setFilter((prev) => ({
      ...prev,
      page: String(newPage + 1),
    }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter((prev) => ({
      ...prev,
      limit: event.target.value,
      page: "1",
    }));
  };

  if (parent === null) return <p>Loading...</p>;

  return (
    <CustomTable
      actions={["edit"]}
      rows={parent.data.items}
      columns={parentTableColumns}
      onEdit={handleEdit}
      onDelete={() => {}}
      isLoading={false}
    >
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        component="div"
        count={parent.data.meta.totalItems}
        rowsPerPage={Number(filter.limit)}
        page={Number(filter.page) - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <CustomDialog
        open={modalState.type === "edit"}
        onClose={closeModal}
        title="Edit Parent"
        sx={{ width: "450px" }}
      >
        <ParentEditForm
          parentToEdit={modalState.payload}
          onSubmit={handleSubmitEditForm}
        />
      </CustomDialog>

      <CustomDialog
        open={openCreateModal}
        onClose={closeCreateModal}
        title="Create Parent"
      >
        <ParentCreateForm onSubmit={handleSubmitCreateForm} />
      </CustomDialog>
    </CustomTable>
  );
};