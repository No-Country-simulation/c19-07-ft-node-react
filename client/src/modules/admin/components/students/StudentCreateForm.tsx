import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomForm } from "../../../../components";
import { parentCreateFormFields } from "../../constants";
import { CreateParentFormData, createParentFormSchema } from "../../schemas";

interface StudentCreateFormProps {
  onSubmit: (data: CreateParentFormData) => void;
}

export const StudentCreateForm = ({ onSubmit }: StudentCreateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateParentFormData>({
    resolver: zodResolver(createParentFormSchema),
  });

  return (
    <CustomForm
      errors={errors}
      register={register}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      submitButtonLabel={"Create"}
      formFields={parentCreateFormFields}
    />
  );
};
