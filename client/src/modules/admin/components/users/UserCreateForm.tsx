import { useState } from "react";

import {
  Grid,
  Button,
  MenuItem,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const userFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long").optional(),
  typeUser: z.string().refine((value) => {
    return ["STUDENT", "PARENTS", "PROFESSOR", "AMDMIN"].includes(value);
  }).optional(),
});

export type UserFormData = z.infer<typeof userFormSchema>;

interface UserFormProps {
  userToEdit?: UserFormData;
  onSubmit: (data: UserFormData) => void;
}

export const UserCreateForm = ({ userToEdit, onSubmit }: UserFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: { ...userToEdit },
  });

  console.log(userToEdit)
  const typeUserValue = watch("typeUser");

  return (
    <Grid
      container
      columns={{ xs: 6, sm: 12 }}
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

      {userToEdit == undefined && (
        <>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="standard"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              select={false}
              label="Role"
              variant="standard"
              value={typeUserValue}
              {...register("typeUser")}
              error={!!errors.typeUser}
              helperText={errors.typeUser?.message}
            >
              <MenuItem value="STUDENT">Student</MenuItem>
              <MenuItem value="PARENTS">Parent</MenuItem>
              <MenuItem value="PROFESSOR">Teacher</MenuItem>
            </TextField>
          </Grid>
        </>
      )}

      <Grid item xs={12} sm={3}>
        <Button fullWidth type="submit" variant="contained">
          {userToEdit ? "Update" : "Create"}
        </Button>
      </Grid>
    </Grid>
  );
};
