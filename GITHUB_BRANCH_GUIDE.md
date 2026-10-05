# GitHub Branch Guide

Branches included:

- `main` - common/base Online Voting System
- `user` - voter/user-side branch
- `admin` - election-admin-side branch

## Push to GitHub

Create an empty GitHub repository first, then run:

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
git push -u origin user
git push -u origin admin
```

## Switch branches

```bash
git switch main
git switch user
git switch admin
```

The project is an academic demonstration using HTML, CSS, JavaScript and Local Storage.
