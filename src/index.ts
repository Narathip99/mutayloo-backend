import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import connectDB from "./config/mongodb";
import { register, login } from "./controllers";

// connect to mongodb
connectDB();

//
const app = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "secret",
    })
  )
  .use(cookie())
  .group("/users", (app) =>
    app
      .post("/register", register, {
        body: t.Object({
          firstname: t.String(),
          lastname: t.String(),
          email: t.String(),
          password: t.String(),
          role: t.Optional(t.String()),
        }),
        type: "json",
      })
      .post("/login", login, {
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
        type: "json",
      })
  );

// start the server
app.listen(process.env.PORT || 5555);

console.log(
  `🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
