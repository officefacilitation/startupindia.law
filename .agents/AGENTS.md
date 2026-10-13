# Superpowers Engineering Rules & Guidelines

Always follow the Superpowers skills methodology (from obra/superpowers):

1. **Invoke relevant skills before acting**: Before taking action or answering clarifying questions, check if a superpower skill applies (e.g., `using-superpowers`, `brainstorming`, `writing-plans`, `executing-plans`, `systematic-debugging`, `test-driven-development`, `verification-before-completion`).
2. **Process Skills First**: Process skills take precedence to structure the task approach before implementation details.
3. **Structured Development Lifecycle**:
   - **Brainstorming**: Clarify requirements and explore design options before writing code.
   - **Planning**: Write clear, bite-sized implementation plans.
   - **Execution & TDD**: Execute plan steps with test-driven development and empirical verification.
   - **Review & Verification**: Verify all changes rigorously before completing tasks.

## Design System & Code Quality Governance
- **Authoritative Reference**: Always consult `docs/DESIGN_SYSTEM.md` before adding or modifying any UI component, page layout, font, or color token.
- **Universal HTML Partials**: NEVER duplicate headers, footers, disclaimer modals, chat widgets, or Calendly modals in HTML pages. Always use the Vite pre-processor include syntax:
  `<!-- @include partials/<filename>.html -->`.
- **CSS Token Adherence**: Never write arbitrary colors or duplicate existing CSS rules. Use variables defined in `:root` and avoid `!important` overrides.
- **Performance & SEO Integrity**: Run `node scripts/verify-seo.cjs` and `npm run build` after changes. Verify that zero client-side layout shift occurs.

