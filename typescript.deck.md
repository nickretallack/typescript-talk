---
title: Typescript Module Resolution
author: Nick Retallack
---

# Welcome to Executable Talk

This is your first slide!

---

## Script Tags: Open All Files + Web Preview

Opens `lib.js`, `main.js`, and `index.html` in editor panes, plus `index.html` in the built-in Simple Browser—all inside VS Code. (Update the Simple Browser path in the action if your workspace is elsewhere.)

```action
type: sequence
label: Open Script Tags files + web preview
steps:
  - type: file.open
    path: 1-modules/1-script-tags/lib.js
  - type: vscode.command
    id: workbench.action.splitEditorRight
  - type: file.open
    path: 1-modules/1-script-tags/main.js
  - type: vscode.command
    id: workbench.action.splitEditorRight
  - type: file.open
    path: 1-modules/1-script-tags/index.html
  - type: vscode.command
    id: simpleBrowser.show
    args: ["file:///Users/nicholas.retallack/typescript-talk/1-modules/1-script-tags/index.html"]
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
