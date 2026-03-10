---
title: Typescript Module Resolution
author: Nick Retallack
---

# Welcome to Executable Talk

This is your first slide!

---

## Script Tags: Open All Files + Web Preview

4-pane layout: index.html | lib.js, Simple Browser | main.js. Starts Chrome debug so the Debug Console (browser console) appears in the Panel below. (Update the Simple Browser path if your workspace is elsewhere.)

```action
type: sequence
label: Open Script Tags 4-pane + browser console
steps:
  - type: file.open
    path: 1-modules/1-script-tags/index.html
  - type: vscode.command
    id: workbench.action.splitEditorRight
  - type: file.open
    path: 1-modules/1-script-tags/lib.js
  - type: vscode.command
    id: workbench.action.focusFirstEditorGroup
  - type: vscode.command
    id: workbench.action.splitEditorDown
  - type: vscode.command
    id: workbench.action.focusSecondEditorGroup
  - type: vscode.command
    id: workbench.action.splitEditorDown
  - type: vscode.command
    id: workbench.action.focusThirdEditorGroup
  - type: vscode.command
    id: simpleBrowser.show
    args: ["file:///Users/nicholas.retallack/typescript-talk/1-modules/1-script-tags/index.html"]
  - type: vscode.command
    id: workbench.action.focusFourthEditorGroup
  - type: file.open
    path: 1-modules/1-script-tags/main.js
  - type: debug.start
    configName: Launch script-tags
  - type: vscode.command
    id: workbench.action.panel.focus
```

---

## Opening a File

Click the action link to see it in action:

[Open Main File](https://github.com/ormasoftchile/executable-talk/blob/HEAD/action:file.open?path=src/main.ts)

---

## Highlighting Code

Draw attention to specific lines:

[Highlight the function](https://github.com/ormasoftchile/executable-talk/blob/HEAD/action:editor.highlight?path=src/main.ts&lines=5-10)

---
notes: Remember to explain the architecture diagram!
---

## Running Commands

Execute terminal commands during your demo:

[Install Dependencies](https://github.com/ormasoftchile/executable-talk/blob/HEAD/action:terminal.run?command=npm%20install)

---

## Debugging

Start a debug session:

[Launch Debugger](https://github.com/ormasoftchile/executable-talk/blob/HEAD/action:debug.start?config=Launch%20Program)
