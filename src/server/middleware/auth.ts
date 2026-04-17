import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { verifyToken } from "@/server/lib/jwt";

export const authMiddleware = createMiddleware().server(
  async ({ next }) => {
    const request = getRequest();

    const cookie = request.headers.get("cookie");
    const token = cookie
      ?.split(";")
      .find((c) => c.trim().startsWith("token="))
      ?.split("=")[1];

    if (!token) throw new Error("Unauthorized");

    const user = verifyToken(token);

    if (!user) throw new Error("Unauthorized");

    return next({
      context: { user },
    });
  }
);