# Refactoring UI/UX Responsive pour ProStatsClub

L'objectif est d'adapter l'interface pour une expérience fluide sur mobile, tablette et desktop en utilisant Tailwind CSS et Tauri v2.

## User Review Required

> [!IMPORTANT]
> - Le **Header** sera drastiquement simplifié sur mobile pour ne garder que l'essentiel (Blason, Nom, SR, Recherche).
> - La **Navigation** passera d'une Sidebar à une Bottom Bar sur les écrans `< 768px`.
> - Les **Statistiques** utiliseront un carrousel horizontal sur mobile pour éviter de surcharger l'écran verticalement.

## Proposed Changes

### [Layout & Navigation]

#### [MODIFY] [App.tsx](file:///C:/Users/tatsu/Desktop/Prostatclub/Version_Mobile/src/App.tsx)
- Orchestration globale de la disposition responsive.
- Ajout de classes de padding de sécurité pour la Bottom Bar.

#### [MODIFY] [TitleBar.tsx](file:///C:/Users/tatsu/Desktop/Prostatclub/Version_Mobile/src/components/Layout/TitleBar.tsx)
- Refonte complète pour inclure le Header adaptatif.
- Mode Mobile : Blason + Nom tronqué + Badge SR + Loupe de recherche.
- Mode Desktop : Rétablissement de la barre de recherche et des contrôles de fenêtre.

#### [MODIFY] [Sidebar.tsx](file:///C:/Users/tatsu/Desktop/Prostatclub/Version_Mobile/src/components/Layout/Sidebar.tsx)
- Optimisation de la `MobileBottomNav` (cibles tactiles 48x48px, 5 icônes : Club, Joueurs, Matchs, Graphiques, Paramètres).

### [Dashboard & Widgets]

#### [MODIFY] [MainPanel.tsx](file:///C:/Users/tatsu/Desktop/Prostatclub/Version_Mobile/src/components/Layout/MainPanel.tsx)
- Refactorisation de `DashboardView` pour utiliser une **Bento Grid** adaptative.
- Mise en œuvre du carrousel horizontal pour les KPIs sur mobile.
- Refonte du widget "Évolution de Forme" (Hero) avec des hauteurs adaptatives.

### [Global Styles]

#### [MODIFY] [index.css](file:///C:/Users/tatsu/Desktop/Prostatclub/Version_Mobile/src/index.css)
- Ajout de classes utilitaires pour les carousels (`snap-x`, `no-scrollbar`).

## Verification Plan

### Automated Tests
- N/A (UI Refactoring)

### Manual Verification
- Déploiement sur l'appareil Android (Xiaomi Note 14 Pro+) pour vérifier l'ergonomie tactile.
- Redimensionnement de la fenêtre Tauri sur PC pour vérifier les breakpoints (sm, md, lg, xl).
- Vérification que la recherche s'ouvre correctement via la loupe sur mobile.
