---
path: '/blog/github-actions'
date: '2020-03-25'
title: 'Github Actions'
description: 'Personal thoughts on Githubs new automation service.'
---

### Introduction

My company recently moved from hosting our repositories on-premises with Bitbucket Server to cloud hosted Github. We are on the "Team" plan which costs us about the same as maintaining the on-premises servers. With the recent introduction of [Github Actions](https://github.com/features/actions) we also moved our CI/CD pipeline from Bamboo to Github and couldn't be happier about it.

Github Actions is more than CI/CD. It allows you to [automate, customize, and execute](https://help.github.com/en/actions) your software development workflows. It works by checking YAML files in to your repository that listen on events and execute custom jobs. They have really nailed their events, you may execute jobs based on an event on Github, such as a `git push` or a created pull request, or on a scheduled, or even an external event. In combination with versatile filters your workflow can listen and react to just about anything.

```yaml
name: ci

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [8.x, 10.x, 12.x]

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: npm run build --if-present
      - run: npm test
        env:
          CI: true
```

A configuration like the one above would listen for pushes to the `master` branch and execute a pretty standard CI workflow using different versions of Node.

Another nice thing is that you can reuse actions created by the community, or in this case Github themselves. The first step `actions/checkout@v2` points to the `checkout` repo in the `actions` organization (https://github.com/actions/checkout). Anybody can build actions and share them with others.

The example above runs on `ubuntu-latest`. Github provides their own servers to run your action. Our plan includes 10'000 minutes of usage per month for free. What they don't really advertise though is the ability to have self-hosted runners. You can basically just fire up an Ubuntu VM on your ESXi and run a couple of commands to turn it into a Github Runner. Previously we paid money to host Bamboo on-premises and went through a lot of pain to set up our pipelines. Now we just host a couple of free Github Runners on servers we already paid for and use them to execute all of our workflows.

### Practical examples of workflows

#### CI

The most obvious thing is continuous integration. We use our self-hosted runners to execute install, build, test, and lint jobs. The main runner has 30 vCPUs and runs our build and test jobs ~3.6x faster than using Githubs `ubuntu-latest`.

#### Labels

You can use labels to mark pull requests on Github. We used an [open-source action](https://github.com/pascalgn/size-label-action) to add size labels to every pull request. These labels indicate how many lines of code have changed in that particular PR. The workflow listens on all `pull_request` events, which means it will run whenever a pull request is created or updated with new commits.

```yaml
name: labels

on: pull_request

jobs:
  size-label:
    runs-on: ubuntu-latest
    steps:
      - name: size-label
        uses: 'pascalgn/size-label-action@df7ad4303b35cbeb20937dbb12d5a050520e469e'
        env:
          GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}'
          IGNORED: 'package-lock.json\n**/package-lock.json'
```

#### Lint pull request names

Since we are using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to automatically generate change logs, and are squashing pull request branches to `master`, the title of a pull request becomes a critical part of our release process. This workflow allows us to automatically verify that a pull request title adheres to our [commitlint](https://commitlint.js.org) rules.

```yaml
name: lint

on:
  pull_request:
    types: ['opened', 'edited', 'reopened', 'synchronize']

jobs:
  pr-name:
    runs-on: self-hosted
    steps:
      - uses: actions/checkout@v1
      - uses: dislick/pull-request-name-linter-action@v1.0.0
```

#### CD

Whenever we are releasing a new version, the first workflow builds our packages and publishes them to NPM and Docker registries. After that another workflow deploys multiple services to production, all without us having to do anything. On stable releases we even have a workflow that emails the generated change log to stake holders.

### Closing Thoughts

We are a small team without any DevOps engineers. Github Actions allows us to deploy with confidence (I know, this is literally the slogan of every CI/CD product ever) and automate more workflows at a cheaper price than any of its competitors.

⚡️
