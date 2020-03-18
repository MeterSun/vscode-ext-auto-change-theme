// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "auto-change-theme" is now active!');

	const barItem = vscode.window.createStatusBarItem(2);
	barItem.command = 'extension.changeTheme';
	barItem.show();
	const colorTheme: string = vscode.workspace.getConfiguration().get('workbench.colorTheme') || 'undefined';
	const preferredDarkColorTheme: string = vscode.workspace.getConfiguration().get("workbench.preferredDarkColorTheme") || 'undefined';
	const preferredHighContrastColorTheme: string = vscode.workspace.getConfiguration().get("workbench.preferredHighContrastColorTheme") || 'undefined';
	const preferredLightColorTheme: string = vscode.workspace.getConfiguration().get("workbench.preferredLightColorTheme") || 'undefined';

	if (colorTheme === preferredLightColorTheme) {
		barItem.text = 'Light';
	}
	if (colorTheme === preferredDarkColorTheme) {
		barItem.text = 'Dark';
	}

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.changeTheme', () => {
		// The code you place here will be executed every time your command is executed
		const colorTheme: string = vscode.workspace.getConfiguration().get('workbench.colorTheme') || 'undefined';
		// vscode.window.showInformationMessage(colorTheme);
		// vscode.window.setStatusBarMessage(colorTheme, 2000);

		const preferredDarkColorTheme: string = vscode.workspace.getConfiguration().get("workbench.preferredDarkColorTheme") || 'undefined';
		const preferredHighContrastColorTheme: string = vscode.workspace.getConfiguration().get("workbench.preferredHighContrastColorTheme") || 'undefined';
		const preferredLightColorTheme: string = vscode.workspace.getConfiguration().get("workbench.preferredLightColorTheme") || 'undefined';

		let newCololTheme = [preferredLightColorTheme, preferredDarkColorTheme][Math.random() > 0.5 ? 1 : 0];

		if (colorTheme === preferredLightColorTheme) {
			newCololTheme = preferredDarkColorTheme;
			barItem.text = 'Dark';
		}
		if (colorTheme === preferredDarkColorTheme) {
			newCololTheme = preferredLightColorTheme;
			barItem.text = 'Light';
		}


		vscode.workspace.getConfiguration().update('workbench.colorTheme', newCololTheme, true);
		// Display a message box to the user		
		// vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
