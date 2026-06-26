# Skill : Trilogy Design System (Bouygues Telecom)

Ce document sert de référence officielle pour l'implémentation d'interfaces utilisateur (UI) dans ce projet. Il est basé sur le Design System "Trilogy" de Bouygues Telecom. L'agent IA et les développeurs doivent s'y référer pour toute question de conception ou de choix de composants afin de garantir la cohérence et le respect des règles d'accessibilité.

## Principes Généraux et Fondations

### 1. Utilisation des Grilles et Espacements
- L'interface repose sur un système de **12 colonnes** pour structurer le contenu (composant `Columns`).
- Utiliser le composant `FlexBox` pour aligner et disposer de façon répétitive des éléments enfants.
- L'espacement doit respecter une harmonie constante. Toujours s'appuyer sur les règles des conteneurs (ex: `Container`, `Section`, `Box`) pour la disposition.

### 2. Accessibilité (A11y)
L'accessibilité n'est pas optionnelle. Chaque composant développé doit :
- Gérer le focus correctement (ex: une modale ouverte doit capturer le focus, une alerte doit recevoir le focus pour la lecture d'écran).
- Utiliser les bons attributs ARIA (ex: `aria-required`, `aria-pressed`, `aria-labelledby`) selon les spécifications.
- Être entièrement navigable au clavier (utilisation de la touche `Tab`, `Entrée`, `Espace`).
- Les éléments non sémantiques (comme les icônes décoratives) doivent être cachés avec `aria-hidden="true"` ou un `alt=""` vide pour les images. Les icônes porteuses de sens doivent être accompagnées d'un texte pour les lecteurs d'écran via la classe `.sr-only`.

### 3. Philosophie de Développement
- **Do and Don't** : Chaque composant s'accompagne de règles strictes "À faire" et "À ne pas faire". Celles-ci doivent être scrupuleusement respectées (voir ci-dessous).
- **Simplicité** : Ne pas surcharger l'interface d'alertes ou de notifications (max 1 appel à l'action par alerte). Privilégier les titres concis.

---

# Catalogue Complet des Composants Trilogy (46 composants)

## Accordion
**Description**: L’accordéon permet d'afficher de grandes quantités de contenu dans un espace réduit grâce à la divulgation progressive.

### Usage
L’accordéon permet de regrouper des informations dans des sections repliables. Chaque section peut être développée ou réduite en cliquant sur l'en-tête de la section. Cela permet aux utilisateurs d’afficher seulement les informations qu'ils souhaitent voir.

##### **Quand utiliser**

- **Vente :** les accordéons peuvent être utilisés pour organiser des informations détaillées sur les produits comme les descriptions, les spécifications techniques, les avis des clients et les FAQ. Cela permet aux utilisateurs de consulter facilement les informations sans être submergés.

- **Application :** les accordéons peuvent être utilisés pour structurer des sections comme les détails de compte, les paramètres de facturation, les historiques de transactions et les options de support. Cela aide à maintenir une interface propre et bien organisée, facilitant l'accès aux informations pertinentes.



##### **Quand ne pas utiliser**

- à des fins purement SEO / éditoriales (cf. mur produits)
- à des fins de navigation
- pour des informations essentielles à l’utilisateur ou pour masquer des étapes (cf. stepper)

### Accessibilité
## Comment l'utiliser
- chaque en-tête est un titre de section qui introduit du contenu
- chaque titre doit avoir comme markup un "h2", "h3", "h4", "h5" ou "h6" en fonction de la place du composant dans la page (voir le composant title)

**Exemple de code :**
```
<details> 
	<summary role="button"> 
		<h2>Quel smartphone choisir ?</h2> 
	</summary> 
	< !-- contenu du panneau associé  --> 
</details> 
```
## Comment tester
- utiliser la touche "Tab" pour arriver au premier élément de l'accordéon
- la prise du focus clavier est visible sur cet élément
- activer l'élément avec la touche "Entrée" ou "Barre d'espace"
- le contenu apparait et le focus reste sur l'élément
- activer à nouveau l'élément avec la touche "Entrée" ou "Barre d'espace"
- le contenu disparait et le focus reste sur l'élément



### Règles (Do & Don't)
- Ne pas dépasser plus de 5 accordéons pour limiter l’encombrement et la charge cognitive

---

## Alert
**Description**: Les alertes sont utilisées pour afficher des informations concernant un impact sur l'expérience utilisateur et les utilisations du produit.


### Usage
Le composant "Alerte" est un élément destiné à attirer l'attention de l'utilisateur sur des informations importantes, des erreurs, des avertissements ou des confirmations. Il se manifeste généralement sous forme de bandeau ou de boîte de dialogue contenant un message clair et concis, souvent accompagné d'icônes pour renforcer la compréhension visuelle.

- **Messages d'erreur** : Pour informer l'utilisateur d'un problème ou d'une action nécessaire pour corriger une erreur.
- **Notifications de succès** : Pour confirmer qu'une action a été complétée avec succès.
- **Avertissements** : Pour prévenir l'utilisateur d'une action potentiellement risquée ou des conséquences possibles.
- **Informations importantes** : Pour fournir des informations critiques qui nécessitent une attention immédiate de l'utilisateur.

#### **Exemples d’usages**

- **Vente** : les alertes sont utilisées pour notifier les utilisateurs des promotions, des soldes, des erreurs de paiement, des ruptures de stock ou des mises à jour importantes concernant leur commande.

- **Assistance** : les alertes sont utilisées pour informer les utilisateurs des interruptions de service, des changements de politiques, des réponses à leurs tickets ou des recommandations d'actions.

- **Application/Espace client** : les alertes sont utilisées pour signaler des activités suspectes, des changements de statut de compte, des notifications de facturation, ou des rappels de paiement.


#### **Quand ne pas utiliser**

- **Messages non essentiels** : Évitez d'utiliser des alertes pour des informations triviales qui ne nécessitent pas une attention immédiate.

- **Trop d'alertes** : Ne pas surcharger une page avec plusieurs alertes en même temps. Priorisez les messages les plus importants. 

- **Informations de fond** : Pour des informations contextuelles ou détaillées qui ne nécessitent pas une action immédiate, préférez des infobulles ou des modals


### Accessibilité
## Comment l'utiliser
**Titre**
- Le titre de l'alerte introduit du contenu
- Ce titre a comme markup un "h1", "h2", "h3", h4", "h5" ou "h6"
- Ne pas utiliser le markup "p"

**Délai**
- Une alerte ne doit pas disparaître automatiquement. 

**Bouton de fermeture**
- L'alerte disparaît uniquement après activation du bouton de fermeture (croix).
- Le bouton de fermeture est un pictogramme croix interactif qui a comme intitulé "Fermer X", avec X le titre de l’alerte :
	- C’est un élément "button"
    - Il contient le pictogramme croix
    - Il contient l’intitulé caché visuellement avec la classe css sr-only

**Gestion du focus**
- Lorsque l'alerte est affichée, le focus est positionné sur le conteneur de l’alerte. Pour cela, ajouter un attribut tabindex="-1" à ce conteneur et appeler la fonction js focus() dessus
- Lorsque le bouton de fermeture est activé, le focus doit être géré en fonction du contexte dans lequel cette alerte a été affichée. Le positionnement du focus sera fixé au cas par cas.

**exemple de code attendu**
```
<div class="alert" tabindex="-1">
  < !-- pictogramme alert -->
  <h2>Warning</h2>
  <p>contenu de l’alerte</p>
  <button type="button">
    < !-- pictogramme croix -->
    <span class="sr-only">Fermer Warning</span>
  </button>
</div>
```


### Règles (Do & Don't)
- Privilégier un titre concis
- Éviter les doublons entre le titre et le contenu de l’alerte
- Associer une action maximum à une alerte
- Ne pas changer/enlever l’icone

---

## AutoComplete
**Description**: L'Autocomplete est un champ de saisie qui propose des suggestions dynamiques à mesure que l'utilisateur tape, pour accélérer et fiabiliser la saisie.

### Usage
L'Autocomplete propose des suggestions dynamiques à mesure que l'utilisateur tape. Il combine les avantages d'un champ de saisie libre et d'un sélecteur structuré, pour accélérer la saisie et réduire les erreurs.

## Quand l'utiliser

- **Formulaires de recherche** : aider l'utilisateur à trouver rapidement un élément parmi une liste longue grâce aux suggestions automatiques.
- **Saisie d'adresses** : améliorer l'expérience en proposant des compléments d'adresse basés sur les caractères déjà saisis.
- **Sélection de tags ou mots-clés** : faciliter l'ajout de tags en suggérant des options existantes correspondant à la saisie en cours.
- **Listes de données volumineuses** : remplacer un select classique lorsque la liste contient trop d'entrées pour être parcourue confortablement.

## Quand ne pas l'utiliser

- **Listes courtes et fixes** : pour des listes de moins de 5-7 options, préférer un Select ou des Radio buttons.
- **Saisie libre sans référentiel** : si l'utilisateur peut saisir n'importe quelle valeur sans correspondance dans une liste, utiliser un Input classique.
- **Champs avec format contraint** : pour des dates, numéros de téléphone ou codes postaux, préférer des composants spécialisés (Calendar, Input avec masque).

## Les différents types / Variant

- L'**Autocomplete avec données locales** (data) filtre les suggestions côté client à partir d'un tableau de données déjà chargé. Idéal pour des listes courtes et statiques.
- L'**Autocomplete avec suggestions asynchrones** (getSuggestions) appelle une fonction asynchrone à chaque frappe pour récupérer des suggestions dynamiques depuis une API. Adapté aux grandes bases de données.
- L'**Autocomplete avec debounce** (debounceSuggestionsTimeout) retarde l'appel aux suggestions pour éviter des requêtes trop fréquentes lors de la frappe rapide.

### Règles (Do & Don't)
- Afficher des suggestions pertinentes
  *Description*: Les suggestions doivent correspondre précisément à la saisie et être triées par pertinence pour guider efficacement l'utilisateur.
- Permettre la saisie libre en complément
  *Description*: L'utilisateur doit toujours pouvoir valider sa saisie même si elle ne correspond à aucune suggestion.

---

## Badge
**Description**: Les badges sont des étiquettes permettant de communiquer efficacement une information simple et contextuelle (le plus souvent, un compte numérique) sur le composant auquel le badge est rattaché.


### Usage
Le composant Badge est un petit indicateur visuel utilisé pour attirer l'attention sur des éléments spécifiques de l'interface utilisateur. Les badges sont idéaux pour afficher des états, des notifications ou des quantités

- **Indicateurs de statut :** Pour montrer l'état actuel d'un élément (ex : en cours, complet, nouveau).
- **Notifications :** Pour indiquer de nouvelles activités ou des mises à jour.
- **Quantités :** Pour afficher le nombre d'éléments associés à une catégorie ou une action (ex : articles dans le panier, messages non lus).

##### **Quand utiliser**

**Pour indiquer un état ou un statut** 
  - **Vert :** Succès, disponible 
  - **Rouge :** Erreur
  - **Jaune :** Attention
  - **Bleu :** Information
 
**Pour indiquer le nombre d’item contenu**
   - **Vente :** les badge peuvent être utilisés pour le stock ou la disponibilité (ex : “En stock”, “Rupture de  stock”), afficher le nombre d’article dans le panier de l’utilisateur 
   - **Assistance :** les badge peuvent être utilisés pour indiquer le statut d’un ticket de support
   - **Application/Espace client :** les badge peuvent être utilisés pour indiquer le nombre de message non lus, ou signaler qu’il 

##### **Quand ne pas utiliser**

- **Informations primaires :** Ne pas utiliser les badges pour des informations essentielles qui doivent être claires
- **Actions cliquables :** Les badges ne doivent pas être utilisés comme éléments interactifs
- **Surutilisation :** Éviter de mettre des badges partout, car cela pourrait réduire leur impact et encombrer l'interface


### Règles (Do & Don't)
- Toujours placer l’icône en haut à droite
- Ne pas écrire tout les chiffres si ça dépasse 99
- Un badge ne peut pas contenir un texte 

---

## Box
**Description**: Une box est un conteneur qui permet de regrouper et structurer du contenu dans une page.

### Usage
Une box est un conteneur qui permet de regrouper et structurer du contenu dans une page.

##### **Quand l'utiliser**

- **Structurer du contenu** : Pour regrouper des éléments afin de les rendre plus lisibles et organisés.
- **Encadrer des sections** : Pour délimiter des sections distinctes sur une page, comme des offres spéciales, des informations produit, ou des articles de blog.

##### **Exemples d'usages**

- **Vente** : "Box" est utilisé pour structurer des sections de produits, des cartes de produit, des recommandations, et des sections promotionnelles. Il aide à organiser visuellement les produits et les informations pour une meilleure expérience utilisateur.
- **Assistance** : est utilisé pour regrouper des FAQ, des guides, des articles de support, et des options de contact. Cela permet de présenter les informations de manière claire et accessible pour que les utilisateurs trouvent facilement ce qu'ils recherchent.
- **Application/Espace client** : est utilisé pour organiser des sections telles que les informations de compte, les historiques de transactions, les paramètres de notification et les messages. Il aide à maintenir une mise en page propre et logique, facilitant la navigation et l'accès aux informations importantes.

##### **Quand ne pas utiliser**

- **Décorations inutiles** : Évitez d'utiliser les Box uniquement à des fins décoratives sans valeur ajoutée en termes de structure ou d'organisation du contenu.
- **Duplication inutile** : Ne pas utiliser les Box pour encapsuler des éléments déjà bien structurés et lisibles sans conteneur supplémentaire.

### Accessibilité
**Comment l'utiliser**
- Le titre de la box introduit du contenu
- Ce titre a comme markup un "h1", "h2", "h3", h4", "h5", ou "h6" en fonction de la place du composant dans la page (voir le composant title)

### Règles (Do & Don't)
- La couleur de la bordure en flat, ne peut pas être changé.
- Les box doivent toujours respecter les grilles
- Utilisez la bonne couleur en fonction du contenu pour appuyer votre message
- Le box header doit être utilisé pour mettre en avant une box parmi une liste de box.
- La couleur de la bordure en flat ne peut pas être changée
  *Description*: Le variant flat de la Box possède une couleur de bordure fixe définie par le Design System. Elle ne doit pas être modifiée.
- Les Box doivent toujours respecter les grilles
  *Description*: Une Box doit s'inscrire dans le système de grilles défini par le Design System. Ne jamais utiliser une Box en dehors de la grille ou avec une largeur arbitraire.
- Utilisez la bonne couleur en fonction du contenu pour appuyer votre message
  *Description*: Le choix de la couleur d'une Box doit être cohérent avec le contenu qu'elle encadre. Utilisez la couleur d'erreur pour signaler un problème (ex : facture non payée) et non pour du contenu promotionnel.

---

## Breadcrumb
**Description**: Le breadcrumb ou fil d’ariane est un élément de navigation utilisé pour indiquer l'emplacement actuel de l'utilisateur et l'aider à naviguer.


### Usage
Le breadcrumb ou fil d’ariane est un élément de navigation utilisé pour indiquer l'emplacement actuel de l'utilisateur et l'aider à naviguer.

- **Navigation de sites complexes :** Lorsque le site a une structure hiérarchique profonde, les breadcrumbs permettent aux utilisateurs de naviguer facilement entre les niveaux.

- **Pages de produits et catégories :** Pour montrer aux utilisateurs où ils se trouvent dans la hiérarchie des produits.

- **Guides et documents d'assistance :** Pour aider les utilisateurs à revenir à des sections plus générales lorsqu'ils explorent des guides détaillés.

##### **Quand utiliser**

- **Vente :** Aide les utilisateurs à naviguer facilement entre les catégories de produits.
- **Assistance :** Permet aux utilisateurs de suivre et de revenir à des sections spécifiques.
- **Application/Espace client :** Guide les utilisateurs à travers les différentes sections de leur compte

##### **Quand ne pas utiliser**

- **Sites avec une structure plate :** Si le site a une structure peu profonde (1 ou 2 niveaux)
- **Pages autonomes** : Pour les pages qui ne s'intègrent pas dans une hiérarchie plus large, les breadcrumbs peuvent causer de la confusion.


### Règles (Do & Don't)
- Ne doit pas être utilisé pour affiché des étapes
- Le breadcrumb ne doit pas dépasser 327px de large
- Ne  pas changer le séparateur 

---

## Button
**Description**: Le bouton est un composant cliquable qui permet à l’utilisateur de déclencher une action spécifique au sein de l’interface.

### Usage
Le bouton est un élément clé pour initier ou valider une action dans un parcours. Qu’il s’agisse de vente, d’assistance ou d’espace client, il doit clairement guider les actions de l’utilisateur dans son parcours ou au sein d’une page.

##### **Quand l'utiliser**

- **Etapes et parcours**  : passer à l'étape suivante, démarrer ou continuer un parcours.
 
- **Confirmation et soumission** : valider, confirmer ou soumettre un choix ou plusieurs choix.

- **Déclenchement d'une action** : ouvrir une modale ou un dropdown.

##### **Quand ne pas l'utiliser**

-  **Navigation** : pour des actions de navigation qui font sortir du parcours ou redirigent vers une information complémentaire, on utilise le [link](https://design.bouyguestelecom.fr/components/Link).


##### Types et usages des boutons 

Le rôle du bouton est de guider les utilisateurs dans les étapes clés d'un parcours. Pour cela, il doit répondre à des usages en suivant une hiérarchie d’importance bien définie.

- Le **bouton de conversion** met en avant une action de conversion sur une page avec un objectif business bien défini (ex. : “Choisir ce forfait”, “Choisir cette box”, “Ajouter cette option”). Il est possible de mettre plusieurs boutons de conversion sur une même page, mais ils doivent toujours correspondre à une même action et donc avoir la même formulation (ex. : “Choisir ce forfait” dans le mur des forfaits). Il peut être associé à un bouton secondaire ou à un bouton ghost, jamais à **un bouton primaire**.


-  Le **bouton primaire** met en avant l’action principale de la page qui ne correspond pas à un objectif business et n’a donc pas pour but de faire convertir l’utilisateur.  Il peut être associé à un bouton secondaire ou à un bouton ghost, jamais à un **bouton de conversion**.


- Le **bouton secondaire** met en avant une ou plusieurs actions complémentaires sur la page. Il peut être associé à un **bouton primaire**, à un **bouton de conversion** ou à un **bouton ghost**.


- Le **bouton ghost** est utilisé pour actions les moins importantes de la page. Il met en avant une action peu fréquente ou une action de découverte, sans forte emphase visuelle. Il peut être associé à un **bouton de conversion**, à un **bouton primaire** ou à un **bouton secondaire**. 


### Accessibilité
## Comment l'utiliser

**Si l'activation du bouton déclenche le chargement d'une nouvelle page :**
- le bouton a comme markup un "a", avec un attribut href
- l'intitulé visible permet d'en comprendre la destination
- si ce n'est pas le cas :
	- Si le lien est dans un "p", dans un "td", dans un "li" et que le contenu rend explicite l'intitulé visible ou si le titre qui précède le lien aide à comprendre la destination alors il n'y a rien de plus à faire d'un point de vue conformité
	- si son contexte ne permet pas de comprendre la destination, il faudra : 
		- soit modifier l'intitulé visible et le rendre plus explicite
		- soit le  compléter en utilisant l'accessibilityLabel dont la valeur reprend l'intitulé visible et le complète 

**Si l'activation du bouton déclenche une action sur la page, permet de soumettre un formulaire :**
- le bouton a comme markup un "button"
- l'intitulé visible permet d'en comprendre l'action qui résulte de son activation
- si ce n'est pas le cas, il est nécessaire de le compléter en utilisant l'accessibilityLabel dont la valeur reprend l'intitulé visible et le complète (ex : plusieurs bouton "supprimer" dans le panier, nécessité de le compléter avec le nom du produit à supprimer)
- un bouton d'action n'a pas de contexte

**Navigation au clavier :**
- la prise du focus clavier est visible sur le bouton
- un 'button' est activable avec la touche "Entrée" et la barre d'espace
- un "a" est activable avec la touche "Entrée"
- après activation d'un bouton, il peut être nécessaire de déplacer le focus, cela va dépendre du contexte


### Règles (Do & Don't)
- Association des types de boutons
  *Description*: Un bouton de conversion et un bouton primaire ne doivent jamais être associés.
- Placement horizontal des boutons
  *Description*: Toujours placer l’action la plus importante à droite lorsque 2 boutons sont alignés horizontalement.
- Placement vertical des boutons
  *Description*: Toujours placer l’action la plus importante en haut lorsque 2 boutons sont alignés verticalement.

---

## Calendar
**Description**: Le composant Calendar permet de sélectionner et visualiser des dates ou des plages de dates dans une interface claire et intuitive.  
Il s’adapte aux différents formats et langues, tout en respectant les règles d’accessibilité.

### Usage
Le composant Calendar permet à l’utilisateur de sélectionner une ou plusieurs dates. Il peut être utilisé pour planifier un rendez-vous, choisir une date de livraison ou consulter des événements passés.

#### Quand l’utiliser 
- **Planification & réservation** : planifier ou réserver une intervention ou un rendez vous 
- **Filtrage de données** : Filtrer en sélectionnant une date, des factures, des historiques ect...
- **Choisir une date précise** :  Renseigner une date précise comme une date d’anniversaire dans un formulaire
- **Choisir une plage de date** :  Sélectionner une date de début et de fin afin définir une période


#### Quand ne pas utiliser :

- **Dates  simples** : pour des sélections de date comme “aujourd’hui” ou “demain” privilégier l’utilisation d’un radio button 

#### Les types de calendar :

- Le calendar **Single Date**  permet à l’utilisateur de prendre un rendez ou pour filtrer un contenu ou lors d’un formulaire à une date précise et unique comme le choix de la date de naissance dans un formulaire
- Le calendar **Date range**  permet à l’utilisateur de définir une période, une durée ou un intervalle pour réserver un rendez vous ou filtrer un contenu


---

## Card
**Description**: Une card contient du contenu (image et texte) et des actions sur un seul sujet.


### Usage
Une card contient du contenu (image et texte) et des actions sur un seul sujet.

- **Présentation de produits :** Pour afficher des informations sur un produit, y compris des images, des descriptions, et des prix.
- **Offres et promotions :**  Pour mettre en avant des promotions spéciales ou des offres limitées dans le temps.
- **Articles et ressources :** Pour regrouper des articles de blog, des tutoriels, ou des guides.
- **Fonctionnalités et services :** Pour présenter différentes fonctionnalités ou services offerts.


##### **Quand utiliser**

- **Vente :** Utilisées pour afficher des informations sur les produits, telles que des images, des descriptions, des prix et des avis des utilisateurs. Par exemple : une carte produit présentant une image, un titre, un prix, et un bouton "Ajouter au panier".
- **Assistance :** Employées pour organiser les FAQ, les articles de support ou les témoignages des clients. Par exemple : une carte d'article de support contenant un titre, un résumé et un lien vers l'article complet
- **Application/Espace client :** Utilisées pour présenter les informations de compte, les factures, les notifications et les offres personnalisées. Par exemple : une carte de notification avec un message, une date, et un bouton pour en savoir plus.

##### **Quand ne pas utiliser**

- **Texte long :** Éviter d'utiliser des cartes pour de longs paragraphes de texte qui seraient mieux présentés sous forme d'articles ou de pages séparées.
- **Contenu non lié :** Ne pas regrouper des informations non connexes dans une même carte pour éviter la confusion de l'utilisateur.


### Accessibilité
**Comment l'utiliser**
- Le titre de la card a comme markup un  "h2", "h3", "h4", "h5" ou "h6" en fonction de la place du composant dans la page (voir le composant title)
- Ne pas utiliser le markup "p" pour le titre
- Si l'image est décorative, l'alternative textuelle (attribut alt) est vide : alt=""
- Si l'image est porteuse d'information, son alternative textuelle est remplie
- Le titre est le premier élément de la Card dans le code source généré. 
- L'image et l'overline sont après le titre dans l'ordre du code source généré, pouvant restés visualisés en premier

### Règles (Do & Don't)
- Une card ne peut pas contenir un hat 
- Ne pas changer le background des cards
- Respecter la hiérarchie des boutons. 
- Les cards doivent toujours respecter les grilles

---

## Checkbox
**Description**: La checkbox permet aux utilisateurs de sélectionner un ou plusieurs éléments dans un ensemble.


### Usage
Le composant Checkbox permet aux utilisateurs de sélectionner ou désélectionner une ou plusieurs options dans une liste. Les checkbox sont particulièrement utiles pour les formulaires et les configurations où plusieurs options peuvent être sélectionnées simultanément.

##### **Quand l'utiliser**

- **Sélections multiples** : pour sélectionner plusieurs options parmi une liste.
- **Filtre** : pour sélectionner ou déselectionner un ou plusieurs filtres dans une liste. 
- **Consentements & Conditions d’utilisation** : pour obtenir des accords ou des consentements, par exemple pour les conditions d'utilisation ou les abonnements aux newsletters.


##### **Quand ne pas l'utiliser**

- **Sélections uniques** : pour une sélection unique parmi plusieurs options, utiliser des radio buttons.
- **Actions immédiates** : ne pas utiliser pour déclencher des actions immédiates comme l'envoi d'un formulaire ou la navigation. Dans ce cas, utiliser des boutons.


##### **Checkbox ou Switch ?**

- **Les Checkbox** permettent à l’utilisateur de sélectionner plusieurs choix et qui doivent être validé (Ex. : Formulaire) sauf dans le cas de filtrage de recherche qui lui peu s’actualiser directement.

- **Un Switch** permet de réaliser une action immédiate ou de basculer entre deux modes (Ex. : Forfait bloqué, Notification push).


##### **Les différents types de checkbox**

- **Les checkbox** contiennent uniquement un label, ils sont idéaux dans des interfaces ou formulaires compacts pour des choix simples et évidents qui n'ont pas besoin de détails et privilégient la rapidité de sélection (ex. : iPhone, Samsung, Google).

- **Les checkbox** tiles contiennent un label, une description optionnelle et une icône si besoin. Ils peuvent être utilisés pour des choix difficiles et importants qui ont besoin d'informations supplémentaires permettant à l'utilisateur de comparer avant d'effectuer un choix (ex. : types d’offres). Ils peuvent être positionnés verticalement ou horizontalement selon l’espace disponible.

### Accessibilité
## **Comment l'utiliser**

**Son étiquette :**
- Une checkbox doit toujours avoir une étiquette visible (un label)
- La description peut-être générée dans l'élément "label" si elle est simple

**Son état :**
- Une checkbox peut être en disabled
- Une checkbox ne peut pas être en readonly 
- si une case à cocher est indiquée comme étant obligatoire, l'attribut aria-required="true" doit être ajouté à l''élément "input"
 - si les cases à cocher sont dans un groupe, et que la sélection d'une des cases à cocher est obligatoire, l'attribut aria-required="true" doit être ajouté au groupe

**Regroupement :** 
- Si plusieurs cases à cocher sont utilisées pour répondre à un même sujet, une même thématique, une même question :
	- Si chaque étiquette est suffisamment explicite pour comprendre l'action qui résulte de son activation, il n'est pas nécessaire de prévoir un regroupement
    - Si ce n'est pas le cas, il est nécessaire de regrouper les cases à cocher et de donner un nom visible de préférence à ce groupe
 
 **Son activation :** 
 - l'activation d'une case à cocher ne doit pas déclencher le chargement d'une nouvelle page, ni déclencher le déplacement du focus
 
 **Exemples de code attendu**
 ```
 <p>* Champs obligatoires</p>
<input type="checkbox" id="ww" aria-required="true">
<label for="ww">J’accepte les conditions générales *</label>

<p id="xx">Comment souhaitez-vous être contacté ? *</p>
<div role="group" aria-labelledby="xx" aria-required="true">
	<input type="checkbox" id="yy">
	<label for="yy">Email</label>
    <input type="checkbox" id="zz">
	<label for="zz">Téléphone</label>
    <input type="checkbox" id="uu">
	<label for="uu">Courrier</label>
</div>
```





### Règles (Do & Don't)
- Sélection unique
  *Description*: Lorsque l’utilisateur ne doit effectuer qu’un seul choix dans une liste de choix, on utilise les radio buttons
- Checkbox et Radio button
  *Description*: Ne pas mélanger checkox et radio button dans la même liste.
- Alignement horizontal
  *Description*: Ne pas mettre des checkbox sur plusieurs lignes.
- Activation d'état
  *Description*: Ne pas utiliser les checkbox pour activer ou désactiver un état. Dans ces cas, utilisez un switch.
- Label des checkbox 
  *Description*: Une checkbox tile doit toujours avoir un label. Le radio tiles doit toujours contenir un label en bold. Ce label peut être accompagné d’une description lorsque celui-ci nécessite un ou des éléments complémentaires pour guider au mieux l’utilisateur dans son choix.

---

## Chips
**Description**: Les chips sont des éléments compacts qui représentent une entrée, un attribut ou une action.


### Usage
Les chips sont des éléments d’interface interactifs qui permettent de filtrer une ou plusieurs options dans un groupe logique.

##### **Quand l'utiliser**

- **Filtrage** : pour filtrer des résultats de recherche via différentes catégories (ex. : Apple, Samsung, Xiaomi) ou caractéristiques (Ex. : Couleurs, Tailles).


##### **Quand ne pas l'utiliser**

- **Actions**  : ne pas utiliser pour déclencher des actions  comme des soumissions de formulaires. Dans ces cas on utilise des boutons.
- **Navigation** : ne pas utiliser pour naviguer ou afficher différents contenus au sein de la même page. Dans ces cas, on utilise les Tabs
- **Sélections nécessitant une validatio** :  ne pas utiliser pour des actions de sélection unique ou multiple qui doivent être validées (ex. : Civilité, Condition, Consentement). Dans ces cas, on utilise des radio buttons ou des checkbox, en fonction du besoin.

### Accessibilité
## Comment l'utiliser

**Regroupement**

Si plusieurs chips sont utilisées pour répondre à un même sujet, une même thématique :
- Si chaque étiquette est suffisamment explicite pour comprendre l'action qui résulte de son activation, il n'est pas nécessaire de prévoir un regroupement
- Si ce n'est pas le cas, il est nécessaire de regrouper les chips et de donner un nom visible à ce groupe

**Exemple de code attendu**

```
<p id="xx">Marque</p>
<div role="group" aria-labelledby="xx">
	<button type="button" aria-pressed="false">Apple</button>
	<button type="button" aria-pressed="false">Samsung</button>
	<button type="button" aria-pressed="false">Huawei</button>
</div>
```


### Règles (Do & Don't)
- Icône
  *Description*: Ne pas changer l’icône de l’état “Activated”.
- Action
  *Description*: Une chips ne doit pas réaliser d’action.  
- Groupement des chips
  *Description*: Les chips doivent être groupées en catégories ou caractéristiques logiques.
- 2 Chips minimum 
  *Description*: Ne jamais utiliser une chips seule. Un groupe de chips contient au minimum 2 chips , au maximum 7 chips. 

---

## Columns
**Description**: Le composant Columns permet de diviser l'espace horizontal en plusieurs sections verticales, afin de créer une structure harmonieuse et responsive.

### Usage
Les colonnes font partie des outils essentiels pour composer votre page.

![](https://prod.trilogy-docs-admin.apps.ocp-3.ocp.euw3r53.nbyt.fr/assets/29a0c5ba-c545-4e04-9b84-d72ac6bf542d)

**Taille des colonnes**

Les colonnes se basent sur une grille de 12 unités de large.

![](https://prod.trilogy-docs-admin.apps.ocp-3.ocp.euw3r53.nbyt.fr/assets/df2d3ffb-bb67-437a-9248-19c000b95698)

`is-narrow` permet à une colonne de prendre la taille minimale possible, en fonction de son contenu.

![](https://prod.trilogy-docs-admin.apps.ocp-3.ocp.euw3r53.nbyt.fr/assets/13468c00-7b8c-4890-9d04-999ec90046d2)

**Colonnes sur plusieurs lignes**

Ajoutez `is-multiline` pour que vos colonnes passent automatiquement d'une ligne à l'autre.

![](https://prod.trilogy-docs-admin.apps.ocp-3.ocp.euw3r53.nbyt.fr/assets/51eea98b-6c17-4c8b-9731-04aa86978695)

---

## Container
**Description**: Le conteneur centre votre contenu horizontalement. C'est l'élément de mise en page le plus basique.

### Usage
L'élément Container suit directement une section de base et est chargé de restreindre votre contenu en fonction de la largeur de la page. Il contient les rangées et les colonnes permettant d'organiser votre contenu selon une grille.

**Quand utiliser :**

- **Organiser le contenu :** Contenir les rangées et colonnes selon une grille pour une mise en page structurée.
- **Restreindre la largeur :** Adapter la largeur du contenu en fonction de la page.

**Quand ne pas utiliser :**

- **Plein écran :** Pour une utilisation sur toute la largeur de la section, utilisez la classe `is-fluid`.

---

## Countdown
**Description**: Le compte à rebours est utile pour visualiser la fin d’un évènement.


### Usage
Le composant Countdown, ou compte à rebours, est un élément visuel utilisé pour afficher le temps restant avant un événement particulier. 

- **Promotions et Offres Limitées :** Afficher le temps restant pour profiter d'une promotion ou d'une offre spéciale.
- **Lancements de Produits :** Annoncer le lancement d'un nouveau produit avec un compte à rebours.
- **Maintenance Planifiée :** Informer les utilisateurs du temps restant avant une maintenance planifiée.

##### **Quand utiliser**

- **Vente :** 
	- Afficher le temps restant pour une vente flash, incitant les utilisateurs à agir rapidement.
	- Compter jusqu'à la mise en vente d'un nouveau produit ou d'une collection.
	- Temps restant pour bénéficier d'une remise spéciale.

- Assistance : 
	- Informer les utilisateurs du temps estimé restant avant la résolution d'un ticket.
	- Indiquer les heures de disponibilité du support en temps réel (par exemple, avant la fermeture du 		  service).
    
- **Application/Espace client :** 
	- Compter le temps restant avant l'échéance d'un paiement de facture.
	- Afficher des offres temporaires spéciales pour les utilisateurs connectés.
	- Indiquer le temps restant avant une maintenance qui pourrait affecter l'accès aux services.    

##### **Quand ne pas utiliser**

- **Information Statique :** Ne pas utiliser un compte à rebours pour des informations qui ne sont pas sensibles au temps.
- **Chargement de Pages :** Ne pas utiliser pour indiquer le temps de chargement des pages ou des contenus.
- **Messages Non Urgents :** Éviter d'utiliser pour des informations qui n'ont pas de contrainte temporelle.


### Règles (Do & Don't)
- Adapter le format au contexte

---

## Datepicker
**Description**: Champ de saisie de date avec calendrier intégré, permettant à l'utilisateur de saisir ou sélectionner une date au format JJ/MM/AAAA.

### Usage
Le Datepicker est un champ de saisie de date qui ouvre un calendrier déroulant pour faciliter la sélection d'une date précise. L'utilisateur peut saisir la date directement au clavier ou la choisir visuellement dans le calendrier.

##### **Quand l'utiliser**

- **Formulaire de date précise** : pour recueillir une date de naissance, d'activation ou d'échéance dans un formulaire.
- **Planification & réservation** : pour permettre à l'utilisateur de choisir une date de rendez-vous ou de livraison.
- **Saisie flexible** : quand l'utilisateur doit pouvoir saisir la date au clavier ou la sélectionner dans le calendrier.

##### **Quand ne pas utiliser**

- **Dates relatives** : pour des choix comme "aujourd'hui" ou "demain", préférer des boutons radio.
- **Plage de dates** : pour sélectionner une période (date de début + date de fin), utiliser le composant Calendar en mode "Date range".
- **Navigation calendaire** : pour afficher des événements ou un planning, utiliser directement le composant Calendar.

### Règles (Do & Don't)
- Afficher le format de date attendu
  *Description*: Indiquer systématiquement le format attendu (JJ/MM/AAAA) sous le label pour guider la saisie clavier.

---

## Divider
**Description**: Les séparateurs sont utilisés pour différencier des zones d'information au sein d'un espace de contenu neutre comme les cartes, les box ou les sections.


### Usage

**Quand utiliser**

- Pour séparer deux items dans une liste, un menu ou un tableau 
- Pour séparer deux section ou deux paragraphe
- Pour accentuer le choix entre deux offres 

**Quand ne pas utiliser**

- Pour séparer deux inputs dans un formulaire


### Règles (Do & Don't)
- Utiliser des dividers que lorsque cela est nécessaire
- Garder une cohésion graphique au sein de la page

---

## Fab
**Description**: Le FAB (Floating Action Button) représente l'action la plus importante sur un écran. Il met les actions clés à portée de main.


### Usage
Le FAB (Floating Action Button) représente l'action la plus importante sur un écran.Il est généralement positionné en bas à droite de l'écran et offre un moyen rapide et visible pour accéder à une fonctionnalité clé. Le FAB est particulièrement utile pour les actions qui doivent être mises en avant et facilement accessibles sur les appareils mobiles.

- **Action principale :** Pour l'action la plus importante sur une page, comme ajouter un nouvel élément, lancer une recherche ou ouvrir un formulaire.
- **Accessibilité rapide :** Pour permettre un accès rapide à des fonctionnalités fréquemment utilisées.
- **Accentuation visuelle :** Pour mettre en avant une action spécifique et la rendre facilement repérable.

##### **Quand utiliser**

- **Vente :** Utilisé pour des actions telles que "Ajouter au panier", "Scanner un code-barres" ou "Accéder aux offres spéciales". 
- **Assistance :** Employé pour des actions comme "Démarrer une conversation", "Soumettre une demande d'assistance" ou "Appeler le support technique".
- **Application/Espace client :** Utilisé pour des actions rapides telles que "Ajouter un nouveau paiement", "Mettre à jour les informations personnelles" ou "Contacter le service client".

##### **Quand ne pas utiliser**

- **Multiples actions principales :** Évitez d'utiliser plusieurs FAB pour différentes actions principales sur la même page.
- **Actions secondaires :** Ne pas utiliser le FAB pour des actions secondaires ou moins fréquentes.
- **Interfaces chargées :** Si l'interface contient déjà de nombreux éléments interactifs, ajouter un FAB peut rendre l'interface surchargée et confuse.



### Règles (Do & Don't)
- Utiliser des icônes claires et compréhensibles
- Le FAB doit être positionné en bas à droite sur l’écran

---

## FlexBox
**Description**: Le composant FlexBox est un élément de structure conçu pour faciliter l'alignement et la disposition des éléments enfants de manière répétitive. Il offre une structure efficace pour gérer l'orientation et l'espacement entre les éléments.

### Usage
**Utilisation :**
- Disposition des Éléments : Facilite l'organisation des éléments de l'interface utilisateur en alignant les composants soit horizontalement soit verticalement.
- Gestion de l'Espace : Permet un espacement uniforme et une gestion cohérente des gaps entre les éléments, améliorant l'accessibilité et la lisibilité.
- Layout Répétitif : Idéal pour créer des mises en page répétitives comme des listes, des groupes de boutons, ou des sections de contenu.

**Exemples d'Usage :**
- Barres de Navigation : Créer des barres de navigation horizontales avec un espacement égal entre chaque lien.
- Listes de Produits : Afficher les produits dans une disposition verticale, en garantissant un espacement chez chaque élément pour une meilleure lecture.
- Groupes de Boutons : Aligner des boutons horizontalement dans un formulaire pour un accès facile.

**Comportement :**
- Orientation Flexible : Choix entre une orientation horizontale ou verticale selon les exigences du design.
- Espacement Automatisé : Ajustement automatique du gap entre les éléments pour s'adapter à divers tailles d'écran.
- Adaptabilité : S'ajuste aux changements dans la taille et le contenu des éléments enfants, maintenant la cohérence visuelle.
- Personnalisation : Possibilité de définir et de modifier les propriétés du Stack pour répondre aux besoins spécifiques d'un projet.



---

## Hero
**Description**: Bannière de haut de page destiné à attirer l'attention.


### Usage
L'élément Hero est la grande bannière que vous rencontrez sur les plateformes numériques et qui informe clairement l'utilisateur sur les produits/services dans lesquels l'entreprise est spécialisée. Il attire l'attention de manière évidente des visiteurs qui parcourent la page. L'élément Hero est visuellement esthétique et informatif par nature et est un grand affichage de ce que l'entreprise représente.

**Quand utiliser :**

- **Attirer l'attention de l'utilisateur :** Première chose que l'utilisateur voit, idéal pour expliquer le sujet de la page et afficher une incitation à l'action.
- **Mettre en évidence les détails :** Détails du plan d'assurance et actions principales.

**Quand ne pas utiliser :**

- **Afficher de longs morceaux de texte :** Utilisez d'autres éléments pour du texte détaillé ou explicatif.

---

## Icon
**Description**: Chaque icône est conçue pour communiquer une intention et faciliter la navigation.  
Pour voir la liste complète, c'est par [ici](/foundations/icons).

### Usage
- L'icône ne doit pas être entourée de vide. Si elle est carrée, elle prend donc tout l'espace de travail. Si elle est rectangulaire, elle ne peut donc avoir du vide que sur un des axes (x ou y).
- L'icône doit alors être alignée sur l'axe qui n'est pas occupé intégralement : un centrage vertical ou horizontal est donc requis.
- Les angles, les arêtes, les arrondis doivent être impeccables et ne doivent pas subir d'abruptes changements de direction.
- Le SVG ne doit contenir aucune couleur, elles seront ajoutées si nécessaire en CSS

**Quand utiliser**

- Pour attirer l'attention de l'utilisateur.
- Généralement la première chose que l'utilisateur voit, ce qui en fait un endroit idéal pour expliquer le sujet de la page et afficher une incitation à l'action.
- Pour mettre en évidence les détails du plan d'assurance et les actions principales.

**Quand ne pas utiliser**

Lorsque vous devez afficher de longs morceaux de texte.

### Accessibilité
**Comment l'utiliser :**
- si l'icon est décoratif et n'apporte pas d'information, le code est prévu pour ne pas être restitué par les TA (Technologies d'assistance)
- si l'icon est porteur de sens, il faut rajouter un texte caché avec la classe CSS sr-only qui fournit l'information
- si l'icon est un élément interactif :
	- il faut rajouter un texte caché dans un "span" avec la classe CSS sr-only qui fournit l'action effectuée lorsque l'élément est activé
    - ce "span" est dans un "button" si l'action s'applique dans la page ou dans un "a" si l'action recharge une page 
- ne pas utiliser l'attribut aria-label sur les éléments "button" ou "a"

**Exemple de code :**
icon permettant de visualiser ou masquer le mot de passe :

```
<button type="button"> 
   < !-- icon œil non barré --> 
   <span class="sr-only">Afficher le mot de passe</span> 
</button> 

<button type="button"> 
   < !-- icon œil barré --> 
   <span class="sr-only">Masquer le mot de passe</span> 
</button>
```


---

## Input
**Description**: Le composant Input permet de récolter des informations saisies librement par l'utilisateur.


### Usage
Un input  est un champ dans lequel les utilisateurs peuvent saisir du texte ou sélectionner une option ou un élément.

##### **Quand utiliser**

- **Input Selector :**  Champ de saisie permettant aux utilisateurs de choisir une option parmi une liste prédéfinie.
	- **Vente :** Sélectionner une catégorie de produit, une taille ou une couleur.
	- **Assistance :** Choisir une catégorie de problème ou un type de demande.
	- **Application/Espace client :** Sélectionner un type de service ou une période spécifique.
    
- **Input Text :** Champ de saisie permettant aux utilisateurs de saisir du texte libre.
	- **Vente :** Ajouter des commentaires, envoyer des messages aux vendeurs.
	- **Assistance :** Décrire un problème, laisser des commentaires sur un article d'aide.
	- **Application/Espace client :** Modifier des informations personnelles, envoyer des messages au 	service client.
    
- **Input Password :** Champ de saisie destiné à la saisie sécurisée de mots de passe.
	- **Vente :** Connexion ou création de compte.
	- **Assistance :** Connexion sécurisée à une section d'assistance personnalisée.
	- **Application/Espace client :** Connexion ou modification du mot de passe.

##### **Quand ne pas utiliser**

- **Actions non textuelles :** Pour des actions qui ne nécessitent pas de saisie textuelle, utilisez plutôt des boutons, des cases à cocher ou des sélecteurs.
- **Données statiques :** Pour afficher des données statiques ou non modifiables, utilisez des composants de texte ou des labels.
- **Choix limités :** Pour des choix limités et prédéfinis, utilisez des composants de sélection comme des dropdowns ou des radio buttons.

##### **Cas d'erreur**

- **L’erreur de saisie** : Au clic sur le CTA, la page s’ancre directement sur l’input complété avec une erreur de saisie. ![](https://prod.trilogy-docs-admin.apps.ocp-3.ocp.euw3r53.nbyt.fr/assets/3ca50171-114d-4a1a-9a2e-538a3082ba5d)

- **La non complétion d’un input obligatoire** : Au clic sur le CTA, la page s’ancre directement sur l’input avec un champ obligatoire non complété. ![](https://prod.trilogy-docs-admin.apps.ocp-3.ocp.euw3r53.nbyt.fr/assets/99c7979a-4abe-4cda-ac16-906932affe34)

- **La non complétion de plusieurs inputs obligatoires** : Au clic sur le CTA, la page s’ancre directement sur le champ obligatoire non complété le plus haut de la page. ![](https://prod.trilogy-docs-admin.apps.ocp-3.ocp.euw3r53.nbyt.fr/assets/2b642b7d-232c-474e-beab-8c764f673015)



### Accessibilité
## Comment l'utiliser

### L'étiquette 
- Elle est obligatoire, elle est toujours visible, placée visuellement juste au dessus du champ
- Elle est reliée au champ dans le code (for/id)
- Elle est complétée par un astérisque si le champ doit obligatoirement être rempli

### Le placeholder
- Il n'est pas obligatoire
- Il ne remplace pas l'étiquette

### Helper text : format/exemple/aide à la saisie
- Le helper text est visuellement entre l'étiquette et le champ
- Un format ou un exemple est obligatoire lorsque la donnée à saisir doit respecter un certain format (ex : date, email...). Il n'est pas obligatoire sinon
- L'erreur de saisie provoque un message d'erreur indiquant que la donnée n'est pas valide et dans le cas d'un format, contient un exemple de saisie correcte. Il apparait une fois le bouton de soumission activé
- En dehors du format ou d'un exemple, le helper text peut contenir un texte indiquant où trouver la donnée à saisir par exemple
- Le helper text n'est pas obligatoire

### L'attribut autocomplete
- Il doit être présent pour les données relatives à la personne qui rempli le formulaire (nom, prénom...)
- Il n'est pas obligatoire sinon
- Sa valeur est choisie dans la liste présente dans l'onglet code

### Champ obligatoire
- Si le champ doit obligatoirement être rempli, la propriété "required" doit être utilisée
- S'il n'est pas rempli, un message d'erreur apparait une fois le bouton de soumission activé

### Message d'erreur
- Le message d'erreur doit apparaitre en dessous du champ en erreur
- Lorsqu'il apparait, il est relié au champ (via aria-describedby sur input)

### Disabled ou readonly
- Un champ sera en disabled si il ne peut pas être rempli, il ne contient pas de valeur
- Un champ sera en readonly si il est pré-rempli. Il ne peut pas être modifié mais sa valeur doit pouvoir être lue (contraste suffisant) et être parcouru (avec les flèches de direction si la valeur dépasse la zone visible)




### Règles (Do & Don't)
- Ne pas changer l’icone sur l’input search 

---

## Link
**Description**: Le lien est un composant cliquable qui permet à l’utilisateur de naviguer vers une nouvelle page ou une autre section de l'interface.

### Usage
Le Lien guide l'utilisateur vers une information ou une ressource complémentaire, en préservant son contexte et en facilitant son retour à sa tâche principale.

##### **Quand l'utiliser**

- **Navigation entre les pages** : accéder à une autre page, naviguer dans un menu ou rejoindre une section différente du site.

- **Accès à des ressources ou documents** : télécharger un document, consulter un guide, accéder à un contenu informatif externe à la page actuelle.

- **Services externes**  : accéder à un site partenaire, être redirigé vers une plateforme tierce.

##### **Quand ne pas l'utiliser**

- **Boutons** :  on n’utilise pas le lien pour initier ou valider une actions dans un parcours. Dans ce cas, on utilise le [button](https://design.bouyguestelecom.fr/components/Button).


#### **Les différents liens**

- **Le Standalone Link** (lien hors du texte) est isolé du contenu textuel pour être mieux mis en avant. Il peut comporter une icône à droite pour renforcer sa signification.
On le privilégie pour : 
    - Naviguer vers une page
    - Afficher une information ou une ressource importante dans le parcours utilisateur
    - Répondre à un besoin de visibilité prioritaire


- **L’Inline Link** (lien dans le texte) est intégré directement dans un bloc de texte avec la balise html <a>. Il permet de rediriger sans interrompre la lecture.
On le privilégie pour : 
    - Compléter une information dans un contexte spécifique
    - Afficher une information ou une ressource secondaire dans le parcours utilisateur
    - Préciser une référence ou apporter une aide contextuelle

### Accessibilité
## Comment l'utiliser
- un lien est utilisé lorsque son activation déclenche le chargement d'une nouvelle page 
- un lien interne à la page (href="#ancre") déplace le focus vers la cible du lien à l'intérieur de la page
- L'intitulé du lien est pertinent, il permet d'en comprendre la destination
- si ce n'est pas le cas :
	- Si le lien est dans un "p", dans un "td", dans un "li" et que le contenu rend explicite l'intitulé visible ou si le titre qui précède le lien aide à comprendre la destination alors il n'y a rien de plus à faire d'un point de vue conformité
	- si son contexte ne permet pas de comprendre la destination, il faudra : 
		- soit modifier l'intitulé visible et le rendre plus explicite
		- soit le  compléter en utilisant l'accessibilityLabel dont la valeur reprend l'intitulé visible et le complète 
- un lien a comme markup "a"
- un lien a obligatoirement un attribut href. qui lui permet de recevoir le focus clavier
- si un lien n'a pas de href, il faut ajouter à l'élément "a" un attribut tabindex="0" pour qu'il reçoive le focus clavier et un attribut role="link" pour qu'il puisse être restitué comme étant un lien par les lecteurs d'écran
- un lien est activable au clavier avec la touche "Entrée"
- la prise du focus clavier est visible sur le lien


## Quand ne pas utiliser
- si l'activation de ce lien déclenche une action à l'intérieur de la page alors il faut utiliser le composant "Button" avec comme markup un "button"

## Comment tester
- pour tester si un lien interne à la page est fonctionnel :
	- utiliser la touche "Tab" jusqu'à arriver sur le lien
    - utiliser la touche "Entrée"
    - le focus doit être déplacé sur la cible du lien. Pour s'en assurer, utiliser par exemple "document.activeElement" dans la console du navigateur
    - l'utilisation à nouveau de la touche TAB permet d'atteindre l'élément interactif qui suit la cible atteinte, dans l'ordre du code source

### Règles (Do & Don't)
- Lien ou bouton 
  *Description*: Un lien navigue vers une destination, un bouton exécute une action.
- Lien avec icône
  *Description*: Utiliser une icône qui a une signification directe avec le contenu du lien.
- Lien externe
  *Description*: Utiliser l’icône  “tri-new-tabbed-page” lorsque le lien ouvre un autre onglet ou redirige vers un site externe.

---

## List
**Description**: Les listes sont des outils de mise en page, allant des listes simples aux listes de descriptions incluant des icones en entête.


### Usage
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

**Quand utiliser**

**Quand ne pas utiliser**


---

## Modal
**Description**: Une modale met en avant un contenu nécessitant une interaction de l'utilisateur avant qu'il ne puisse continuer son parcours. Elle apparait au clic sur un élément déclencheur (généralement un lien ou un bouton)


### Usage
Le composant "Modal"  s'affiche au-dessus du contenu principal de la page, qui nécessite une interaction de l'utilisateur avant de pouvoir retourner à l'interface principale. Les modals sont utilisés pour attirer l'attention sur des informations importantes ou des actions critiques.

##### **Quand utiliser**

- **Confirmation d'actions :** Pour demander à l'utilisateur de confirmer une action importante, comme la suppression d'un compte ou la confirmation d'un achat.

- **Formulaires courts :** Pour afficher des formulaires courts, tels que des inscriptions à la newsletter ou des formulaires de contact.

- **Informations critiques :** Pour présenter des informations critiques ou des erreurs qui nécessitent l'attention immédiate de l'utilisateur.

- **Options détaillées :** Pour montrer des options ou des détails supplémentaires sans naviguer loin de la page actuelle.

- **Vente :**
	- **Confirmation d'achat :** Utiliser une modal pour confirmer les achats avant de finaliser la transaction.
	- **Détails de produit :** Afficher des informations détaillées sur un produit sans quitter la page de liste de produits.
	- **Offres spéciales :** Présenter des offres spéciales ou des promotions de manière non intrusive.
    
- **Assistance :**
	- **Formulaire de contact :** Utiliser une modal pour permettre aux utilisateurs de soumettre des demandes d'assistance ou des tickets de support.
	- **Tutoriels rapides :** Afficher des tutoriels ou des aides contextuelles pour guider l'utilisateur à travers des fonctionnalités complexes.
	- **Alertes critiques :** Notifier l'utilisateur de pannes de service ou d'autres problèmes critiques.
    
- **Application/Espace client :** 
	- **Mise à jour des informations :** Permettre aux utilisateurs de mettre à jour leurs informations personnelles ou de compte.
	- **Notifications de sécurité :** Informer les utilisateurs de connexions suspectes ou d'autres problèmes de sécurité nécessitant une attention immédiate.
	- **Gestion des abonnements :** Faciliter la gestion des abonnements et des services directement dans l'application.

##### **Quand ne pas utiliser**

- **Interruptions non nécessaires :** Évitez d'utiliser des modals pour des informations non essentielles qui peuvent être intégrées de manière moins intrusive.

- **Navigation principale :** Ne pas utiliser les modals pour la navigation principale ou pour des interactions fréquentes, car cela peut perturber l'expérience utilisateur.

- **Contenus longs :** Évitez d'utiliser des modals pour des contenus très longs qui nécessitent un défilement excessif.

- **Navigation compliquée :** Ne forcez pas les utilisateurs à naviguer à travers plusieurs étapes dans un modal. Gardez les interactions simples et directes.



### Accessibilité
## Comment l'utiliser
- le bouton qui déclenche l'ouverture de la modale a un intitulé explicite, soit visible, soit caché avec la classe CSS sr-only

## Comment tester
- Utiliser la touche TAB pour arriver sur le bouton qui déclenche l'ouverture de la modale
- le focus est positionné sur le bouton croix de fermeture
- l'utilisation de la touche TAB positionne le focus sur le prochain élément interactif à l'intérieur de la modale dans l'ordre du code source
- l'utilisation répétée de la touche TAB ne quitte jamais la modale. Le focus boucle à l'intérieur
- lorsque le dernier élément reçoit le focus, l'utilisation de la touche TAB positionne le focus sur le bouton croix de fermeture
- et inversement en utilisant la touche Shift TAB
- lorsque le bouton de fermeture est activé, le focus est positionné sur le bouton qui a déclenché l'ouverture de la modale


### Règles (Do & Don't)
- Doit être facile à fermer, toujours laisser un bouton et une croix pour fermer la modal
- Ne pas superposer ou empiler les modals

---

## Otp
**Description**: OTP (One Time Password) est un code numérique à usage unique pour s’identifier ou confirmer une action.

### Usage
Il est généralement utilisé comme un second niveau de sécurité (authentification à double facteur).Seuls des caractères numériques sont valides pour simplifier la saisie. A ce titre, un clavier numérique à l’entrée dans la première case est nécessaire.

##### **Quand utiliser**

- **Pour s’identifier :** Mot de passe oublié, création de compte, connection
  Un code OTP peut être envoyé à l’utilisateur par téléphone / mail pour lui permettre de confirmer son     identité. Ce composant est de plus en plus utilisé comme alternative à la saisie d’un mot de passe           pour plusieurs raisons (pas de risque d’oubli et donc de blocage / réinitialisation, authentification plus   forte et donc moins d’usurpation, sentiment de sécurité...)

- **Pour confirmer une action :** Suppression, ajout, modification
  Si une action le justifie, notamment par son importance, un code OTP peut être envoyé à l’utilisateur       par téléphone / mail pour lui permettre de confirmer son action.

##### **Quand ne pas utiliser**

- Ce composant ne doit pas être utilisé en dehors des usages spécifiés ci-dessus et donc pour saisir un mot de passe, un code postal ou toute autre information.

### Règles (Do & Don't)
- Un composant doit être accompagné d’un feedback lors de l’envoie du code otp sur le support choisis
- Un code otp peut seulement contenir des chiffres
- Ne doit pas contenir plus de 6 chiffres

---

## Pagination
**Description**: Le composant pagination permet à l'utilisateur de naviguer efficacement losque les résultats visualisés sont nombreux et séparés en plusieurs pages.


### Usage
Le composant "Pagination" permet de diviser le contenu en pages distinctes, facilitant la navigation et l'accès aux informations en grande quantité. Il est souvent utilisé dans les listes de produits, les articles de blog, les résultats de recherche et autres collections de données.

- **Longues listes de produits :** Pour diviser une grande collection de produits en pages plus petites et plus gérables.
- **Résultats de recherche :** Pour afficher les résultats de recherche par lots plutôt qu'une longue liste ininterrompue.
- **Articles de blog ou contenu informatif :** Pour organiser une série d'articles ou de sections de contenu.

##### **Quand utiliser**

- **Vente :** Peut être utiliser pour diviser les produits en pages gérables, permettant aux utilisateurs de naviguer facilement entre différentes sections du catalogue ou présenter les avis clients par pages, facilitant la lecture et la navigation.
- **Assistance :** Organiser les articles de la  FAQ , permettant aux utilisateurs de trouver rapidement les informations dont ils ont besoin, afficher les tickets de support par page pour une gestion plus efficace des demandes d'assistance.
- **Application/Espace client :** Diviser l'historique des transactions, rendant la navigation plus fluide, présenter les documents et les factures de manière plus organisée.

##### **Quand ne pas utiliser**

- **Contenu critique :** Pour des informations cruciales qui doivent être accessibles immédiatement sans navigation supplémentaire.
- **Quantités limitées de contenu :** Pour des collections de données très petites qui tiennent sur une seule page sans défiler excessivement.
- **Données dynamiques :** Si le contenu change fréquemment ou en temps réel, la pagination peut devenir déroutante.


### Règles (Do & Don't)
- Ne pas retirer le bouton suivant ou précédent 
- La numérotation des pages doit être claire
- La page active doit être indiquer

---

## Popover
**Description**: Le popover est un complément d’information qui s’affiche au survol d’un élément.


### Usage
Le Tooltip est une petite fenêtre d'information contextuelle qui apparaît lorsque l'utilisateur survole un élément de l'interface. Il est généralement utilisé pour expliquer ou décrire des fonctionnalités, des icônes ou des termes spécifiques sans distraire l'utilisateur de sa tâche principale.

- **Éléments d'interface :** Pour expliquer des icônes ou des boutons dont la signification n'est pas immédiatement claire.

- **Instructions et astuces :** Pour fournir des conseils d'utilisation ou des instructions supplémentaires sans surcharger l'interface principale.

- **Informations supplémentaires :** Pour offrir des détails supplémentaires sur un produit ou une fonctionnalité sans rediriger l'utilisateur vers une nouvelle page.

##### **Quand utiliser :**
- **Vente :** 
	-	Utiliser des tooltips pour fournir des informations supplémentaires.
	- Explication des icônes qui montrent les caractéristiques des produits, comme "livraison gratuite" ou "retours gratuits".
	- Offrir des conseils pour améliorer l'expérience d'achat, comme des astuces pour utiliser les filtres ou les catégories.

- **Assistance :** 
	- Fournir des explications supplémentaires pour les options ou les paramètres dans les formulaires ou les tableaux de bord.
	- Expliquer les icônes utilisées pour les différentes catégories de support (chat en direct, email, téléphone).
	- Définir les termes ou les acronymes techniques pour aider les utilisateurs à comprendre le contenu.

- **Application/Espace client :** 
	- Offrir des explications sur les différentes options de gestion de compte, comme la mise à jour des informations personnelles ou des préférences de notification.
	- Donner des détails supplémentaires sur les alertes ou les notifications, par exemple, pourquoi une alerte est déclenchée.
	- Utiliser des tooltips pour fournir des aides contextuelles dans les tableaux de bord ou les rapports.

##### **Quand ne pas utiliser :**

- **Informations critiques :** Ne pas utiliser les tooltips pour des informations essentielles qui doivent toujours être visibles.

- **Contenu long :** Éviter de mettre trop d'informations dans un tooltip. Si le contenu est trop long, il est préférable d'utiliser un modal ou une page dédiée.

- **Interactions principales :** Ne pas mettre des actions principales (comme des boutons de soumission) à l'intérieur des tooltips

### Règles (Do & Don't)
- Ne pas mettre trop de texte
- Ne doit pas contenir de lien ou d’action
- Positionner la tooltip en évitant de cacher d’autres informations

---

## Price
**Description**: Le composant Price est utile pour l’affichage stylisé et normé des prix.


### Usage
Le Price est un composant de contenu qui standardise l'affichage des montants dans les parcours. Il contient le prix rond, la devise et les centimes si besoin.

##### **Quand l'utiliser**

- **Prix**  : pour mettre en avant le prix de chaque produit ou offre sur les pages de catégorie, de produit ou de promotion.
- **Offres et promotions** : pour mettre en avant les réductions, les offres spéciales et les ventes flash.

##### **Quand ne pas l'utiliser**

- **Valeurs non monétaire** :  on n’utilise pas le composant price pour des valeurs qui n’ont pas de valeur monétaire comme des notes, des pourcentages, des quantités, etc.

### Règles (Do & Don't)
- Hierarchie des prix
  *Description*: Le prix rémisé ne peut pas avoir une valeur supérieure ou égale au prix initial.
- Affichage de la devise 
  *Description*: Le prix doit toujours contenir une devise.  
- Affichage sans les centimes
  *Description*: Ne pas afficher les centimes s’ils sont égaux à 0.

---

## Progress
**Description**: Une barre de progression affiche la durée d'un processus.


### Usage
Le composant Progress informe les utilisateurs sur l'état d'un processus en cours, idéal pour des entonnoirs comme l'inscription ou la réservation, ainsi que pour des processus à plusieurs étapes comme les formulaires.

##### **Quand utiliser :**

- **Barre de progression déterminée :** Affiche le temps que prendra un processus. Utilisez-la lorsque le taux d'achèvement peut être détecté ou calculé.
- **Barre de progression indéterminée :** Exprime une attente de temps indéterminée ou non spécifiée. Utilisez-la lorsque le progrès n'est pas détectable ou qu'il n'est pas nécessaire d'indiquer la durée exacte d'une activité ou d'une action.

##### **Quand ne pas utiliser :**

- **Pour des actions immédiates :** Si l'action se termine presque instantanément, une barre de progression pourrait ne pas être nécessaire.
- **Pour les processus sans visibilité utilisateur :** Si l'utilisateur ne bénéficie pas de savoir l'état actuel du processus, utilisez une autre forme de feedback visuel.

---

## Radio
**Description**: Un bouton radio permet aux utilisateurs de ne sélectionner qu'une seule valeur dans une liste de deux options ou plus.


### Usage
Les radio buttons sont généralement utilisés en groupes, permettant aux utilisateurs de choisir une seule option parmi plusieurs. Lorsqu'un radio button dans le groupe est sélectionné, les autres se désélectionnent automatiquement.

##### **Quand utiliser**

- **Choix exclusifs** : lorsque l'utilisateur doit sélectionner une option unique parmi plusieurs.

- **Formulaires** : pour les questions à choix unique dans les formulaires, comme le type de livraison ou la méthode de paiement.

- **Paramètres de configuration** : pour les options de configuration où une seule option peut être active à la fois.

##### **Quand ne pas utiliser**

- **Choix multiples** : Utilisez des checkbox si l'utilisateur peut sélectionner plusieurs options simultanément.

- **Actions instantanées** : Utilisez des boutons pour des actions immédiates (comme soumettre un formulaire).

- **Longues listes** : Si vous avez une longue liste d'options, à partir de 6-7 options envisagez d'utiliser le composant select pour économiser de l'espace.


#### **Les différents types de radio button**

- **Les radio buttons** contiennent uniquement un label, ils sont idéaux dans des interfaces ou formulaires compacts pour des choix simples et évidents qui n'ont pas besoin de détails et privilégient la rapidité de sélection (Ex. : civilité, mode de livraison).

- **Les radio tiles** contiennent un label, une description optionnelle et une icône si besoin. Ils peuvent être utilisés pour des choix difficiles et importants qui ont besoin d'informations supplémentaires permettant à l'utilisateur de comparer avant d'effectuer un choix. (Ex. : types d’offres). Ils peuvent être positionnés verticalement ou horizontalement selon l’espace disponible.


### Accessibilité
## Bouton radio simple

### Comment l'utiliser

**Son étiquette :**
- Un bouton radio doit toujours avoir une étiquette visible (un label)

**Son état :**
- Un bouton radio peut être en disabled
- Un bouton radio ne peut pas être en readonly 
- si la sélection d'un des boutons radio est obligatoire, l'attribut aria-required="true" doit être ajouté au groupe

**Regroupement :** 
- Les boutons radio sont regroupés. Le groupe a un nom visible et pertinent.
 
 **Son activation :** 
 - l'activation d'une bouton radio ne doit pas déclencher le chargement d'une nouvelle page, ni déclencher le déplacement du focus
 
 **Exemples de code attendu**
 ```
 <p>* Champs obligatoires</p>

<p id="xx">Comment souhaitez-vous être contacté ? *</p>
<div role="group" aria-labelledby="xx" aria-required="true">
	<input type="radio" id="yy">
	<label for="yy">Email</label>
    <input type="radio" id="zz">
	<label for="zz">Téléphone</label>
    <input type="radio" id="uu">
	<label for="uu">Courrier</label>
</div>
```

### Règles (Do & Don't)
- Sélection multiple
  *Description*: Ne pas utiliser de radio button pour de la sélection multiple, utiliser une checkbox.
- Radio buttons et checkbox
  *Description*: Ne pas mélanger radio button et checkox dans la même liste.
- Label des radio buttons
  *Description*: Un radio button doit toujours contenir un label  pour des raisons  de compréhension et d’accessibilité.
- Utilisation des radio buttons
  *Description*: Un radio button ne doit pas être utilisé seul.
- Label des radio tiles
  *Description*: Le radio tiles doit toujours contenir un label en bold. Ce label peut être accompagné d’une description lorsque celui-ci nécessite un ou des éléments complémentaires pour guider au mieux l’utilisateur dans son choix.

---

## Range
**Description**: Le composant range permet aux utilisateurs d'effectuer des sélections à partir d'une plage de valeurs.

### Usage
Le composant Range permet aux utilisateurs de sélectionner une valeur à partir d'une plage de valeurs, souvent de manière intuitive et visuelle.

##### **Quand utiliser :**

- **Sélection de valeurs continues :** Parfait pour des opérations comme le réglage de la température ou de la luminosité.
- **Intuitivité :** Idéal pour les interactions qui se traduisent bien du monde physique aux écrans tactiles.
- **Gain de place :** Permet de sélectionner des valeurs sans occuper beaucoup d'espace à l'écran.

##### **Quand ne pas utiliser**

- **Valeurs discrètes ou spécifiques :** Pour des sélections précises où les utilisateurs doivent choisir des valeurs spécifiques, préférez un champ de saisie ou une liste déroulante.
- **Compréhension difficile :** Si les utilisateurs ont besoin de précision numérique exacte, un autre type de champ pourrait être plus adapté.

---

## Rows
**Description**: Gerér l'alignement horizontal entre les éléments de deux colonnes


### Usage
**Comportement de base**

Le composant `row` fonctionne comme les colonnes, mais il réparti ses enfants dans le sens vertical :

![](https://prod.trilogy-docs-admin.apps.ocp-3.ocp.euw3r53.nbyt.fr/assets/e1225250-c601-4b83-b9f3-5778237615b0)

**Alignement horizontal**

Son utilisation avec la facette `is-narrow` permet d'aligner des éléments identiques horizontalement :

![](https://prod.trilogy-docs-admin.apps.ocp-3.ocp.euw3r53.nbyt.fr/assets/3f5dbd23-ac8a-4697-9537-7367147952a8)





---

## Section
**Description**: Le composant Section est une unité de structure de base utilisée pour diviser les pages en segments logiques. Il encapsule le contenu et permet de structurer la mise en page de manière cohérente et modulable.


### Usage
Le composant Section est utilisé pour diviser le contenu en segments distincts, permettant une meilleure organisation et lisibilité.

L'élément de base d'une page Trilogy est l'élément HTML section, utilisé ainsi : `<section class="section">`.

Une `section` gère les marges principales de la page et prend toute la largeur disponible.

![](https://prod.trilogy-docs-admin.apps.ocp-3.ocp.euw3r53.nbyt.fr/assets/903cb599-c97e-4cca-8609-198c29a8a717)

**Quand utiliser :**

- **Organisation du contenu :** Segmenter des parties du contenu afin de le rendre plus structuré.
- **Amélioration de la lisibilité :** Faciliter la lecture en divisant les informations complexes en sections plus petites et digestes.
- **Hiérarchisation visuelle :** Mettre en évidence différentes parties du contenu pour guider l'utilisateur.

**Quand ne pas utiliser :**

- **Fragmentation excessive du contenu :** Ne divisez pas trop le contenu au risque de le rendre difficile à suivre. Utilisez des paragraphes ou d'autres éléments de structuration.
- **Contenu très court :** Pour des informations très brèves, une section entière pourrait être superflue ; privilégiez des paragraphes ou des listes pour ce type de contenu.

---

## Segmented-Control
**Description**: Un segmented control est un ensemble linéaire de deux segments ou plus, chacun fonctionnant comme un bouton.


### Usage
Un Segmented Control est un groupe de boutons où une seule option peut être sélectionnée à la fois. Il est souvent utilisé pour offrir un choix parmi un nombre d'options liées.

- **Navigation  :** Pour basculer entre différentes vues ou sections de contenu sans recharger la page.
- **Filtres de contenu :** Pour permettre aux utilisateurs de filtrer des données ou des listes d'éléments.
- **Options exclusives :** Pour présenter des options exclusives où une seule peut être sélectionnée à la fois.

**Quand utiliser**

- **Vente :** 
	- Utiliser pour basculer entre différentes catégories de produits (ex. : "Nouveautés", "Populaires", "En solde").
	- Offrir des options de tri comme "Prix croissant", "Prix décroissant", "Mieux notés".`
	- Permettre de basculer entre des vues de liste et des vues de grille des produits.

- **Assistance :** 
	- Utiliser pour naviguer entre différentes sections d'aide comme "FAQ", "Guides", "Contact".
	- Faciliter la sélection entre différents types de requêtes d'assistance (ex. : "Technique", "Facturation", "Général").
	- Offrir des options pour choisir entre différents modes de contact (ex. : "Chat en direct", "Email", "Téléphone").

- **Application/Espace client :** 
	- Utiliser pour basculer entre différentes sections de gestion de compte comme "Informations personnelles", "Abonnements", "Historique de commande".
	- Permettre de filtrer les notifications par types, par exemple "Toutes", "Important", "Messages".
	- Tableaux de bord : Offrir des vues différentes sur les tableaux de bord, comme "Aperçu", "Détails", "Statistiques"

**Quand ne pas utiliser**

- **Actions critiques :** Ne pas utiliser pour des actions critiques qui nécessitent une confirmation supplémentaire.
- **Contenu complexe :** Si le contenu associé à chaque segment est complexe ou très différent, envisager une autre méthode de navigation.

### Règles (Do & Don't)
- Un seule segment peut être sélectionner à la fois
- Les segments ne peuvent pas contenir qu’un icône 

---

## Select
**Description**: Le sélecteur donne aux utilisateurs la possibilité d'effectuer une sélection unique ou des sélections multiples parmi un certain nombre d'options.


### Usage
Le composant Select permet aux utilisateurs de choisir parmi une liste d'options prédéfinies au sein d'un formulaire, facilitant ainsi la soumission de données.

##### **Quand utiliser :**

- **Liste déroulante :** Lorsque les utilisateurs doivent choisir une option parmi plusieurs possibilités.
- **Formulaires :** Pour simplifier la sélection et la soumission de données dans les formulaires.

##### **Quand ne pas utiliser :**

- **Entrées textuelles libres ou réponses longues :** Utilisez un champ de texte à la place.
- **Nombre d'options très limité :** Préférez les boutons radio pour une sélection plus rapide.

---

## Stepper
**Description**: Un stepper affiche la progression d’un parcours en le décomposant en plusieurs étapes logiques et numérotées.

### Usage
Le Stepper permet de segmenter un processus en plusieurs étapes. Chaque étape est représentée par un indicateur distinct, souvent numéroté ou nommé, et permet aux utilisateurs de comprendre où ils se trouvent dans le processus, ce qu'ils ont déjà accompli, et ce qui leur reste à faire.

 - **Formulaires multi-étapes** : Pour diviser des formulaires longs et complexes en sections plus gérables.
 
 - **Processus d'inscription** : Pour guider les utilisateurs à travers les différentes étapes de création de compte.
 
 - **Guides interactifs** : Pour offrir des tutoriels pas-à-pas dans l'application d'espace client ou sur le site d'assistance
 




##### **Quand utiliser**

- **Vente** :
  - Utiliser pour guider les utilisateurs à travers les étapes de sélection de produit, information d'expédition, paiement, et confirmation.
  - Lorsqu'un produit nécessite une personnalisation ou une configuration spécifique, un Stepper peut segmenter ce processus.
  - Simplifier le processus d'inscription en le divisant en étapes claires.
  - Etre transparent avec l’utilisateur sur le nombre d’étapes, le rassurer sur le fait que cela va être rapide
 
-  **Assistance** : 
   - Guider les utilisateurs à travers une série d'étapes pour diagnostiquer et résoudre des problèmes techniques
   - Faciliter la soumission de tickets d'assistance en divisant le formulaire en sections plus faciles à gérer.
   - Offrir des tutoriels pas-à-pas pour aider les utilisateurs à résoudre des problèmes courants.
   
-  **Application/Espace client** : 
   - Gestion des abonnements : Guider les utilisateurs à travers les étapes de modification, renouvellement ou annulation d'abonnements.
   - Configuration initiale : Aider les nouveaux utilisateurs à configurer leur compte et à se familiariser avec les fonctionnalités principales.
   - Mise à jour de profil : Diviser le processus de mise à jour des informations de compte en étapes gérables.
   
   

##### **Quand ne pas utiliser**

- **Actions simples** : Pour des tâches qui peuvent être accomplies en une ou deux étapes, un formulaire simple ou un bouton d'action est préférable.

- **Navigation générale** : Ne pas utiliser le Stepper comme outil de navigation principale ou secondaire

- **Contenu non structuré** : Lorsque les informations ne suivent pas une séquence logique ou ne nécessitent pas de progression étape par étape.


### Règles (Do & Don't)
- Le step actif doit toujours avoir un label
- Toujours permettre à l’utilisateur de revenir en arrière  si nécessaire 

---

## Sticker
**Description**: Le sticker est utilisé pour faire émerger une information.


### Usage
Les stickers sont utilisés pour attirer l’attention de l’utilisateur sur une information liée à un produit ou une offre.

##### **Quand l'utiliser**

- **Mise en avant d’une information** : pour mettre en avant des informations essentielles comme des réductions, des offres limitées, des nouveautés, etc.

##### **Quand ne pas l'utiliser**

- **Eléments interactifs** : ne pas utiliser pour réaliser des actions ou rediriger les utilisateurs.

- **Informations non spécifiques** : ne pas utiliser pour des informations qui ne nécessitent pas une attention spécifique ou immédiate.

- **Sur-utilisation** : ne pas utiliser trop de stickers sur une seule page pour éviter de surcharger visuellement la lecture de l’utilisateur et diluer l'impact.


#### **Les différents types de sticker**

- **Sticker conversion (ACCENT)** : met en avant une information de conversion sur une page avec un objectif business (ex. : “Bon plan”, “1 mois offert”). Il peut y avoir plusieurs stickers de conversion sur la même page avec des bons plans différents.

- **Sticker information (INFO)**  : met en avant  toutes les informations liées à l’offre B.iG  (ex. : “BiG économies : -7€/mois déjà déduits”).

- **Sticker defaut (MAIN)** : met en avant tous types d’informations, hors conversions (ex. : “Nouveau”, “livraison offerte”).

- **Sticker reconditionné (ECO)** : met en avant une information sur un produit ou une offre reconditionné (ex. : Reconditionné)

#### **Stickers ou Tag ?**

- **Le Sticker** est utilisé pour mettre en avant une information importante pour l’utilisateur comme des réductions, des bons plans ou des nouveautés (ex. : “Bon plan”, “-XX€ de remise”, “1 mois offert”).

- **Le Tag** permet d’organiser et catégoriser les éléments et d’indiquer l’état ou le statut  d’un  élément (ex. : “Connecté”, “Non connecté”, “Disponible”).

### Règles (Do & Don't)
- Accessiblité
  *Description*: Ne pas écrire tout en majuscules pour favoriser la bonne lisibilité du texte.
- Césure
  *Description*: Ne pas écrire sur 2 lignes
- Lien dans un sticker
  *Description*: Lien dans un sticker
- Longueur
  *Description*: Ne pas dépasser 25 caractères espaces compris. Au-delà, utiliser un autre composant : badge, label, texte...
- Stickers avec icônes
  *Description*: Ne pas utiliser d’icône qui n’ont pas de signification avec le label

---

## Switch
**Description**: Un switch permet aux utilisateurs de choisir deux états mutuellement exclusifs comme ON/OFF.


### Usage
Le Switch permet aux utilisateurs de choisir entre deux options. Il est particulièrement utile pour activer ou désactiver des fonctionnalités ou des paramètres de manière rapide et intuitive.

##### **Quand l'utiliser**

- **Activation / Désactivation** : pour permettre aux utilisateurs d'activer ou désactiver des paramètres, fonctionnalités ou des options (ex. : notifications, mode sombre, BiG).
- **Paramètres instantanés** : pour des changements qui prennent un effet immédiatement sans nécessiter de confirmation supplémentaire.
- **Préférences personnelles** : pour permettre aux utilisateurs de personnaliser leur expérience et leurs préférences (ex. : activer des recommandations personnalisées).

##### **Quand ne pas l'utiliser**

- **Sélections avec validation** : lorsque l’utilisateur doit sélectionner un ou plusieurs choix qui doivent être validés. Dans ce cas, utiliser des checkbox ou des boutons radio.
- **Action de filtrage** : pour filtrer des résultats. Dans ce cas, utiliser des checkbox ou des chips.
- **Actions et conséquences** : pour des actions qui nécessitent une confirmation ou des conséquences majeures (ex. : suppression de compte). Dans ce cas, utiliser le composant bouton.



#### **Switch ou checkbox** ?

- **Un Switch** permet de réaliser une action immédiate ou d’activer ou désactiver un mode ou une option (ex. : forfait bloqué, préférences d’utilisation).
- **Les Checkbox**permettent à l’utilisateur de sélectionner plusieurs choix qui doivent être validés (ex. : Formulaire), sauf dans le cas de filtrage de recherche peuvent s’actualiser directement.

### Règles (Do & Don't)
- Label unique
  *Description*: Un switch ne peut avoir qu’un label.
- Label
  *Description*: Le swicth doit toujours être accompagné d’un label.
- Alignement des labels
  *Description*: Même si on peut mettre le label à droite ou à gauche du switch, les labels doivent tous être alignés lorsque plusieurs switch se suivent pour faciliter la lecture.

---

## Table
**Description**: Les tableaux permettent d'afficher des données tabulaires. Ils sont classiques par défaut et peuvent être déclinés pour comparer des éléments (forfaits, téléphones, etc.)


### Usage
Les tables organisent des informations complexes de manière structurée et digeste, rendant les données claires et accessibles. Une table bien conçue améliore la clarté et l'expérience utilisateur en maximisant le potentiel des données.

**Quand utiliser :**

- **En-tête et description clairs :** Pour que les utilisateurs comprennent facilement ce qu'ils consultent.
- **Typographie lisible et espacement adéquat :** Facilite la lecture et la compréhension rapide du contenu.

**Quand ne pas utiliser :**

- **Alignement central pour le contenu :** Réduit la lisibilité et la détection des irrégularités, rendant la comparaison des lignes plus difficile.
- **Autres formats visuels :** Si les données peuvent être mieux comprises via des graphiques ou des diagrammes, privilégiez ces derniers.

---

## Tabs
**Description**: Les onglets facilitent l'exploration et le basculement entre les différentes vues.


### Usage
Les Tabs sont des éléments de navigation qui permettent de basculer entre différentes sections de contenu sans quitter la page actuelle. Chaque onglet représente une section distincte et, lorsqu'il est sélectionné, affiche le contenu associé tout en masquant les autres sections.

- **Organisation du contenu :** Lorsque vous avez besoin de diviser de grandes quantités d'informations.
- **Navigation contextuelle :** Pour permettre aux utilisateurs de basculer rapidement entre différentes vues ou sections sans rechargement de page.
- **Éviter le défilement :** Pour présenter plusieurs contenus dans un espace limité sans nécessiter un défilement vertical excessif.

##### **Quand utiliser**

- **Vente :** 
	- Utiliser des onglets pour organiser les descriptions, les spécifications, les avis clients et les questions fréquentes.
	- Naviguer entre les différentes offres (Premium, Essentiel, Pack)
	- Proposer des options de support (chat en direct, email, téléphone) dans des onglets distincts.
- **Assistance :**
	- Structurer les guides d'utilisation en sections thématiques pour un accès rapide.
- **Application/Espace client :** 
	- Permettre aux utilisateurs de basculer entre les informations de compte, les paramètres de sécurité, et les préférences de notification.
	- Permettre aux utilisateurs de personnaliser leurs paramètres de compte (ex. activer des rappels de paiement).
	- Permettre aux utilisateurs de gérer leurs préférences de partage de données.

##### **Quand ne pas utiliser**

- **Contenu indépendant :** Évitez d'utiliser des tabs pour des contenus qui n'ont pas de relation directe entre eux.
- **Navigation principale :** Pour la navigation principale du site, préférez les barres de navigation ou les menus déroulants.
- **Long contenu :** Si chaque section de contenu est très longue, envisagez d'utiliser des pages séparées ou des accordéons pour une meilleure lisibilité.


### Règles (Do & Don't)
- Ne pas utiliser une tab seul
- Ne pas utiliser que des icônes 
- Ne pas changer l’orientation des  tabs

---

## Tag
**Description**: Les tags sont des éléments visuels informatifs statiques utilisés individuellement ou en groupe pour catégoriser, étiqueter ou indiquer l'état d'un élément. 

### Usage
##### **Quand l'utiliser**

- **Catégorisation** : pour identifier visuellement le type ou la catégorie d'un contenu ou d’un produit (ex. : “Forfait mobile”, “Box internet”). 
- **Indication d'état** : pour montrer l'état ou le statut d'un élément (ex. : "Nouveau", "En stock", "En cours").

##### **Quand ne pas l'utiliser**

- **Sélection / Filtrage**  : un tag est un élément statique, on n’utilise pas les tags pour filtrer des résultats de recherche. Dans ce cas, on utilise les chips.

- **Texte Long** : on n’utilise pas les tags pour des informations détaillées ou des descriptions longues. Dans ces cas, on utilisera plutôt le composant text. 


##### **Tag ou Sticker ?**

- Le **Tag** permet d’organiser et catégoriser les éléments et d’indiquer l’état ou le statut  d’un  élément (ex. : “Connecté”, “Non connecté”, “Disponible”).

- Le **Sticker** est utilisé pour mettre en avant une information importante pour l’utilisateur comme des réductions, des bons plans ou des nouveautés (ex. : “Bon plan”, “-XX€ de remise”, “1 mois offert”).


##### **Les différents statuts du tag** :

- **Default tag** : l’état du tag par défaut peut être utilisé pour afficher ou catégoriser tout type de contenu lorsqu’aucun variant sémantique spécifique n’est nécessaire (error, warning, success, information).

- **Information tag** : le tag info est utilisé pour communiquer des informations importantes mais non critiques. Il permet de mettre en avant des nouveautés, des recommandations ou des statuts informatifs (ex. : “Nouveau”, “Recommandé”, “Mise à jour”).

- **Success tag** : le tag succès indique un état positif. Il est utilisé pour signaler des éléments disponibles, des actions réussies ou des statuts favorables (ex. : “En stock”, “Validé”, “Actif”).

- **Warning tag** : le tag warning permet d’attirer l'attention sur une situation nécessitant une vigilance ou une action. Il est utilisé pour les stocks limités, les échéances proches ou les statuts qui nécessitent une attention particulière  (“Bientôt disponible”, “A renouveler”, “En cours”).

- **Error tag** : le tag erreur permet de signaler un problème, un blocage ou un état critique. Il est utilisé pour indiquer des ruptures de stock, des erreurs système ou des statuts d'alerte (“En rupture”, “Expiré”, “Bloqué”).

### Règles (Do & Don't)
- Ne pas changer les icônes des tag sémantique (Warning, Success, Error, Info)
- Accessibilité du tag
  *Description*: Ne pas écrire en lettres capitales dans le tag.
- Longueur du tag
  *Description*: Ne pas écrire le tag sur 2 lignes.

---

## Text
**Description**: Le texte affiche des informations écrites, essentielles pour la communication et la structuration du contenu.

### Usage
Le texte communique des informations aux utilisateurs sous forme de mots et de phrases, constituant la base de tout contenu écrit.

**Quand utiliser :**

- **Communiquer des informations :** Transmet des messages, des descriptions ou des instructions.
- **Améliorer la compréhension :** Fournit des explications détaillées ou des contextes supplémentaires.
- **Créer une hiérarchie visuelle :** Utilise des styles différents (gras, italique, souligné) pour attirer l'attention sur des points spécifiques.

**Quand ne pas utiliser :**

- **Éléments nécessitant des actions interactives :** Comme des boutons ou des liens.
- **Informations visuelles complexes :** Où des images, des graphiques ou des icônes seraient plus appropriés pour une meilleure clarté.


### Accessibilité
**Comment l'utiliser :**
- un texte a comme markup un "p"
- un texte peut avoir comme markup un "span" si il est dans un "p", un "li", un "td"... s'il est inclus dans un élément ayant une sémantique
- un texte ne peut pas avoir comme markup un "span" si il est inclus dans une "div"

---

## Textarea
**Description**: Le composant Textarea permet de récolter des informations saisies librement par l'utilisateur. Il doit être contenu dans une balise <form></form>


### Usage
Le composant Textarea est e utilisé pour permettre aux utilisateurs de saisir de grandes quantités de texte. Contrairement au composant Input, les textareas sont conçus pour des entrées plus longues et détaillées.

- **Formulaires de feedback :** Pour recueillir des commentaires détaillés de la part des utilisateurs.
- **Sections de commentaire :** Pour permettre aux utilisateurs de laisser des avis ou des commentaires.
- **Formulaires de contact :** Pour permettre aux utilisateurs de décrire leur problème ou leur question en détail.

##### **Quand utiliser**

- **Vente :** 
	- Utiliser des textareas pour permettre aux clients de laisser des avis détaillés sur les produits.
	- Permettre aux utilisateurs de décrire les raisons de leur retour de produit.
	- Recueillir des informations détaillées sur l'expérience d'achat des clients.
- **Assistance :** 
	- Utiliser des textareas pour que les utilisateurs puissent décrire leurs problèmes ou questions en détail.
	- Recueillir des retours détaillés sur les services d'assistance.
	- Permettre aux agents de support de noter des résolutions ou des procédures détaillées.
- **Application/Espace client :** 
	- Permettre aux utilisateurs d'envoyer des messages détaillés au support client ou à d'autres utilisateurs.
	- Permettre aux utilisateurs de donner des retours sur les services utilisés.

##### **Quand ne pas utiliser**

- **Entrées courtes :** Pour des champs nécessitant une réponse courte, utilisez le composant input 
- **Actions simples :** Pour des actions simples comme la recherche rapide ou les logins, utilisez le composant input

### Règles (Do & Don't)
- Ne pas retirer l’icône et le label

---

## Timeline
**Description**: Il permet d’illustrer de manière graphique et linéaire différentes étapes.


### Usage
Le Timeline est un composant graphique qui affiche des événements ou des étapes dans l'ordre chronologique. Chaque événement est généralement représenté par un point ou un marqueur sur une ligne, accompagné d'une description textuelle. Ce composant permet aux utilisateurs de comprendre rapidement la progression ou l'historique d'une série d'événements.

- **Historique de commande :** Pour montrer l'évolution d'une commande depuis la validation jusqu'à la livraison.
- **Étapes de processus :** Pour visualiser les étapes d'un processus complexe, comme l'inscription, la souscription ou le suivi de projet.
- **Chronologie des événements :** Pour présenter une séquence d'événements importants, comme les étapes de résolution d'un problème.

##### **Quand utiliser**
	
    	
- **Vente :** 
	- Utiliser la timeline pour afficher les étapes de traitement d'une commande, depuis l'achat jusqu'à la livraison.
- **Assistance :** 
	- Illustrer les différentes étapes du traitement d'un ticket de support, de la soumission à la résolution.
	- Décomposer des processus complexes en étapes claires et chronologiques.
- **Application/Espace client :** 
	- Afficher les transactions passées et leurs détails chronologiques.
	- Montrer les étapes et l'évolution des projets ou des abonnements des clients.
	- Visualiser les interactions et les communications entre le client et le service client.

##### **Quand ne pas utiliser**

- **Informations non chronologiques :** Si les informations ne suivent pas une séquence temporelle, une autre structure comme une liste ou un tableau peut être plus appropriée
- **Trop d'événements :** Si la chronologie comporte trop d'événements, elle peut devenir difficile à lire et à suivre.
- **Informations simples :** Pour des informations simples ou isolées, une présentation plus directe peut être plus efficace.

---

## Timepicker
**Description**: 


Composant de sélection d'heure permettant à l'utilisateur de saisir une heure précise, disponible en mode champ de saisie ou en mode circulaire.

### Usage
Le composant TimePicker permet à l'utilisateur de sélectionner une heure précise. Il peut être utilisé pour planifier un rendez-vous, réserver un créneau horaire ou programmer une action différée.


#### **Quand l’utiliser** 

- **Prise de rendez-vous** : réserver un créneau horaire pour un rendez-vous ou un intervention.
- **Rappel**: choisir une heure pour être rappelé.
- **Action différée** : planifier l'activation d'une option à une heure précise.

#### **Quand ne pas utiliser**

- **Heures simples** : Pour des sélections type "Matin", "Après-midi", "Soir", privilégier des radio buttons ou un select.

- **Durées longues** : Pour saisir une durée supérieure à 24h, le TimePicker n'est pas adapté car il est limité à 23h59


#### **Les différents types de TimePicker**

- **TimePicker Default** : Le TimePicker Default permet à l'utilisateur de sélectionner une heure en faisant défiler verticalement des colonnes d'heures et de minutes. Il est adapté aux utilisateurs qui connaissent précisément l'heure souhaitée et souhaitent la saisir rapidement.
- **TimePicker Circular** : Le TimePicker Circular permet à l'utilisateur de sélectionner une heure en cliquant sur un cadran d'horloge, d'abord les heures puis les minutes. Il propose également des champs de saisie pour entrer directement l'heure souhaitée. Il est adapté aux utilisateurs qui ont besoin d'une aide visuelle pour choisir leur heure.

---

## Title
**Description**: Les titres nous permettent de structurer les sections de notre contenu et nous avons utilisé différentes tailles pour créer une hiérarchie dans ces sections.

### Usage
Le titre structure le contenu et attire l'attention sur les éléments clés, améliorant ainsi la navigation et la compréhension pour l'utilisateur.

**Quand utiliser :**

- **Hiérarchiser les informations :** Organise le contenu de manière logique et compréhensible.
- **Améliorer la lisibilité :** Facilite la lecture en segmentant le texte en sections digestes.
- **Guider l'utilisateur :** Dirige efficacement l'attention de l'utilisateur vers les points importants.

**Quand ne pas utiliser :**

- **Textes ou contenus secondaires :** Qui ne nécessitent pas une attention particulière de la part de l'utilisateur.
- **Éléments interactifs :** Où un bouton ou un lien serait plus approprié afin de déclencher une action.

### Accessibilité
**Comment l'utiliser :**
- Un titre introduit une section
- Un titre est pertinent, il permet de comprendre le contenu de la section
- Un titre a comme markup un "h1", "h2", "h3", h4", "h5", "h6" uniquement
- Sur une page web, la hiérarchie des titres est cohérente :
	- éviter les ruptures comme passer d'un titre de niveau 2 à un titre de niveau 4
    - le titre principal de la page est un titre de niveau 1
    - les niveaux sont utilisés correctement : un titre de niveau 3 est bien dans la section qui a le titre de niveau 2 précédent
    
**Quand ne pas l'utiliser :**
- Ne pas utiliser les titres à des fins de présentation, pour grossir du texte par exemple
- Ne pas générer des titres vides
- Ne pas utiliser les markup "p", "span", "div"
 
 **Comment tester :**
- utiliser l'extension navigateur "HeadingsMap
![](https://prod.trilogy-docs-admin.apps.ocp-3.ocp.euw3r53.nbyt.fr/assets/4b0b31fd-34e0-44a1-aa27-f6f2884a2b93)

---

