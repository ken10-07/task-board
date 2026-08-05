# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

task-board は React + TypeScript + Vite 製のシンプルなタスク管理アプリ。タスクの追加・完了切り替え・削除ができる。

## Git 運用ルール

- **コードに変更を加えるたびに、コミットしてGitHubへpushすること。** 変更を溜め込まず、意味のある単位（1つの機能追加・1つの修正など）ごとに区切ってコミットする。
- コミットメッセージは変更内容が分かるように簡潔に記述する。
- push前に `git status` で意図しないファイル（機密情報、ビルド成果物など）が含まれていないか確認する。
- リモートリポジトリ（GitHub）が未設定の場合は、pushを試みる前にユーザーに確認する。
- force push（`git push --force`）やコミット履歴を書き換える操作は、ユーザーの明示的な許可がない限り行わない。

## コマンド

- 依存関係のインストール: `npm install`
- 開発サーバーの起動: `npm run dev`
- ビルド: `npm run build`（`tsc -b` の型チェック後に `vite build`）
- Lint: `npm run lint`（oxlint）
- ビルドのプレビュー: `npm run preview`

## アーキテクチャ

- `src/App.tsx` がタスクボードの全ロジック（追加・完了切り替え・削除）を持つ単一コンポーネント。状態は `useState<Task[]>` で保持し、`localStorage`（キー: `task-board.tasks`）に自動保存・復元することでリロード後も維持される。
- `src/types.ts` の `Task` 型（`id` / `text` / `completed`）が唯一のデータモデル。
- スタイルは `src/App.css`（タスクボード固有）と `src/index.css`（全体のベーススタイル）に分離。完了済みタスクは `.task.completed` クラスでグレー表示・取り消し線を付与している。
