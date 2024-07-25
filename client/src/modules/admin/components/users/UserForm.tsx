import { Grid, MenuItem, TextField } from "@mui/material";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const userFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  type_user: z.string(),
});

interface UserFormProps {
  onSubmit: (data: z.infer<typeof userFormSchema>) => void;
}

export const UserForm = ({ onSubmit }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {},
  });

  return (
    <Grid
      container
      spacing={3}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Name"
          type="text"
          variant="standard"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="standard"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="standard"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          select
          label="Role"
          variant="standard"
          {...register("type_user")}
          error={!!errors.type_user}
          helperText={errors.type_user?.message}
        >
          <MenuItem value="STUDENT">Student</MenuItem>
          <MenuItem value="PARENTS">Parent</MenuItem>
          <MenuItem value="PROFESSOR">Teacher</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};
