# Search Component Documentation

## Overview
A complete Search feature has been added to the Global History application with a Crunchyroll-inspired design. This is a self-contained component that can be easily pushed to a separate Git branch for development and review.

## Directory Structure
```
src/
├── pages/
│   └── Search/
│       ├── Search.jsx          (Main Search page component)
│       └── Search.css          (Search page styling)
├── components/
│   └── Search/
│       ├── SearchBarMain/
│       │   ├── SearchBarMain.jsx       (Search bar with letter filters)
│       │   └── SearchBarMain.css
│       ├── SearchResults/
│       │   ├── SearchResults.jsx       (Results container)
│       │   └── SearchResults.css
│       └── SearchResultCard/
│           ├── SearchResultCard.jsx    (Individual result card)
│           └── SearchResultCard.css
```

## Features

### 1. **Search Page** (`src/pages/Search/Search.jsx`)
- Main search page component with full state management
- Real-time search functionality
- Letter-based filtering
- Integration with mock data for database-like queries

### 2. **Search Bar Component** (`SearchBarMain`)
- Modern search input with icon
- Alphabet-based letter filter (A-Z)
- Filter toggle with hover tooltip
- Clear filters button
- Responsive design
- Real-time search handling

### 3. **Search Results** (`SearchResults`)
- Grid layout for search results
- Result count display
- Loading state handling
- No results state with helpful message
- Responsive grid layout

### 4. **Result Card** (`SearchResultCard`)
- Image showcase (160x200px on desktop)
- Title and description with text truncation
- Category and country badges
- Statistics section (likes, comments, views)
- Hover effects with smooth animations

### 5. **Search Icon in Navbar**
- Magnifying glass icon (🔍) in the header
- Hover tooltip showing "Search"
- Clickable to navigate to /search route
- Styled to match the overall theme

## Usage

### Accessing the Search Feature
Users can:
1. Click the search icon (🔍) in the navbar
2. Or navigate directly to `/search` route

### Search Functionality
- **Text Search**: Type keywords to search across title, description, category, and country
- **Letter Filter**: Click any letter (A-Z) to filter results starting with that letter
- **Combined Search**: Use both text and letter filters simultaneously
- **Clear Filters**: Click "Clear Filters" button to reset all filters

## Data Structure

### Search Article Object
```javascript
{
  id: number,
  title: string,                    // Article title
  description: string,              // Short description
  category: string,                 // Category name
  country: string,                  // Country name
  likes: number,                    // Like count
  comments: number,                 // Comment count
  views: number,                    // View count
  image: string                     // Image URL
}
```

### Mock Data
The `searchArticles` array in `src/mockData.js` contains 30 sample articles covering various historical topics. Update this data when connecting to a real backend.

## Styling & Theme

### Color Scheme
- **Primary Dark**: `#1a1d21`
- **Secondary Dark**: `#2c2f33`
- **Accent Red**: `#e74c3c` (search button, active filters)
- **Text Light**: `#f7f4ea`
- **Text Dim**: `#a8a8a8`

### Responsive Breakpoints
- **Desktop**: Full width grid with side-by-side layout
- **Tablet/Mobile**: Stacked layout with optimized spacing

## Integration Steps

### 1. Database Integration
Replace `searchArticles` data in `src/mockData.js` with API calls:

```javascript
// In Search.jsx
const handleSearch = async ({ query, letter }) => {
  setIsLoading(true);
  try {
    const response = await fetch(`/api/articles/search?q=${query}&letter=${letter}`);
    const data = await response.json();
    setResults(data);
  } catch (error) {
    console.error('Search failed:', error);
  }
  setIsLoading(false);
};
```

### 2. API Endpoint Requirements
Expected endpoint: `GET /api/articles/search`

Query Parameters:
- `q`: Search query string
- `letter`: Single letter filter (A-Z) or null

Response Format:
```javascript
[
  {
    id: number,
    title: string,
    description: string,
    category: string,
    country: string,
    likes: number,
    comments: number,
    views: number,
    image: string
  }
]
```

## Git Branch Management

### Creating a Separate Branch
```bash
# Create a new branch for the Search feature
git checkout -b feature/search-component

# Make changes and commit
git add .
git commit -m "Add Crunchyroll-style search component"

# Push to remote
git push origin feature/search-component
```

### Branch Contents
This entire Search component is self-contained and can be merged or deployed independently:
- All Search-related components and styles
- Updated Navbar with search icon
- Updated App.jsx with search route
- Mock data for search functionality

## Component Props

### SearchBarMain
```jsx
<SearchBarMain 
  onSearch={(filters) => {}}    // Called with {query, letter}
  onLetterSelect={(letter) => {}} // Called when letter is selected
/>
```

### SearchResults
```jsx
<SearchResults 
  results={[]}           // Array of article objects
  isLoading={false}      // Loading state
  selectedLetter={null}  // Currently selected letter filter
/>
```

### SearchResultCard
```jsx
<SearchResultCard 
  result={{}}  // Single article object
/>
```

## Performance Considerations
- Search results are filtered client-side with 300ms debounce
- Images use optimized Wikipedia URLs
- Lazy loading ready (can be added to SearchResultCard)
- No infinite scroll in current implementation (can be added)

## Future Enhancements
- [ ] Pagination or infinite scroll for large result sets
- [ ] Advanced filters (date range, author, etc.)
- [ ] Search suggestions/autocomplete
- [ ] Recent searches history
- [ ] Search result caching
- [ ] Analytics tracking for search terms
- [ ] Saved searches functionality

## Customization

### Changing Colors
Edit the CSS files or update CSS variables:
- `SearchBarMain.css` - Search bar colors
- `SearchResults.css` - Results container colors
- `SearchResultCard.css` - Card styling

### Adjusting Grid Layout
Modify `grid-template-columns` in `SearchResults.css`

### Filter Alphabet
Edit the `alphabet` variable in `SearchBarMain.jsx` to customize available letters

## Troubleshooting

### Search icon not appearing
- Check that Navbar component is using the updated version
- Verify router is properly set up with BrowserRouter in App.jsx

### Search route returns 404
- Ensure App.jsx has the `/search` route added
- Verify Search component is properly imported

### No results showing
- Check that mockData has searchArticles exported
- Verify search query matches article titles/descriptions
- Check browser console for errors

## Testing

### Manual Testing Checklist
- [ ] Click search icon in navbar → navigates to /search
- [ ] Type in search bar → results filter in real-time
- [ ] Click letter A-Z → results filter by letter
- [ ] Click another letter → removes previous selection (toggle)
- [ ] Click "Clear Filters" → resets all filters
- [ ] Hover over search icon → shows tooltip
- [ ] Hover over result card → card lifts and glows
- [ ] Responsive design works on mobile/tablet

## Support
For questions or issues with the Search component, refer to the component JSX files for detailed inline comments.
