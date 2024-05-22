import { randomUUID } from "node:crypto";

export let users: Record<string, any> = {
  "test@test.pl": {
    uuid: randomUUID(),
    email: "test@test.pl",
    subscribed: true,
    watchList: [2],
    password: "testtest",
  },
};
