# Contributing to Axelar

We appreciate your interest in contributing to Axelar! This document `CONTRIBUTING.md` provides a high-level overview of how you can get involved.

## Table of contents

- [Getting Started](#getting-started)
- [How to contribute](#how-to-contribute)
  - [Code of Conduct](#code-of-conduct)
    - [Standards](#our-standards)
    - [Responsibilities](#our-responsibilities)
- [Project structure](#project-structure)

## Getting started

If you are new to the Axelar Network, we encourage you to read the [Axelar Documentation](https://docs.axelar.network/) to learn more about the Axelar Network and how to get started.

If you are new to contributing to open-source projects, we encourage you to read [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/).

---

## How to contribute

1. Before you submit your Pull Request (PR), search the project for an open or closed PR related to your submission. You don't want to duplicate effort.
2. Fork the repository within your user and clone it to your local machine.
3. Install the dependencies for the project as indicated in the README.
4. Create a new branch for your contribution with the following command:

   ```shell
   git checkout -b my-fix-branch
   ```

5. Make your changes in the new git branch.
6. Commit your changes. Your commit message should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

   ```shell
   git commit -a
   ```

   **Note:** the optional commit `-a` command line option will automatically "add" and "rm" edited files. Push your branch to GitHub with the following command:

   ```shell
   git push origin my-fix-branch
   ```

   Open a pull request from your forked repository to the original repository.

If we suggest changes:

- Make the required updates and commit them to your branch.
- Wait for the project maintainer to review your changes and merge your pull request.

> If you find a bug in the source code or a mistake in the documentation, you can help us by submitting an issue.

When you open a new issue, please provide as much detail as possible, including steps to reproduce the problem and the expected behavior. Even better, you can submit a pull request with a fix.

---

## Code of conduct

We pledge to create a harassment-free experience for everyone in our project and community, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Standards

We expect all participants to use welcoming and inclusive language, respect differing viewpoints and experiences, gracefully accept constructive criticism, focus on what's best for the community, and show empathy towards other members.

Unacceptable behavior includes:

- Using sexualized language or imagery.
- Personal attacks.
- Public or private harassment.
- Publishing others' confidential information without explicit permission.
- Any other conduct that could be considered inappropriate in a professional setting.

### Responsibilities

As project maintainers, we clarify the standards of acceptable behavior and take appropriate corrective action in response to unacceptable behavior.

We also reserve the right to remove or reject any contributions that do not align with this Code of Conduct or to temporarily or permanently ban any contributor who exhibits inappropriate, threatening, offensive, or harmful behavior.

## Project structure

- **`src/content/`**: All documentation content in Markdown format.
- **`src/layouts/navigation.ts`**: Defines the navigation structure for the documentation site.
