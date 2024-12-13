import { setupServer } from "msw/node";
import { handlers } from "../handlers/HelloHandler";

export const server = setupServer(...handlers);
