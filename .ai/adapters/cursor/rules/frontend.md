---
name: "Frontend Rules"
description: "Frontend-specific development standards and best practices"
applies_to: ["frontend", "ui", "client"]
priority: "medium"
tools:
  cursor:
    mode: "applyToSpecificFiles"
    globs: ["src/**/*.tsx", "src/**/*.jsx", "components/**/*", "pages/**/*", "app/**/*.tsx"]
  claude-code:
    mode: "context_aware"
    scope: "frontend"
  gemini-cli:
    mode: "conditional_prompt"
    trigger: ["react", "vue", "angular", "frontend"]
---

# 🎨 Frontend Development Rules

## React/Next.js Standards
- **Server Components First**: Use Server Components by default, add 'use client' only when needed
- **TypeScript Strict**: No `any` types, proper type definitions required
- **Component Architecture**: One component per file, clear prop interfaces
- **State Management**: Use built-in React state, upgrade to Zustand/Redux only when necessary

## Performance Guidelines
- **Bundle Size**: Monitor and optimize bundle size
- **Lazy Loading**: Implement code splitting for large components
- **Image Optimization**: Use Next.js Image component or equivalent
- **Caching**: Implement proper caching strategies

## UI/UX Standards
- **Design System**: Follow established design system patterns
- **Accessibility**: WCAG 2.1 AA compliance required
- **Responsive Design**: Mobile-first approach
- **Loading States**: Implement proper loading and error states

## Code Quality
- **ESLint/Prettier**: Enforce consistent code formatting
- **Testing**: Unit tests for components, integration tests for pages
- **Error Boundaries**: Implement error handling for React components
- **PropTypes/TypeScript**: Proper type checking for all props

## Security Practices
- **XSS Prevention**: Sanitize user inputs, avoid dangerouslySetInnerHTML
- **Environment Variables**: Never expose secrets in client-side code
- **HTTPS Only**: All external API calls must use HTTPS
- **Content Security Policy**: Implement proper CSP headers

## File Organization
```
src/
├── components/          # Reusable UI components
├── pages/              # Next.js pages or route components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── styles/             # Global styles and themes
```

## Common Patterns
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Context Pattern**: Use React Context for global state
- **Compound Components**: Build flexible component APIs
- **Render Props**: Use for complex component composition

## Forbidden Patterns
- Direct DOM manipulation (use React refs instead)
- Inline styles (use CSS modules or styled-components)
- Global variables in client-side code
- Uncontrolled components without good reason