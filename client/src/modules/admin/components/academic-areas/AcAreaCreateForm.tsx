import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomForm } from "../../../../components";
import { acAreaCreateFormFields } from "../../constants";
import { CreateAcAreaFormData, createAcAreaFormSchema } from "../../schemas";

interface AcAreaCreateFormProps {
  onSubmit: (data: CreateAcAreaFormData) => void;
}

export const AcAreaCreateForm = ({ onSubmit }: AcAreaCreateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAcAreaFormData>({
    resolver: zodResolver(createAcAreaFormSchema),
  });

  return (
    <CustomForm
      columns={{ xs: 6 }}
      errors={errors}
      register={register}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      submitButtonLabel={"Create"}
      formFields={acAreaCreateFormFields}
    />
  );
};
