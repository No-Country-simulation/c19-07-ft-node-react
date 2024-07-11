import { Grid, Paper, Divider, Box } from "@mui/material";
// import { Classmate } from "../components";

const fakeStudients = [
  {
    nombre:
      "Maria de los Angeles Con Un Apellido Tremendamente Largo Que No Se Puede Creer",
    madre: "carla",
    padre: "mario",
    contacto: "fas;dlkfja;sdfkja;slkfjasl;dfkjasdl;fkajssdlfkja",
  },
  {
    nombre: "Carla",
    madre: "julieta",
    padre: "jose",
    contacto: 1239483,
  },
  {
    nombre: "Amarido",
    madre: "eva",
    padre: "martin",
    contacto: ";sdlfjasd;lfa",
  },
  {
    nombre: "Luz",
    madre: "martin",
    padre: "pablo",
    contacto: 29238294784,
  },
  {
    nombre: "Paul",
    madre: "maria",
    padre: "gaston",
    contacto: "",
  },
  {
    nombre: "Kat",
    madre: "saha",
    padre: "",
    contacto: "",
  },
  {
    nombre: "Daniel",
    madre: "martina",
    padre: "wilson",
    contacto: 2348349,
  },
  {
    nombre: "Nick",
    madre: "dominic",
    padre: "jhon",
    contacto: "dsfjasdflajlsd",
  },
];

export default function Classmates() {
  return (

      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Paper
              style={{
                padding: 16,
                textAlign: "center",
                backgroundColor: "#F9BC60",
              }}
            >
              Student
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              style={{
                padding: 16,
                textAlign: "center",
                backgroundColor: "#F9BC60",
              }}
            >
              Mother
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              style={{
                padding: 16,
                textAlign: "center",
                backgroundColor: "#F9BC60",
              }}
            >
              Father
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              style={{
                padding: 16,
                textAlign: "center",
                backgroundColor: "#F9BC60",
              }}
            >
              Contact
            </Paper>
          </Grid>
        </Grid>

        {/* //***************************************************************************************************************************** */}
        {/* {fakeStudients.map((student, index) => (
    <Classmate key={index} student={student} index={index} />
  ))} */}
        {/* //***************************************************************************************************************************** */}
        {fakeStudients.map((student, index) => (
          <Grid container item xs={12} key={index}>
            <Grid item xs={12}>
              <Paper
                style={{
                  padding: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  textAlign: "center",
                  color: "#abd1c6",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    margin: "2vh",
                  }}
                >
                  {student.nombre}
                </div>
                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    margin: "2vh",
                  }}
                >
                  {student.madre}
                </div>
                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    margin: "2vh",
                  }}
                >
                  {student.padre}
                </div>
                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    margin: "2vh",
                    wordWrap: "break-word",
                    wordBreak: "break-all",
                  }}
                >
                  {student.contacto}
                </div>
              </Paper>
              <Divider
                sx={{
                  borderWidth: "2px",
                  borderColor: "#F9BC60",
                  borderStyle: "solid",
                }}
              />
            </Grid>
          </Grid>
        ))}
        {/* //************************************************************************************** */}
      </Grid>
  );
}
