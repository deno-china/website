import { BaseController } from "./common/base_controller.ts";
import HomeController from "./controllers/home.ts";
import SinglePagesController from "./controllers/single_pages.ts";
import UserController from "./controllers/user.ts";
import { Application, assert, Router } from "./deps.ts";

const router = new Router();
const controllers = {};

// 在这里注册Controller
let controllerClasses: typeof BaseController[] = [
  HomeController,
  UserController,
  SinglePagesController
];

// 在这里添加路由映射
const routes = {
  "/": "home.index",
  "/setting": "user.setting",
  "/user/login": "user.login",
  "/user/logout": "user.logout",
  "/user/github": "user.github",
  "/user/:name": "user.profile",
  "/api": "singlepages.api",
  "/getting-start": "singlepages.gettingStart",
  "/about": "singlepages.about"
};

// TODO manyuanrong
// 等待Deno的动态import可用之后实现自动装载Controller
async function loadControllers() {
  const controllerFiles = Deno.readDirSync(`${Deno.cwd()}/controllers`);
  controllerClasses = await Promise.all(
    controllerFiles.map(file => {
      const path = `./controllers/${file.name}`;
      return import(path);
    })
  );
}

export function register(app: Application) {
  controllerClasses.forEach((Controller: typeof BaseController) => {
    const controller = new Controller() as object;
    let name = controller.constructor.name;
    name = name.toLocaleLowerCase().replace("controller", "");
    controllers[name] = controller;
  });

  console.log("\nRegister Controller Handlers:\n");
  Object.keys(routes).forEach(path => {
    let parts: string[] = routes[path].split(":");
    const method = parts.length < 2 ? "get" : parts[0];
    const handerParts = (parts[1] || parts[0]).split(".");
    if (parts.length < 2) {
      parts.unshift("get");
    }
    assert(handerParts.length === 2);
    const controllerName = handerParts[0];
    const handlerName = handerParts[1];
    console.log(
      `${method.toLocaleUpperCase()} ${path} => ${controllerName}.${handlerName}`
    );
    router[method](path, async ctx => {
      const controller = controllers[controllerName];
      controller.ctx = ctx;
      await controller[handlerName]();
    });
  });

  app.use(router.routes());
}
