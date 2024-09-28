import * as vscode from "vscode";
import fs = require("fs");
import { mkdirp } from "mkdirp";
import { commonFolders } from "../core/data/constant/folders";

export async function generateCommon(inUri: vscode.Uri | undefined) {
  await generateCommonFolders(inUri);
  vscode.window.showInformationMessage("Successfully created common folder");
}

async function validateUri(uri: vscode.Uri | undefined) {
  if (!uri) {
    return vscode.window.showErrorMessage("Please select a directory");
  }

  const paths = uri.path.split("/");
  if (!paths.includes("lib")) {
    return vscode.window.showErrorMessage("Please create under lib");
  }
}

async function generateCommonFolders(uri: vscode.Uri | undefined) {
  await validateUri(uri);

  if (!uri) {
    return;
  }

  const commonPath = uri.path + "/common";
  mkdirp.sync(commonPath);
  fs.writeFileSync(commonPath + "/.gitkeep", "");

  for (const folder of commonFolders) {
    const newCommonPath = commonPath + `/${folder}`;

    mkdirp.sync(newCommonPath);

    fs.writeFileSync(newCommonPath + "/.gitkeep", "");
  }
}
