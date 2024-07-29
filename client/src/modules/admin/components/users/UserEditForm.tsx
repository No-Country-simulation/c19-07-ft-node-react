import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomForm } from "../../../../components";
import { userEditFormFields } from "../../constants";
import { EditUserFormData, editUserFormSchema } from "../../schemas";

interface UserEditFormProps {
  userToEdit: EditUserFormData;
  onSubmit: (data: EditUserFormData) => void;
}

export const UserEditForm = ({ userToEdit, onSubmit }: UserEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: userToEdit,
  });

  return (
    <CustomForm
      errors={errors}
      register={register}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      submitButtonLabel={"Update"}
      formFields={userEditFormFields}
    />
  );
};
