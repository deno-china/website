export { Client, replaceParams } from "https://deno.land/x/mysql/mod.ts";
export {
  Application,
  Router,
  send,
  Context,
  HttpError,
  Status
} from "https://deno.land/x/oak/mod.ts";
export {
  assertEquals,
  assert
} from "https://deno.land/x/testing@v0.3.1/asserts.ts";

import * as _colors from "https://deno.land/x/std/colors/mod.ts";
import * as _dejs from "https://deno.land/x/dejs@0.2.0/dejs.ts";
import * as _dso from "https://raw.githubusercontent.com/manyuanrong/dso/v0.1.4/mod.ts";
export const dso = _dso;
export const colors = _colors;
export const dejs = _dejs;
