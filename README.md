
# Ruchir Kalokhe - Personal Portfolio

A modern, performant personal portfolio built with [Astro](https://astro.build) featuring a neo-brutalist design aesthetic with a cyan accent color system.

## Features

- **Fast & Static**: Built with Astro for optimal performance
- **Modern Design**: Clean, minimalist portfolio with responsive layout
- **Smooth Navigation**: Scroll spy sidebar navigation with smooth transitions
- **Component-Based**: Reusable Astro components for maintainability
- **TypeScript Support**: Full TypeScript support for type safety
- **Responsive**: Mobile-first responsive design

## Project Structure

```
/src
  /components      # Reusable Astro components
  /layouts         # Layout templates
  /pages           # Page routes (Astro file-based routing)
  /styles          # Global CSS styles
  /data            # Content data (TypeScript)
/public            # Static assets
```

## Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview

```bash
npm run preview
```

## Components

- **Sidebar**: Navigation and profile section
- **Hero**: Introduction section with name and role
- **ExperienceCard**: Work experience entries
- **ProjectCard**: Portfolio project showcases
- **AccomplishmentItem**: Achievements and awards
- **EducationCard**: Education history
- **SectionHeader**: Section title with numbering

## Customization

Edit `/src/data/portfolio.ts` to update:
- Hero section (name, role, bio)
- Experience entries
- Projects showcase
- Accomplishments
- Education history

Update component files in `/src/components` to modify styling.

## Design System

### Colors
- **Background**: `#0f172a`
- **Surface**: `#1e293b`
- **Accent**: `#06b6d4` (Cyan)
- **Primary**: `#f1f5f9`
- **Secondary**: `#cbd5e1`

### Typography
- **Heading**: Rux Documan (serif)
- **Body**: Geist (sans-serif)
- **Mono**: Geist Mono (monospace)

## Deployment

Deploy to Vercel with one click or deploy manually:

```bash
npm run build
vercel --prod
```

## License

MIT
