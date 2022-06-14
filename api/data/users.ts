import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@admin.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Sakil Khan",
    email: "sakil@sakil.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "User User",
    email: "user@user.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
