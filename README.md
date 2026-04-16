<!-- prettier-ignore -->
<div align="center">

# ArtifactDB

[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React_19-087ea4?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Playwright](https://img.shields.io/badge/Playwright-2ead33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

**Explore the Metropolitan Museum of Art collection through an interactive, filter-rich interface.**

[Features](#features) | [Getting started](#getting-started) | [Project structure](#project-structure) | [Tech stack](#tech-stack)

</div>

---

ArtifactDB is a React application that lets you browse, search, and filter through over 470,000 artifacts from [The Metropolitan Museum of Art Open Access API](https://metmuseum.github.io/). It provides a curated homepage with highlighted pieces, a universal search bar, and an advanced search page with filters for culture, date range, material, and department.

## Features

- **Highlighted artifacts** -- The homepage surfaces a curated selection of culturally significant items from the collection.
- **Universal search** -- A persistent search bar available on every page for quick keyword lookups.
- **Advanced filtering** -- Narrow results by culture/country, date range (3000 BCE -- 2000 CE), material, and department across 19 curatorial departments.
- **Detailed artifact view** -- Each item page displays high-resolution imagery, artist info, dimensions, medium, classification, credit line, and a link to the Met's website.
- **Grid & list views** -- Toggle between card grid and compact list layouts on the search results page.
- **E2E tested** -- Playwright test suite covering homepage, search, advanced search, and item detail flows across Chromium, Firefox, and WebKit.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Git](https://git-scm.com/)

### Installation

```bash
git clone https://github.com/Karasu-huginn/2WEBD.git
cd 2WEBD
npm install
```

### Development

```bash
npm run dev
```

The app starts at **http://localhost:5173**.

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npx playwright test` | Run E2E tests |

## Project structure

```
src/
├── main.tsx                 # Entry point, router setup, React Query provider
├── App.tsx                  # Homepage with highlighted artifacts
├── Navigation.tsx           # Persistent navbar with integrated search
├── Search.tsx               # Search logic and API types
├── AdvancedSearch.tsx        # Multi-filter search page
├── ItemDetails.tsx          # Single artifact detail view
├── HighlightedItem.tsx      # Featured artifact card component
├── SearchObjectResult.tsx   # Reusable result card (grid/list)
└── assets/
tests/
├── homePage.spec.ts
├── quickSearch.spec.ts
├── advancedSearch.spec.ts
├── itemDetail.spec.ts
└── uiUxDesign.spec.ts
```

### Routes

| Path | Page |
|------|------|
| `/` | Homepage with highlighted artifacts |
| `/advanced-search` | Advanced search with filters |
| `/objects/:item_id` | Artifact detail page |

## Tech stack

| Layer | Technology |
|-------|-----------|
| UI | React 19, Lucide React (icons) |
| Routing | React Router 7 |
| Data fetching | TanStack React Query |
| Language | TypeScript 5.8 |
| Build | Vite 6 with SWC |
| Testing | Playwright |
| API | [Met Museum Open Access API](https://metmuseum.github.io/) (no key required) |

## API notes

> [!NOTE]
> The Met's public API does not expose an exhaustive list of materials. The advanced search includes a representative subset to demonstrate filtering capabilities.

The app queries three endpoints from `collectionapi.metmuseum.org/public/collection/v1`:

- **`/objects`** -- Full list of object IDs
- **`/search`** -- Keyword and filtered search
- **`/objects/{id}`** -- Individual artifact details
