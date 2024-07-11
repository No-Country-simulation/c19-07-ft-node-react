import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const fakeData = [
  {
    name: 'Juan',
    math: 9.0,
    english: 7.5,
    science: 4.0,
    arts: 5.0,
    sports: 9.0,
    history: 7.4,
    chemistry: 2.0,
  },
  {
    name: 'Lina',  
    math: 3.0,
    english: 5.5,
    science: 9.0,
    arts: 1.0,
    sports: 8.0,
    history: 8.4,
    chemistry: 5.0,
  },
  {
    name: 'Sol',
    math: 2.0,
    english: 2.5,
    science: 2.0,
    arts: 5.0,
    sports: 9.0,
    history: 6.4,
    chemistry: 8.0,
  },
  {
    name: 'Darvin',
    math: 4.0,
    english: 7.1,
    science: 6.0,
    arts: 2.0,
    sports: 8.0,
    history: 5.4,
    chemistry: 9.0,
  },
  {
    name: 'Mauro',
    math: 3.0,
    english: 4.5,
    science: 5.0,
    arts: 6.0,
    sports: 7.0,
    history: 3.5,
    chemistry: 1.0,
  },
];


export const ProfesorColumnChart = () => {
  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <BarChart
        data={fakeData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="4" />
        <XAxis dataKey="name" /> {/*esto es lo que va a mostrarse en la linea inferior.*/}
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="english" fill="#e16162" />
        <Bar dataKey="arts" fill="#f9bc60" />
      </BarChart>
    </ResponsiveContainer>
  );
};
