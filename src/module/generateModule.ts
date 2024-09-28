import * as vscode from "vscode";
import fs = require("fs");
import { mkdirp } from "mkdirp";
import { moduleFolders } from "../core/data/constant/folders";

export async function generateModule(inUri: vscode.Uri | undefined) {
  await generateModuleFolders(inUri);
  vscode.window.showInformationMessage("Successfully created module folder");
}

async function validateUri(uri: vscode.Uri | undefined) {
  if (!uri) {
    return vscode.window.showErrorMessage("Please select a directory");
  }

  const paths = uri.path.split("/");
  if (!paths.includes("lib")) {
    return vscode.window.showErrorMessage("Please create under lib");
  }

  if (!paths.includes("module")) {
    return vscode.window.showErrorMessage("Please create under lib/module");
  }
}

async function generateModuleFolders(uri: vscode.Uri | undefined) {
  await validateUri(uri);

  if (!uri) {
    return;
  }

  const modulePath = uri.path + "/module";
  mkdirp.sync(modulePath);
  fs.writeFileSync(modulePath + "/.gitkeep", "");

  for (const folder of moduleFolders) {
    const newModulePath = modulePath + folder;

    mkdirp.sync(newModulePath);

    fs.writeFileSync(newModulePath + "/.gitkeep", "");
  }
}
