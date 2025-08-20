# Contributing

## Before you start
- If the change is large or exploratory, open an issue first describing motivation, design, and backwards compatibility concerns.
- Follow the project's code style and existing conventions.

## Branching & naming
- Create a feature or fix branch from main:
- Naming: `feature/<short-desc>` or `fix/<short-desc>`

## Implementation guidelines
- Keep changes focused and small per PR.
- Write clear, concise commit messages. Suggested format:
  - feat(scope): short description
  - fix(scope): short description
  - docs: short description
  - Example: `feat(ui): add download button`
- Run linters and formatting tools before committing.

## Creating a Pull Request
- Push your branch: `git push -u origin feature/short-description`
- Open a PR against `main` with:
  - A short description of what changed
  - Link to the issue (if any)
  - Testing steps and screenshots (if UI)

## PR checklist
- [ ] Documentation updated (README, comments).
- [ ] No secret keys or credentials included.
- [ ] Smaller, focused commits (squash if necessary before merge).

## Backend
The backend (API and publishing engine) is maintained in a separate repository:
https://github.com/pavancos/FolioEngine