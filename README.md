# XXX front-end

## First Line of Defense: Vercel instant rollback ™ © ®

Our aim is to keep production stable above all else.

We are all human, though – even developers. So when something breaks, we need to roll back production to its last-known stable state.

Order of operations for executing a rollback:

1. Verify that the error exists exclusively in the front-end – *If the error is not exclusive to the front-end; escalate to the development team.*

2. Go through the history on **branch: master** and identify the last stable state of the branch.

3. Perform a rollback to the commit identified.

**Note:** Only when production is again stable should we attempt to fix the issues.

See: https://vercel.com/docs/deployments/instant-rollback.

## Things to note

To enable local development; create **file: .env** from the provided **file: .env.sample**.

Images are statically served from the **directory: /public**. We do not import assets in this project with webpack.

## Component library

The new component library is exposed via a Git submodule at **path: ./src/components/new/**.

The repository itself is located at: https://github.com/XXX/components.

### Cloning

When cloning, remember to specify **flag: --recurse-submodules**.

On a repo already on disk, execute command: `git submodule update --init --recursive` to initialise.

### Pulling latest changes

To get the latest changes of the library, you can update the submodule with the command: `yarn pull:submodules`.

### Using the library

The library is exposed through the **shorthand: @new/**.

Importing should be done using this shorthand, rather than an absolute path:

```
import { Table } from "@new/Table/Table"
import { TableRow } from "@new/Table/TableRow"
import { TableCell } from "@new/Table/TableCell"
```

### Local development

The **shorthand: @new/** resolves to the following paths (in order):

1. ./src/components/new@local/*
2. ./src/components/new/src/*

This means that you can enable local development by "symlinking" your local **repository: components** to **path: ./src/components/new@local/**.

Assuming the following directory structure:

```
/GIT_REPOSITORIES/
- ui/             #local ui repository
- components/     #local components repository
```

... on macOS/Linux, in the root of **directory: GIT_REPOSITORIES/**, execute command:

```
ln -sfn {full path to /GIT_REPOSITORIES/}/components/src {full path to /GIT_REPOSITORIES/}/ui/src/components/new@local
```

**Pro-tip:** to output the current full path in your shell, execute command: `pwd`.

#### Windows

Enable **"Developer Mode"** in settings, under **"System" → "For Developers"**.

Execute command:

```
mklink /D {full path to /GIT_REPOSITORIES/}\ui\src\components\new@local {full path to /GIT_REPOSITORIES/}\components\src
```

## Feature-flagging

We use Flagsmith for feature flags.

You can use the hook: `useFlags` to check if a flag is set.

See: https://docs.flagsmith.com/clients/react#step-2-using-useflags-to-access-feature-values-and-enabled-state

## Linting

If you are using Visual Studio Code, linting should work out of the box (on file-save). The only requirement is to have the ESLint extension installed. See: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

**Note:** you may need to resolve conflicting local settings with **file: ./.vscode/settings.json**. You may also need to uninstall conflicting extensions (.. the Prettier extension is known to cause issues. But there might be others.)

If you don't use Visual Studio Code, you can run ESLint locally with the command: `yarn eslint-diff` – and `yarn eslint-diff-fix` to auto-fix any formatting errors.

## Communicate with the team

In general; be upfront about core functionality changes. For example..

.. if you need to add a package make sure to discuss this with the team – we want to avoid https://blog.codinghorror.com/the-bathroom-wall-of-code/ as much as possible.

.. if you need to make changes in core configuration files, such as **next.config.js**, **.eslintrc**, etc., be sure to discuss this with the team.

## Useful commands

- Install packages: `yarn`
- Start project in development-mode: `yarn dev` (or `yarn dev:crossenv` on non-bash terminals)
- Locally build for production: `yarn build`
- Start local production build: `yarn start`

## Notes for Windows users

The project does work in a Windows environment but only in development mode. Therefore it is important that any changes is testet in a UNIX environment before releasing.

If you discover anything specific to Windows that you think is worth noting for future, please add it here.

# XXX front-end Git flow

## Branches

### Branch: "master"

This is our default branch (.. in GitHub terminoligy. See: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches#about-the-default-branch).

Whatever is in this branch is live and in production.

This branch connects to the production back-end.

This branch is assigned to the following domains:

- app.XXX.eco
- radisson.XXX.eco

### Branch: "testing"

This is our long-lived testing branch.

This branch should never be manually updated.

This branch is automatically kept up-to-date with **branch: master** – see GitHub Action: "On master merge, update testing".

This branch connects to the test back-end.

This branch is assigned to the following domains:

- app-test.XXX.eco
- XXX.engineering

### Feature-branches

Feature-branches should always have **branch: master** as their immediate parent. _(i.e.: when creating a feature-branch, you branch out from **branch: master**)_.

Feature-branch names are restricted by the following expression: `^(feature|bugfix|chore|release|refactor){1}\/[a-zA-Z0-9#-_\.]{1,}$`.

_Optionally, and to reduce cognitive load; try to align branch-name and pull-request title_. This goes a long way when scanning the commit-history of **branch: master**.

#### Preview-environments

Preview-environments are spun up whenever a new feature-branch is created.

Whenever you push to a feature-branch, it's associated preview-environment is rebuilt.

Preview-environment naming follows the pattern: `ui-<uid>-be-cause-eco.vercel.app`.

Any-and-all information is available in real-time on pull-requests through the web interface at GitHub.com.

Every status change is communicated back to pull-requests, including: preview environment URI, linting errors, Vercel Preview Comments, etc.

To share a preview-environment with a stakeholder; navigate to the environment instance, and share it using a link.

![vercel-share](https://github.com/XXX/ui/assets/1655171/5f8b03cd-0a6b-4236-aba0-d0c0780bbae3)

## Pull-requests

**WARNING:** Merging a pull request _WILL RESULT IN A RELEASE TO PRODUCTION – so make sure that a feature is allowed to be released:_ involve relevant stakeholders, gather feedback, etc.

Pull-requests are mandatory.

Pull-request titles should be as close to the title of a JIRA ticket – if applicable – and in general; titles should be neatly formatted and written to convey as much meaning as possible.

Don'ts:
- _"JIRA#1000: some feature"_
- _"fix a bug"_
- _"Feature – auto approve company mappings"_
- _"Fix import answers button disabled"_

Do's:
- _"PROD-1000: Some feature"_
- _"Chore/Fix a bug"_
- _"Feature/Auto approve company mappings"_
- _"Bugfix/Import answers – button should be disabled when pressed"_

Pull-request descriptions are mandatory and should be be neatly formatted and written to convey as much meaning as possible. You can "auto-tag" JIRA tickets using the following expression: `PROD-<JIRA ticket-ID>`.

Here's a few examples:

```
This PR introduces the start of the new component library.

None of the components are 100% done. Some still need design and some are missing core functionality – but as to not have the biggest PR in the known universe – I would prefer to merge this in sooner rather than later.

Components can be seen on URL: /component-examples

See PROD-1432.
```

```
This PR introduces the initial version of the Juries Feature.

This PR includes everything from branch: MASTER_COPY_JURIES – which in turn might pollute the diff a little, in that the last few bits and bobs of code from master might not be present in any GitHub branches.

Linting errors that was able to be automatically fixed has been fixed, but a few errors have to be sorted manually.

See PROD-1454, PROD-1455 and PROD-1457.
```

**Pro-tip:** _\*does a kickflip\*_ Vercel Preview Comments can be used to direct attention of stakeholders and reviewers by essentially bookmarking a specific part of an interface.

Pull-requests require the following checks to succeed in order to be merged:

- Linting succeeding with no errors.
- A preview environment being ready.
- Zero unresolved conversations on the pull-request itself.
- Zero unresolved conversations on Vercel Preview Comments.


## Playwright E2E FE&BE testing
Please refer to [internal playwright repo documentation](https://github.com/XXX/ui/blob/master/playwright/README.md) for more details.
