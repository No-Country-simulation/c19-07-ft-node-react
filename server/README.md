
## BRANCHES 
```bash
The structure branch
Example: juan/fe/init/frontend-structure

be=backend 
fe=fronted
```
```bash
1. Create branch : git checkout -b darvin-be-init-backend-Postgre
2. Delete branch : git branch -d nombre-de-la-rama
3. Delete forced branch: git branch -D nombre-de-la-rama
4. Change branch: git switch nueva-rama


```s



## Create or modified table localhost and Railway 
```bash
# This only if you have not created the localhost database |shell
1. Opent the shell
2. \l : para ver el listado de todas las bases de datos creados
3. CREATE DATABASE nombre_de_la_base;  : para crear la base de dato
# OPTIONAL THE FOLLOWING
4. \c nombre_de_la_base : para conectarse a la base de datos
5. \dt	: permite obtener informacion detallada sobre una tabla especifica de la base actual (estructura de la tabla, contenido de la tabla, verificar restricciones de la tabla).
6. SELECT * FROM nombre_de_la_base; mostrara todos los registros de la tabla de la bd.

```
```bash
# Create migration in develop within localhost
npm run prisma:migrate:dev --name "nombre_de_tu_migracion"

# Apply migration in production
npm run prisma:migrate:prod

# production mode
$ npm run start:prod
```
