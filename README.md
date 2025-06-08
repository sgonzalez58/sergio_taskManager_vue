# DoneZilla TaskManager

Ceci est un projet avec Vue3 et js-server pour la base de donnée.

Nous avons 4 objets dans ce taskManager qui sont "Task", "Project", "User" et "Team".
Il y a 3 rôles disponible pour les utilisateurs qui sont "dev", "manager" et "admin".

Le dev peut aujourd'hui uniquement voir les tâches et en créer.
Le manager peut aussi gérer les tâches et il a accès aux projets également.
L'admin a accès à toutes les pages.

Sur la page des "Task", on peut ajouter, modifier et supprimer une tâche.
Sur la page des "Project", on peut ajouter un projet et incrire notre "Team" à un projet libre ou on peut désinscrire notre équipe à un projet déjà inscrit.
Sur la page "User", on peut ajouter, modifier et supprimer un utilisateur.
Sur la page "Team", on peut ajouter, modifier ou supprimer une équipe.

## Task
Voici les propriétés que possède une tâche :
- ID
- projectID (ID de projet)
- label
- estimatedTime (entre 1 et 4)
- step (de 1 à 5 (Backlog(1), Todo(2), InProgress(3), InReview(4), Done(5)))
- assignedTo (ID de dev)

## Project
Voici les propriétés que possède un projet :
- ID
- project_name
- team_id (ID de team)

## User
Voici les propriétés que possède un utilisateur :
- ID
- first_name
- last_name
- email
- password (hashé avec bcrypt)
- type (admin, manager ou dev)

## User
Voici les propriétés que possède une équipe :
- ID
- name
- members (tableau d'IDs de dev)
- manager (ID de manager)

## Todo

- Trier les différentes tâche dans la page "Task" en fonction des projets.
- Ne faire apparaitre dans la page "Task" que les projets de notre équipe pour les "dev" et les "managers".
- Faire un Dashboard pour chaque Rôle.
- Utiliser chartJS pour faire des charts dans le Dashboard
- Utiliser correctement le token de connexion pour tester les connexions à chaque routes.
- Valider les champs de formulaire.