# Git Branch Management Guide for Search Component

## Quick Start: Create and Push Search Component Branch

### Step 1: Create Feature Branch
```bash
cd c:\Users\Admin\global_history_t2507e
git checkout -b feature/search-component
```

### Step 2: Verify Changes
```bash
git status
```

You should see these new/modified files:
```
New files:
- public-frontend/src/pages/Search/Search.jsx
- public-frontend/src/pages/Search/Search.css
- public-frontend/src/components/Search/SearchBarMain/SearchBarMain.jsx
- public-frontend/src/components/Search/SearchBarMain/SearchBarMain.css
- public-frontend/src/components/Search/SearchResults/SearchResults.jsx
- public-frontend/src/components/Search/SearchResults/SearchResults.css
- public-frontend/src/components/Search/SearchResultCard/SearchResultCard.jsx
- public-frontend/src/components/Search/SearchResultCard/SearchResultCard.css
- SEARCH_COMPONENT_GUIDE.md
- GIT_BRANCH_GUIDE.md

Modified files:
- public-frontend/src/components/Navbar/Navbar.jsx
- public-frontend/src/components/Navbar/Navbar.css
- public-frontend/src/App.jsx
- public-frontend/src/mockData.js
```

### Step 3: Stage All Changes
```bash
git add .
```

### Step 4: Create Commit
```bash
git commit -m "feat: Add Crunchyroll-style search component with letter filtering

- Create Search page component with full search functionality
- Add SearchBarMain component with A-Z letter filters
- Add SearchResults component for displaying filtered results
- Add SearchResultCard component with image and info display
- Update Navbar with clickable search icon
- Update App.jsx with /search route
- Add 30 mock articles for search demonstration
- Support combined text and letter-based filtering
- Responsive design for all screen sizes
"
```

### Step 5: Push to Remote
```bash
# If the branch doesn't exist on remote
git push -u origin feature/search-component

# Or if it already exists
git push origin feature/search-component
```

## Detailed Breakdown

### Files Created in `/src/pages/Search/`
| File | Purpose |
|------|---------|
| `Search.jsx` | Main search page with state management |
| `Search.css` | Page styling and layout |

### Files Created in `/src/components/Search/`
| Directory | Files | Purpose |
|-----------|-------|---------|
| `SearchBarMain/` | JSX + CSS | Search input and letter filters |
| `SearchResults/` | JSX + CSS | Results container and grid |
| `SearchResultCard/` | JSX + CSS | Individual result cards |

### Files Modified
| File | Changes |
|------|---------|
| `Navbar.jsx` | Added search icon with hover state |
| `Navbar.css` | Added search icon styling |
| `App.jsx` | Added /search route and import |
| `mockData.js` | Added 30 searchArticles objects |

## Branch Strategy

### Option 1: Feature Branch (Recommended for development)
```bash
git checkout -b feature/search-component
# ... make changes ...
git push origin feature/search-component
# Create Pull Request on GitHub/GitLab
```

### Option 2: Release Branch (For deployment)
```bash
git checkout -b release/search-v1.0
# ... make changes ...
git push origin release/search-v1.0
```

### Option 3: Separate Repository
If you want the search component in a completely separate repo:
```bash
# Create new bare repository
git init --bare search-component.git

# Add as remote to current repo
git remote add search-repo /path/to/search-component.git

# Create and push branch
git checkout -b feature/search
git push search-repo feature/search
```

## Merging the Branch

### When Ready to Integrate

#### Via GitHub/GitLab:
1. Push the branch
2. Open a Pull Request
3. Review changes
4. Merge to main/master branch

#### Via Command Line:
```bash
# Switch to main/master branch
git checkout main

# Pull latest changes
git pull origin main

# Merge feature branch
git merge feature/search-component

# Optional: Delete feature branch after merge
git branch -d feature/search-component
git push origin --delete feature/search-component
```

## Rebase vs Merge

### Merge (Keeps history)
```bash
git checkout main
git merge feature/search-component
```

### Rebase (Linear history)
```bash
git checkout feature/search-component
git rebase main
git checkout main
git merge feature/search-component
```

## Viewing Branch Information

### List All Branches
```bash
# Local branches
git branch

# Remote branches
git branch -r

# All branches
git branch -a
```

### View Branch Changes
```bash
# See what's in this branch vs main
git diff main feature/search-component

# See commits in this branch
git log main..feature/search-component

# See files changed
git diff --name-only main feature/search-component
```

## Conflict Resolution (If Needed)

### If Conflicts Occur During Merge
```bash
# Fix conflicts in your editor
git add .
git commit -m "Resolve merge conflicts"
```

### Common Conflicts
- `Navbar.jsx` - Other features might also modify navbar
- `App.jsx` - Route conflicts if other routes added
- `mockData.js` - Data structure changes

## Rollback If Needed

### Undo Last Commit (Before Push)
```bash
git reset --soft HEAD~1
```

### Undo Pushed Commit (Create Revert)
```bash
git revert <commit-hash>
git push origin feature/search-component
```

### Delete Branch Completely
```bash
# Delete local
git branch -D feature/search-component

# Delete remote
git push origin --delete feature/search-component
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Search Component Tests

on:
  push:
    branches: [feature/search-component]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

## Best Practices

✅ **Do:**
- Keep branch focused on search feature only
- Write descriptive commit messages
- Test before pushing
- Keep commits atomic (one change per commit)
- Pull latest changes before merge

❌ **Don't:**
- Force push without discussion (use `git push --force-with-lease` if necessary)
- Mix search changes with unrelated features
- Commit node_modules or build files
- Use vague commit messages like "fixes"

## Revert Branch

If you need to undo all search changes:
```bash
# Option 1: Delete feature branch and start over
git branch -D feature/search-component

# Option 2: Reset feature branch to main
git checkout feature/search-component
git reset --hard origin/main
git push --force-with-lease origin feature/search-component

# Option 3: Keep the branch but undo changes
git revert <commit-hash>
```

## Useful Commands

```bash
# See branch creation date and last commit
git branch -v

# See who created each branch
git branch -vv

# See current branch
git branch --show-current

# Clean up deleted remote branches locally
git fetch --prune

# Search commits containing a string
git log -p -S "search term" --branches=feature/search-component
```

## Summary

The search component is now ready to be:
1. **Developed** on the `feature/search-component` branch
2. **Reviewed** via Pull Request
3. **Tested** independently
4. **Merged** to main when ready
5. **Deployed** with other changes or separately

This modular approach makes it easy to manage, test, and deploy the search feature independently from other development work.
