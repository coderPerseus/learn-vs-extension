import * as vscode from "vscode";

export class SidebarProvider implements vscode.TreeDataProvider<SiderbarItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<SiderbarItem | undefined | null | void> = new vscode.EventEmitter<
    SiderbarItem | undefined | null | void
  >();
  readonly onDidChangeTreeData: vscode.Event<SiderbarItem | undefined | null | void> = this._onDidChangeTreeData.event;

  constructor(private context: vscode.ExtensionContext) {}

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: SiderbarItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: SiderbarItem): Thenable<SiderbarItem[]> {
    if (!element) {
      // 根节点，只显示一个图标
      return Promise.resolve([
        new SiderbarItem("学习", vscode.TreeItemCollapsibleState.None, this.context.extensionUri),
      ]);
    } else {
      // 子节点，这里可以根据需要添加更多节点
      return Promise.resolve([]);
    }
  }
}

class SiderbarItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly iconPath?: vscode.Uri
  ) {
    super(label, collapsibleState);

    if (iconPath) {
      this.iconPath = {
        light: vscode.Uri.joinPath(iconPath, "resources", "light", "light.svg"),
        dark: vscode.Uri.joinPath(iconPath, "resources", "dark", "dark.svg"),
      };
    }

    this.tooltip = this.label;
  }
}
