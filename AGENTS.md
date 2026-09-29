# Project architecture

- Keep all student progress in the existing `jamb-mastery-machine` local-storage shape so redesigns never erase returning users’ work.
- Keep the authenticated experience as a single protected workspace with view state controlled by `Index.tsx`, because CBT and study tools already depend on local in-memory transitions.
- Express visual styling through semantic Tailwind tokens in `src/index.css`; components must not introduce raw palette values.