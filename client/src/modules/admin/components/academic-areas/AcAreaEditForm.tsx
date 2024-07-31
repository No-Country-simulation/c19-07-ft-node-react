import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomForm } from "../../../../components";
import { acAreaEditFormFields } from "../../constants";
import { EditAcAreaFormData, editAcAreaFormSchema } from "../../schemas";

interface AcAreaEditFormProps {
  userToEdit: EditAcAreaFormData;
  onSubmit: (data: EditAcAreaFormData) => void;
}

export const AcAreaEditForm = ({
  userToEdit,
  onSubmit,
}: AcAreaEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditAcAreaFormData>({
    resolver: zodResolver(editAcAreaFormSchema),
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
      formFields={acAreaEditFormFields}
    />
  );
};
