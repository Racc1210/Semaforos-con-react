---
# Quiz #5 -Semaforos

## Roymar Castillo Carvajal

Primero empecé por desarrollar la lógica de sincronización de los semáforos en Python. La idea que tuve fue hacer que los semáforos se cambiaran en intervalos de tiempo predeterminados, en un ciclo de 1 minuto con 15 segundos para cada semáforo. Para esto, planteé usar 5 hilos:uno para actualizar el contador y uno por cada semáforo, para que fueran completamente independientes unos de otros. Al momento de tratar de llevar esto a JavaScript, encontré el problema de que la única forma de hacer hilos es por medio de Web Workers, pero estos hilos no pueden compartir memoria entre ellos, por lo que decidí implementar únicamente un Web Worker para separar la interfaz grafica de la lógica de los semáforos y adapté la lógica para que funcionara con un solo hilo.

link a la pagina desplegada: https://racc1210.github.io/Semaforos-con-react/
---
