import * as config from "../config.ts";
import { dso } from "../deps.ts";
import "./reply.ts";
import "./topic.ts";
import "./user.ts";

dso.showQueryLog = false;

export async function connect() {
  await dso.connect(config.mysql);
  await dso.sync(false);
}

export async function sync(force: boolean) {
  await dso.sync(force);
}
