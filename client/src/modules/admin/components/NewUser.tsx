// import { ArrowBack } from "@mui/icons-material";
// import {
//   Box,
//   Container,
//   Grid,
//   IconButton,
//   TextField,
//   Typography,
//   Button,
//   FormControl,
//   FormGroup,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import schoolMetricsApi from "../../../apis/schoolMetricsApi";
// import { useState } from "react";

// const NewUser = () => {
//   const [dataUser, setDataUser] = useState({
//     name: "lina",
//     email: "ana@gmail.com",
//     password: "ana1234567",
//     type_user: "PARENTS",
//   });
//   const [dataParent, setDataParent] = useState({ parentId: "", relation: "" });
//   const [dataStudent, setDataStudent] = useState({
//     userId: "",
//     parentId: "",
//     telephone: "",
//     age: 0,
//     grade: "",
//     section: "",
//     educationalLevelId: "",
//   });

//   const typeUsers = ["PROFESSOR", "STUDENT", "PARENTS"];

//   const users = async () => {
//     try {
//       const newUser = await schoolMetricsApi.post("/users", dataUser);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const parents = async () => {
//     try {
//       const newParent = await schoolMetricsApi.post("/parents", dataParent);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const students = async () => {
//     try {
//       const newStudent = await schoolMetricsApi.post("/students", dataStudent);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const navigate = useNavigate();

//   const handleBackButtonClick = () => {
//     navigate(-1);
//   };

//   const handleSaveButtonClick = async (event) => {
//     event.preventDefault(); // Prevenir el envío por defecto del formulario
//     try {
//       const result = await users()
//       console.log(result.data)
//     } catch (error) {
//       console.error(error)
      
//     }
//     console.log("Datos guardados");
//   };

//   // Lista de materias
//   const subjects = ["Math", "Science", "English", "History", "matematicas"];

//   // Lista de datos personales
//   const personalData = [
//     { label: "Mom", required: true },
//     { label: "Mom Contact", required: true },
//     { label: "Dad", required: false },
//     { label: "Dad Contact", required: false },
//     { label: "Strengths", required: false },
//     { label: "Areas to Improve", required: false },
//   ];

//   return (
//     <>
//       <Container>
//         <Grid container justifyContent="center">
//           <Grid item xs={12} md={9}>
//             <Grid container spacing={3}>
//               <Grid
//                 item
//                 xs={12}
//                 sx={{
//                   backgroundColor: "#004643",
//                   padding: "4vh",
//                   position: "relative",
//                 }}
//               >
//                 <IconButton
//                   onClick={handleBackButtonClick}
//                   sx={{
//                     color: "black",
//                     fontWeight: "bold",
//                     position: "absolute",
//                     left: "3.5vh",
//                     top: "0vh",
//                     borderRadius: "0px",
//                     "&:hover": {
//                       backgroundColor: "#f9bc60",
//                     },
//                   }}
//                 >
//                   <ArrowBack />
//                 </IconButton>
//                 <Box sx={{ textAlign: "center", marginTop: "2vh" }}>
//                   <Typography
//                     variant="h1"
//                     sx={{
//                       paddingBottom: '2vh',
//                       color: "black",
//                       fontWeight: "bold",
//                       fontSize: "5vh",
//                     }}
//                   >
//                     New User
//                   </Typography>
//                 </Box>
//                 <Box
//                   sx={{
//                     backgroundColor: "#f9bc60",
//                     padding: "2vh",
//                     marginTop: "2vh",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     width: {
//                       xs: "100%",
//                       sm: "100%",
//                     },
//                     margin: "auto",
//                   }}
//                 >
//                   <FormControl component="form" onSubmit={handleSaveButtonClick}>
//                     <FormGroup>
//                       <Grid container spacing={3} justifyContent="center">
//                         <Grid item xs={12} sm={12} md={6}>
//                           <TextField
//                             fullWidth
//                             label="Full Name"
//                             variant="outlined"
//                             required
//                           />
//                         </Grid>
//                         <Grid item xs={12} sm={12} md={6}>
//                           <TextField
//                             fullWidth
//                             label="Age"
//                             variant="outlined"
//                             required
//                           />
//                         </Grid>
//                         {personalData.map((data, index) => (
//                           <Grid item xs={12} sm={12} md={6} key={index}>
//                             <TextField
//                               fullWidth
//                               label={data.label}
//                               variant="outlined"
//                               required={data.required}
//                             />
//                           </Grid>
//                         ))}
//                         {subjects.map((subject) => (
//                           <Grid item xs={12} sm={6} md={3} key={subject}>
//                             <TextField
//                               label={subject}
//                               variant="outlined"
//                               size="small"
//                             />
//                           </Grid>
//                         ))}
//                       </Grid>
//                       <Grid item xs={12}>
//                         <Grid container justifyContent="center">
//                           <Button
//                             type="submit"
//                             variant="contained"
//                             sx={{
//                               width: "50%",
//                               marginTop: "2vh",
//                               backgroundColor: "#004643",
//                               color: "#f9bc60",
//                               "&:hover": {
//                                 backgroundColor: "#e16162",
//                               },
//                             }}
//                           >
//                             Save
//                           </Button>
//                         </Grid>
//                       </Grid>
//                     </FormGroup>
//                   </FormControl>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// };
// export default NewUser



