import * as vscode from "vscode";
import { generateCommon } from "./module/generateCommon";
import { generateCore } from "./module/generateCore";
import { generateModule } from "./module/generateModule";

export function activate(context: vscode.ExtensionContext) {
  const generateCommonCommand = vscode.commands.registerCommand(
    "generateCommon",
    (inUri: vscode.Uri | undefined) => generateCommon(inUri)
  );

  const generateCoreCommand = vscode.commands.registerCommand(
    "generateCore",
    (inUri: vscode.Uri | undefined) => generateCore(inUri)
  );

  const generateModuleCommand = vscode.commands.registerCommand(
    "generateModule",
    (inUri: vscode.Uri | undefined) => generateModule(inUri)
  );

  context.subscriptions.push(
    generateCommonCommand,
    generateCoreCommand,
    generateModuleCommand
  );
}

export function deactivate() {}
