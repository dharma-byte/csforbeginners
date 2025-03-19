# Introduction about GIT & GITHUB

The important keywords to learn in order to understand how git works are as follows:

1. Git
2. Github
3. Repository
4. Branch
5. Pull request
6. Fetch
7. Pull
8. Push
9. Commit
10. Checkout
11. Stage

## GIT

Git is a distributed version control system that tracks changes in files, commonly used for software development to manage code and collaborate on projects.

## GITHUB

GitHub is a web-based platform that provides a cloud-based Git repository hosting service, enabling developers to store, share, and collaborate on code projects, track changes, and manage version control.

## Repository

A repository is the most basic element of GitHub. It's a place where you can store your code, your files, and each file's revision history. Repositories can have multiple collaborators and can be either public or private.

## Branch

A branch in Git is simply a lightweight movable pointer to one of these commits. The default branch name in Git is main. As you start making commits, you're given a main branch that points to the last commit you made. Every time you commit, the main branch pointer moves forward automatically.

## Commit

Commits can be thought of as snapshots or milestones along the timeline of a Git project. Commits are created with the git commit command to capture the state of a project at that point in time. Git Snapshots are always committed to the local repository.

## Fetch

Git fetch is a primary command used to download contents from a remote repository. git fetch is used in conjunction with git remote , git branch , git checkout , and git reset to update a local repository to the state of a remote.

## Pull Request

A pull request, often abbreviated as PR, serves as a proposal to merge changes made in one branch of a repository into another, typically from a feature branch into the main branch. Pull requests are essential for facilitating code reviews, encouraging collaboration, and maintaining a clean, well-documented codebase.

## Pull

The git pull command is used to fetch and download content from a remote repository and immediately update the local repository to match that content.

## Push

Git push allows us to transfer files from the local repository to remote repository hosting services like GitHub, GitLab, etc. Other developers who want to work on the files can access them after being uploaded to a remote repository.

## Checkout

The checkout command tells Git which branch or commit you want your changes applied. Git checkout helps you apply changes to the right branch, and it can also be great for reviewing old commits.

## Stage

Git has three main states that your files can reside in: modified, staged, and committed: Modified means that you have changed the file but have not committed it to your database yet. Staged means that you have marked a modified file in its current version to go into your next commit snapshot.

# Commands

There are various commands we use in git, we can easily understand about all the commands that we use by referring through given below link,where they explain about each command with an example.

[Commands](https://www.youtube.com/watch?v=Ez8F0nW6S-w&t=3677s)

## Workflow of GIT

1. Github Repo
2. Clone
3. Changes
4. Add
5. Commit
6. Push
  
These are the steps we follow in order to edit or change the contents in the Repository.

## Frequently used commands in GIT are as follows:

git add <-filename->(adds info to the repository)

git commit -m "Some message"(adds message)

git push origin main(push command)

git push origin branchname (SUb-branch)

git branch (to check in which branch we are present)

git checkout -b <-branchname -> (to create a new branch)

git checkout branchname (to switch the branch)

git pull origin main (pull command)

git status (shows the status)

git merge <-branchname-> (to merge two branches)