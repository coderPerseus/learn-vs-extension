# 学习 vscode 插件

# 实现功能

登录
登出

# 知识

1. 入口文件在 src/extension.ts，约定 activate 函数是插件启动时执行的函数，deactivate 函数是插件关闭时执行的函数。
2. 注册命令：vscode.commands.registerCommand，接受两个参数，第一个是命令名称，需要在 package.json 的 contributes.commands 和 activationEvents 中注册，第二个是命令执行的函数。
3. 添加监听：context.subscriptions.push 。它是一个数组，可以添加多个订阅，当插件被关闭时，会自动取消订阅。
4. vscode.window.showInformationMessage 是右下角显示消息
5. vscode.window.showQuickPick 是弹出一个下拉框
6. vscode.commands.executeCommand 是执行一个命令
   1. vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(url));：打开一个链接
