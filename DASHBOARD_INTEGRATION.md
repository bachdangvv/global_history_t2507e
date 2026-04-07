# Dashboard Integration Guide

## Overview

The public-frontend is now fully integrated with the dashboard-frontend, allowing users to seamlessly access advanced features for writing, editing, and managing articles with detailed metrics and analytics.

## Features

### 1. **Navbar Integration**
- **Write Article Button**: Quick access button in the navbar to write articles on the dashboard
- **User Avatar Menu**: Enhanced dropdown menu with multiple dashboard options:
  - 📚 My Articles
  - 📝 Write Article
  - 📊 Profile & Metrics
  - 🔔 Notifications

### 2. **Dashboard Recommendation Banners**
- Displayed on CreateArticlePage and EditArticlePage
- Informs users about enhanced dashboard features
- Direct link to the corresponding dashboard section

### 3. **Environment Configuration**
- Centralized configuration in `src/config/appConfig.js`
- Environment variables support for flexible deployment
- Easy URL switching between environments

## Configuration

### Environment Variables

Set these variables in `.env`:

```env
# Dashboard Frontend URL (where users write articles and view metrics)
VITE_DASHBOARD_URL=http://localhost:5174

# API Base URL
VITE_API_BASE_URL=http://localhost:8080/api
```

### Using the Configuration

```javascript
import { config } from '../../config/appConfig';

// Get full dashboard URL
config.getDashboardURL('/user/create');
// Returns: http://localhost:5174/user/create

// Redirect user to dashboard
config.redirectToDashboard('/user/profile');
```

## Dashboard Paths

The following paths are available in the dashboard:

| Path | Description |
|------|-------------|
| `/user` | User home - Published articles |
| `/user/create` | Create a new article |
| `/user/write` | Submit record edits |
| `/user/profile` | User profile & metrics |
| `/user/notifications` | Notifications & feedback |

## User Flow

### Writing an Article

1. User clicks "Write" button in navbar
2. Opens dashboard-frontend in new tab (http://localhost:5174/user/create)
3. User completes article with enhanced editor
4. Publishes article with real-time metrics
5. Article synced with public-frontend

### Editing Profile

1. User clicks avatar menu → "Profile & Metrics"
2. Opens dashboard profile page
3. User updates profile information
4. Changes reflected across platforms

### Viewing Notifications

1. User clicks avatar menu → "Notifications"
2. Opens dashboard notifications page
3. Displays approvals, votes, and feedback on articles

## Technical Details

### Cross-Origin Configuration

Dashboard-frontend is accessed via `target="_blank"` and `rel="noreferrer"` for security.

Backend API supports CORS for both frontends:
```
http://localhost:5173 (public-frontend)
http://localhost:5174 (dashboard-frontend)
```

### Authentication

- Token is stored in localStorage on public-frontend
- Token is automatically included in API requests via interceptor
- Dashboard-frontend manages its own authentication separately
- Users see SSO experience through URL token passing

### API Endpoints Used

**From public-frontend:**
- GET `/api/articles/search` - Search articles
- POST `/api/user/articles` - Create article (basic)
- PUT `/api/user/articles/{id}` - Edit article (basic)
- GET `/api/articles/{id}` - Get article details

**From dashboard-frontend (enhanced):**
- POST `/api/user/articles` - Create with metrics integration
- PUT `/api/user/articles/{id}` - Edit with analytics
- GET `/api/user/profile` - User profile & stats
- POST `/api/user/notifications` - Fetch notifications

## Deployment

### Development
```bash
# Terminal 1: public-frontend
cd public-frontend
npm run dev  # Runs on http://localhost:5173

# Terminal 2: dashboard-frontend
cd dashboard-frontend
npm run dev  # Runs on http://localhost:5174

# Terminal 3: backend API
# Run Spring Boot server on http://localhost:8080
```

### Production

Update `.env` with production URLs:

```env
VITE_DASHBOARD_URL=https://dashboard.globalhistory.app
VITE_API_BASE_URL=https://api.globalhistory.app
```

## File Changes

### Modified Files
1. `src/components/Navbar/Navbar.jsx` - Added user menu with dashboard links
2. `src/components/Navbar/Navbar.css` - Added Write Article button styling
3. `src/pages/CreateArticle/CreateArticlePage.jsx` - Added dashboard recommendation banner
4. `src/pages/EditArticle/EditArticlePage.jsx` - Added dashboard recommendation banner
5. `src/pages/EditorPage.css` - Added banner styling

### New Files
1. `src/config/appConfig.js` - Centralized configuration
2. `.env` - Environment variables
3. `.env.example` - Environment template

## Troubleshooting

### Dashboard not opening
- Check VITE_DASHBOARD_URL environment variable
- Ensure dashboard-frontend is running on correct port
- Check browser console for CORS errors

### Token not persisting
- Clear localStorage and login again
- Check if cookies are enabled in browser settings

### Styles not loading
- Clear browser cache
- Rebuild both applications

## Future Enhancements

- [ ] Single Sign-On (SSO) between frontends
- [ ] Real-time article sync
- [ ] Unified notification system
- [ ] Cross-app analytics dashboard
- [ ] User preference synchronization

## Support

For issues or questions about the dashboard integration:
1. Check the `.env` configuration
2. Review browser console for errors
3. Verify both applications are running
4. Check CORS settings in backend
