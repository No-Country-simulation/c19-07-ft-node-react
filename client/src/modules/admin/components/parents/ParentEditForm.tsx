import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomForm } from "../../../../components";
import { parentEditFormFields } from "../../constants";
import { EditParentFormData, editParentFormSchema } from "../../schemas";

interface ParentEditFormProps {
  userToEdit: EditParentFormData;
  onSubmit: (data: EditParentFormData) => void;
}

export const ParentEditForm = ({
  userToEdit,
  onSubmit,
}: ParentEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditParentFormData>({
    resolver: zodResolver(editParentFormSchema),
    defaultValues: userToEdit,
  });

  return (
    <CustomForm
      errors={errors}
      columns={{ xs: 6 }}
      register={register}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      submitButtonLabel={"Update"}
      formFields={parentEditFormFields}
    />
  );
};
