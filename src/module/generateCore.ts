import * as vscode from "vscode";
import fs = require("fs");
import { mkdirp } from "mkdirp";
import { coreFolders } from "../core/data/constant/folders";

export async function generateCore(inUri: vscode.Uri | undefined) {
  await generateCoreFolders(inUri);
  vscode.window.showInformationMessage("Successfully created core folder");
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

async function generateCoreFolders(uri: vscode.Uri | undefined) {
  await validateUri(uri);

  if (!uri) {
    return;
  }

  const corePath = uri.path + "/core";
  mkdirp.sync(corePath);
  fs.writeFileSync(corePath + "/.gitkeep", "");

  for (const folder of coreFolders) {
    const newCorePath = corePath + `/${folder}`;

    mkdirp.sync(newCorePath);

    fs.writeFileSync(newCorePath + "/.gitkeep", "");
  }
}
