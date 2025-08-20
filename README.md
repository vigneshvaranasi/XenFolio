# XenFolio - Modern, customizable portfolio builder

## Usage Guide

### Crafting Your Portfolio

1. **Login/Register**: Access the editor via the home page.
2. **Navigate to My Space**: Create a craft Bench.
3. **Edit Sections**:
   - **Personal Information**: Add your name, bio, and contact details.
   - **Projects**: Showcase your best work with descriptions and links.
   - **Skills**: Select from a curated list or add your own.
   - **Work Experience**: Detail your professional journey.
4. **Preview**: See how your folio looks before sharing.
5. **Publish**: Save and publish your folio for the world to see.

### Managing Folios

- **My Space**: View, edit, or delete your published folios.
- **Preview**: See how your folio looks before sharing.
- **Unpublish**: Remove a folio from public view at any time.

---

## Project Structure

- `src/components/` — UI and layout components
- `src/pages/` — Main app pages (Home, Craft Bench, Folios, etc.)
- `src/store/` — State management (Contexts for Craft Bench, Folio, User)
- `src/assets/` — Images, icons, and static assets
- `public/folios/` — Static HTML previews for folio layouts
- `src/utils/` — Utility functions (validation, helpers)

## Backend

The backend (API and publishing engine) is maintained in a separate repository:
https://github.com/pavancos/FolioEngine