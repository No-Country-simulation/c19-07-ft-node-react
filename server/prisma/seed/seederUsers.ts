import { Users } from "@prisma/client";
import { IUserJSON } from "./apiRandomUser.type";
import bcrypt from "bcrypt";
import fs from "fs";
import { IUserDb } from "./seed";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const readFilejson = () => {
  const users: IUserJSON[] = JSON.parse(
    fs.readFileSync("./prisma/seed/users.json", "utf8")
  );
  return users;
};
const hashedUsers = () => {
  const users: IUserDb[] = readFilejson().map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 10), // Encriptar la contraseña con saltos de 10
  }));
  return users;
};

const main = async () => {
  const users = hashedUsers();
  users.push({
    name: "Luis Perez García",
    password: bcrypt.hashSync("admin123", 10),
    email: "admin@example.com",
    state: "ACTIVE",
    type_user: "ADMIN",
  });

  for (const user of users) {
    const existingUser = await prisma.users.findUnique({
      where: { email: user.email },
    });

    if (existingUser != null) {
      console.log(`Email duplicado encontrado: ${user.email}`);
    } else {
      await prisma.users.create({
        data: {
          name: user.name,
          password: user.password,
          email: user.email,
          state: user.state,
          type_user: user.type_user,
        },
      });
    }
  }
};
export default main;
