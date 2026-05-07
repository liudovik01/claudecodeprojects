# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git workflow

After each meaningful unit of work, commit and push to GitHub so progress is never lost. Use clear, specific commit messages that describe what changed and why (e.g. `add win animation highlight` not `update file`). Push after every commit — don't batch pushes.

## Running the project

Open `tictactoe.html` directly in a browser — no build step, server, or dependencies required.

## Architecture

The entire application is a single self-contained file (`tictactoe.html`) with no external dependencies. HTML, CSS, and JavaScript all live in that one file.

**Game state** is held in five module-level variables: `board` (9-element array), `current` (active player, `'X'` or `'O'`), `gameOver` (boolean), `scores` (object with `X`, `O`, `T` keys), and `mode` (`'2p'` or `'ai'`). Scores persist across games; everything else resets on `resetGame()`.

**Game flow:**
- `handleClick(i)` → `makeMove(i)` → `checkWinner()` / tie check → `render()`
- In AI mode, after the human move, `aiMove()` is triggered via a 350ms `setTimeout`
- `WINS` is a module-level constant holding all 8 winning index-triples

**AI:** `minimax(b, player, depth)` is a recursive minimax that operates on a passed-in copy of `board` — it never mutates global state. `checkWinnerBoard(b)` is the pure version used inside minimax; `checkWinner()` is the global-state wrapper. The AI always plays as `'O'` and is unbeatable.

**Rendering:** `render(winner?, tie?)` is the sole DOM-update function — it rewrites all cell classes/text, highlights winning cells with the `win` class, and updates the status line and score display from current state.
