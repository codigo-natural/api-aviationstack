# Coneccion a la api de AVIATIONSTACK

### Requisitos Previos  

- Node.js 18.0.0 o superior  
- npm o yarn  

### Instalación  

1. Clona el repositorio:  
   ```bash
   git clone https://github.com/codigo-natural/api-aviationstack.git
   ```  

2. Instala las dependencias:  
   ```bash
   npm install
   # o
   yarn install
   ```  

3. Configurar variables de entorno:

Crea un archivo .env en la raíz del proyecto y agrega tu clave API de Aviationstack:

NEXT_PUBLIC_AVIATIONSTACK_API_KEY=tu_clave_api_aqui

⚠️ Nota: Para utilizar la funcionalidad de búsqueda, es necesario contar con un plan Basic en Aviationstack. Si solo tienes el Free Plan, la búsqueda no estará disponible. Por defecto, el código está configurado para conectarse a la api de AVIATIONSTACK para traer todos los datos. Si tienes el plan Basic, descomenta la sección correspondiente en store/airportStore.js.

4. Inicia el servidor de desarrollo:  
   ```bash
   npm run dev
   # o
   yarn dev
   ```  

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.  

## Ejecutar Pruebas  

```bash
npm test
# o
yarn test
```  