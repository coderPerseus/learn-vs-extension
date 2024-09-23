import * as vscode from "vscode";
import { loginManager } from "./manager";
import { SidebarProvider } from "./sidebar";
/**
 * 激活插件，插件启动时会调用此函数
 * @param context 上下文
 */
export function activate(context: vscode.ExtensionContext) {
  try {
    const login = vscode.commands.registerCommand("learn.signIn", () => loginManager.signIn());
    const loginOut = vscode.commands.registerCommand("learn.signOut", () => loginManager.signOut());
    const view = vscode.window.registerTreeDataProvider("learnExplorer", SidebarProvider);
    /** 注册命令，在这里声明后，当插件被禁用时，命令也会被注销 */
    context.subscriptions.push(login, loginOut, view);
    // 模拟 error
    // throw new Error("模拟错误");
  } catch (error: any) {
    vscode.window.showErrorMessage(error.message);
  }
}

/** 插件关闭时调用 */
export function deactivate() {}
