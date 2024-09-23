import { EventEmitter } from "events";
import * as vscode from "vscode";
/** 用户状态枚举 */
enum UserStatus {
  SignedIn = 1,
  SignedOut = 2,
}
/** 登录管理器 */
export class LoginManager extends EventEmitter {
  private currentUser: string | undefined;
  private userStatus: UserStatus;

  constructor() {
    // 调用父类的构造函数和方法
    super();
    this.currentUser = undefined;
    this.userStatus = UserStatus.SignedOut;
  }
  /** 登录 */
  public async signIn(): Promise<void> {
    const picks: vscode.QuickPickItem[] = [
      { label: "Web 授权", description: "通过浏览器登录" },
      { label: "Cookie 登录", description: "使用 Cookie 登录" },
    ];

    const choice = await vscode.window.showQuickPick(picks, { placeHolder: "请选择登录方式" });

    if (choice) {
      if (choice.label === "Web 授权") {
        await this.webAuth();
      } else {
        await this.cookieAuth();
      }
    }
  }
  /** 通过网页打开授权 */
  private async webAuth(): Promise<void> {
    // 在实际应用中,这里应该打开一个浏览器窗口进行授权
    // 这里我们用一个模拟的成功登录来演示
    this.currentUser = "WebAuthUser";
    this.userStatus = UserStatus.SignedIn;
    this.emit("statusChanged");
    vscode.window.showInformationMessage(`成功登录为 ${this.currentUser}`);
  }
  /** 通过Cookie 登录 */
  private async cookieAuth(): Promise<void> {
    const cookie = await vscode.window.showInputBox({ prompt: "请输入 Cookie", password: true });
    if (cookie) {
      // 在实际应用中,这里应该验证 Cookie
      // 这里我们用一个模拟的成功登录来演示
      this.currentUser = "CookieAuthUser";
      this.userStatus = UserStatus.SignedIn;
      this.emit("statusChanged");
      vscode.window.showInformationMessage(`成功登录为 ${this.currentUser}`);
    }
  }

  public async signOut(): Promise<void> {
    // 在实际应用中,这里应该调用后端 API 进行登出操作
    this.currentUser = undefined;
    this.userStatus = UserStatus.SignedOut;
    this.emit("statusChanged");
    vscode.window.showInformationMessage("已成功登出");
  }

  public getStatus(): UserStatus {
    return this.userStatus;
  }

  public getUser(): string | undefined {
    return this.currentUser;
  }
}

export const loginManager = new LoginManager();
