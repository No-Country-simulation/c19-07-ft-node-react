import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomForm } from "../../../../components";
import { parentEditFormFields } from "../../constants";
import { EditParentFormData, editParentFormSchema } from "../../schemas";

interface ParentEditFormProps {
  parentToEdit: EditParentFormData;
  onSubmit: (data: EditParentFormData) => void;
}

export const ParentEditForm = ({
  parentToEdit,
  onSubmit,
}: ParentEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditParentFormData>({
    resolver: zodResolver(editParentFormSchema),
    defaultValues: parentToEdit,
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
