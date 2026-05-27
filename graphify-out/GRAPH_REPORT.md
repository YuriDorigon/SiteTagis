# Graph Report - C:\Users\ryzen5\Documents\estudos\SiteTagis  (2026-05-27)

## Corpus Check
- Corpus is ~32,595 words - fits in a single context window. You may not need a graph.

## Summary
- 565 nodes · 991 edges · 47 communities (33 shown, 14 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 24 edges (avg confidence: 0.88)
- Token cost: 25,856 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Admin CRUD Forms|Admin CRUD Forms]]
- [[_COMMUNITY_Convenios + Medicos UI Cards|Convenios + Medicos UI Cards]]
- [[_COMMUNITY_App Root Layout + Fontes|App Root Layout + Fontes]]
- [[_COMMUNITY_Package Dependencies + Config|Package Dependencies + Config]]
- [[_COMMUNITY_Corpo Clinico + Filtros|Corpo Clinico + Filtros]]
- [[_COMMUNITY_Home Page + SEO + Mapa|Home Page + SEO + Mapa]]
- [[_COMMUNITY_Docs + Admin + LGPD|Docs + Admin + LGPD]]
- [[_COMMUNITY_Toast Notifications State|Toast Notifications State]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Shadcn UI Config|Shadcn UI Config]]
- [[_COMMUNITY_Firebase Provider + Auth|Firebase Provider + Auth]]
- [[_COMMUNITY_Firestore Data Layer|Firestore Data Layer]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 32 edges
2. `compilerOptions` - 16 edges
3. `useFirestore()` - 16 edges
4. `FirestorePermissionError` - 15 edges
5. `useToast()` - 15 edges
6. `Button` - 12 edges
7. `errorEmitter` - 12 edges
8. `ClinicConfig` - 12 edges
9. `Specialty` - 11 edges
10. `Exam` - 11 edges

## Surprising Connections (you probably didn't know these)
- `SiteTagis CLAUDE.md` --references--> `SiteTagis Next.js Application`  [EXTRACTED]
  CLAUDE.md → public/favicon.svg
- `SiteTagis Next.js Application` --implements--> `Next.js (App Router)`  [EXTRACTED]
  public/favicon.svg → CLAUDE.md
- `SiteTagis Next.js Application` --references--> `Vercel (deploy)`  [EXTRACTED]
  public/favicon.svg → CLAUDE.md
- `SiteTagis Next.js Application` --references--> `Tagis Medicina e Diagnostico`  [EXTRACTED]
  public/favicon.svg → CLAUDE.md
- `SiteTagis Next.js Application` --implements--> `Fontes Outfit DM Sans Cormorant Garant`  [EXTRACTED]
  public/favicon.svg → CLAUDE.md

## Communities (47 total, 14 thin omitted)

### Community 0 - "Admin CRUD Forms"
Cohesion: 0.09
Nodes (39): ConvenioFormData, ManageConvenios(), DoctorFormData, ManageDoctors(), ExamFormData, ManageExams(), ManageSettings(), Section (+31 more)

### Community 1 - "Convenios + Medicos UI Cards"
Cohesion: 0.06
Nodes (31): ConvenioCardProps, ConveniosListProps, ConveniosCarouselProps, FAQSectionProps, HeroSectionProps, TestimonialsCarouselProps, AppLayoutProps, FloatingWhatsAppButtonProps (+23 more)

### Community 2 - "App Root Layout + Fontes"
Cohesion: 0.05
Nodes (39): dmSans, metadata, outfit, RootLayout(), viewport, navLinks, cn(), SectionTitle() (+31 more)

### Community 3 - "Package Dependencies + Config"
Cohesion: 0.04
Nodes (48): dependencies, aos, class-variance-authority, clsx, date-fns, embla-carousel-autoplay, embla-carousel-react, firebase (+40 more)

### Community 4 - "Corpo Clinico + Filtros"
Cohesion: 0.08
Nodes (30): DoctorCard(), DoctorCardProps, getInitials(), DoctorFilterProps, DoctorsListProps, EspecialidadesPage(), metadata, metadata (+22 more)

### Community 5 - "Home Page + SEO + Mapa"
Cohesion: 0.08
Nodes (25): getData(), HomePage(), jsonLd, MapEmbedProps, metadata, ConveniosPage(), metadata, CorpoClinicoPage() (+17 more)

### Community 6 - "Docs + Admin + LGPD"
Cohesion: 0.08
Nodes (31): SiteTagis CLAUDE.md, Favicon SVG — Tagis Logo, LGPD Lei Geral de Protecao de Dados, Politica de Privacidade LGPD, Dashboard Admin, SiteTagis Next.js Application, ExamResultsModal, FAQSection dinamico (+23 more)

### Community 7 - "Toast Notifications State"
Cohesion: 0.12
Nodes (22): Action, ActionType, actionTypes, addToRemoveQueue(), dispatch(), genId(), listeners, memoryState (+14 more)

### Community 8 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 9 - "Shadcn UI Config"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 10 - "Firebase Provider + Auth"
Cohesion: 0.18
Nodes (10): FirebaseErrorListener(), FirebaseContext, FirebaseContextState, FirebaseProviderProps, FirebaseServicesAndUser, MemoFirebase, useFirebase(), useFirebaseApp() (+2 more)

### Community 11 - "Firestore Data Layer"
Cohesion: 0.20
Nodes (10): app, convenios, db, doctors, exams, firebaseConfig, main(), seedCollection() (+2 more)

### Community 12 - "Community 12"
Cohesion: 0.29
Nodes (6): AdminSidebar(), navItems, EVENTS, InactivityGuard(), metadata, useAuth()

### Community 13 - "Community 13"
Cohesion: 0.28
Nodes (5): AdminDashboard(), sections, Stats, AuthGuard(), useUser()

### Community 14 - "Community 14"
Cohesion: 0.31
Nodes (5): FirebaseClientProvider(), FirebaseClientProviderProps, getSdks(), initializeFirebase(), FirebaseProvider()

### Community 15 - "Community 15"
Cohesion: 0.28
Nodes (7): buildAuthObject(), buildErrorMessage(), buildRequestObject(), FirebaseAuthObject, FirebaseAuthToken, SecurityRuleContext, SecurityRuleRequest

### Community 16 - "Community 16"
Cohesion: 0.36
Nodes (7): Healthcare Iconography, Medical Cross Symbol, Navy Blue Color (#0d3f57), Red and White Color Palette, Tagis Brand Identity, icon.tsx (ImageResponse Generator), Tagis App Icon (PNG)

### Community 17 - "Community 17"
Cohesion: 0.25
Nodes (4): AppEvents, Callback, UseDocResult, WithId

### Community 18 - "Community 18"
Cohesion: 0.38
Nodes (7): Tagis Medicina e Diagnóstico Brand, Navy Blue (#003049), White Fill, Navy Blue Rounded Square Background, White Cross / Medical Symbol, Tagis Logo SVG, SiteTagis Institutional Website

### Community 19 - "Community 19"
Cohesion: 0.29
Nodes (3): metadata, BENEFITS, FormState

### Community 21 - "Community 21"
Cohesion: 0.40
Nodes (3): InternalQuery, UseCollectionResult, WithId

## Knowledge Gaps
- **215 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+210 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `App Root Layout + Fontes` to `Admin CRUD Forms`, `Convenios + Medicos UI Cards`, `Corpo Clinico + Filtros`, `Toast Notifications State`, `Community 12`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `FirestorePermissionError` connect `Admin CRUD Forms` to `Firebase Provider + Auth`, `Community 13`, `Community 15`, `Community 17`, `Community 20`, `Community 21`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `useFirestore()` connect `Admin CRUD Forms` to `Firebase Provider + Auth`, `Community 13`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _221 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Admin CRUD Forms` be split into smaller, more focused modules?**
  _Cohesion score 0.08867427568042142 - nodes in this community are weakly interconnected._
- **Should `Convenios + Medicos UI Cards` be split into smaller, more focused modules?**
  _Cohesion score 0.055523085914669784 - nodes in this community are weakly interconnected._
- **Should `App Root Layout + Fontes` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._