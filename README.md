# Cómo ejecutar

- En una terminal, abrir /backend y ejecutar:
  - `npm run seed` la primera vez, esto regenera la base de datos con data de prueba
  - `npm run dev` para levantar el servidor de backend

- En otra terminal diferent abrir /frontend y ejecutar `npm run dev` para levantar el frontend

# Testeo de endpoints

Se pueden hacer llamadas como

```
curl --location 'http://localhost:8080/api/products'
curl --location 'http://localhost:8080/api/carts'
```