import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  Button,
  FormControl,
  FormGroup,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NewUser = () => {
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    password: "",
    type_user: "PARENTS", // Valor por defecto
  });
  const [dataParent, setDataParent] = useState({ parentId: "", relation: "" });
  const [dataStudent, setDataStudent] = useState({
    userId: "",
    parentId: "",
    telephone: "",
    age: "",
    grade: "",
    section: "",
    educationalLevelId: "",
  });

  const educationalLevels = ["Primary", "Secondary"];
  const userTypes = ["PROFESSOR", "STUDENT", "PARENTS"];

  const fields = [
    { label: "Full Name", name: "name", value: dataUser.name, setter: setDataUser },
    { label: "Email", name: "email", value: dataUser.email, setter: setDataUser, type: "email" },
    { label: "Password", name: "password", value: dataUser.password, setter: setDataUser, type: "password" },
    {
      label: "User Type",
      name: "type_user",
      value: dataUser.type_user,
      setter: setDataUser,
      component: (
        <Select
          name="type_user"
          value={dataUser.type_user}
          onChange={(e) => setDataUser({ ...dataUser, type_user: e.target.value })}
          label="User Type"
        >
          {userTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ];

  const studentFields = [
    { label: "User ID", name: "userId", value: dataStudent.userId, setter: setDataStudent },
    { label: "Parent ID", name: "parentId", value: dataStudent.parentId, setter: setDataStudent },
    { label: "Telephone", name: "telephone", value: dataStudent.telephone, setter: setDataStudent },
    { label: "Age", name: "age", value: dataStudent.age, setter: setDataStudent, type: "number" },
    { label: "Grade", name: "grade", value: dataStudent.grade, setter: setDataStudent },
    { label: "Section", name: "section", value: dataStudent.section, setter: setDataStudent },
    {
      label: "Educational Level",
      name: "educationalLevelId",
      value: dataStudent.educationalLevelId,
      setter: setDataStudent,
      component: (
        <Select
          name="educationalLevelId"
          value={dataStudent.educationalLevelId}
          onChange={(e) => setDataStudent({ ...dataStudent, educationalLevelId: e.target.value })}
          label="Educational Level"
        >
          {educationalLevels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ];

  const parentFields = [
    { label: "Parent ID", name: "parentId", value: dataParent.parentId, setter: setDataParent },
    { label: "Relation", name: "relation", value: dataParent.relation, setter: setDataParent },
  ];

  const navigate = useNavigate();

  const handleSaveButtonClick = (event) => {
    event.preventDefault(); // Prevenir el envío por defecto del formulario

    console.log("User Data:", dataUser);
    console.log("Parent Data:", dataParent);
    console.log("Student Data:", dataStudent);

    navigate(-1); // Volver a la página anterior
  };

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: "#004643",
                padding: "4vh",
                position: "relative",
              }}
            >
              <IconButton
                onClick={() => navigate(-1)}
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  position: "absolute",
                  left: "3.5vh",
                  top: "0vh",
                  borderRadius: "0px",
                  "&:hover": {
                    backgroundColor: "#f9bc60",
                  },
                }}
              >
                <ArrowBack />
              </IconButton>
              <Box sx={{ textAlign: "center", marginTop: "2vh" }}>
                <Typography
                  variant="h1"
                  sx={{
                    paddingBottom: '2vh',
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "5vh",
                  }}
                >
                  New User
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#f9bc60",
                  padding: "2vh",
                  marginTop: "2vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: {
                    xs: "100%",
                    sm: "100%",
                  },
                  margin: "auto",
                }}
              >
                <FormControl component="form" onSubmit={handleSaveButtonClick}>
                  <FormGroup>
                    <Grid container spacing={3} justifyContent="center">
                      {fields.map((field) => (
                        <Grid item xs={12} sm={12} md={6} key={field.name}>
                          {field.component ? (
                            <FormControl fullWidth variant="outlined">
                              <InputLabel>{field.label}</InputLabel>
                              {field.component}
                            </FormControl>
                          ) : (
                            <TextField
                              fullWidth
                              label={field.label}
                              variant="outlined"
                              required
                              name={field.name}
                              value={field.value}
                              onChange={(e) => field.setter({ ...dataUser, [e.target.name]: e.target.value })}
                              type={field.type || "text"}
                            />
                          )}
                        </Grid>
                      ))}
                      {studentFields.map((field) => (
                        <Grid item xs={12} sm={12} md={6} key={field.name}>
                          {field.component ? (
                            <FormControl fullWidth variant="outlined">
                              <InputLabel>{field.label}</InputLabel>
                              {field.component}
                            </FormControl>
                          ) : (
                            <TextField
                              fullWidth
                              label={field.label}
                              variant="outlined"
                              name={field.name}
                              value={field.value}
                              onChange={(e) => field.setter({ ...dataStudent, [e.target.name]: e.target.value })}
                              type={field.type || "text"}
                            />
                          )}
                        </Grid>
                      ))}
                      {parentFields.map((field) => (
                        <Grid item xs={12} sm={12} md={6} key={field.name}>
                          <TextField
                            fullWidth
                            label={field.label}
                            variant="outlined"
                            name={field.name}
                            value={field.value}
                            onChange={(e) => field.setter({ ...dataParent, [e.target.name]: e.target.value })}
                            type={field.type || "text"}
                          />
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Grid container justifyContent="center">
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{
                              width: "50%",
                              marginTop: "2vh",
                              backgroundColor: "#004643",
                              color: "#f9bc60",
                              "&:hover": {
                                backgroundColor: "#e16162",
                              },
                            }}
                          >
                            Save
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </FormGroup>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewUser;

