// Obtiene el elemento contenedor principal para los personajes
const grid = document.getElementById('grid');

// Realiza la petición a la API de personajes de Harry Potter
fetch('https://hp-api.onrender.com/api/characters')
    .then(r => r.json()) // Convierte la respuesta a formato JSON
    .then(d => {
        // Elimina el indicador de carga una vez que se reciben los datos
        document.getElementById('loading').remove(); 

        // Filtra los personajes que tienen una imagen y luego itera sobre ellos
        d.filter(p => p.image).forEach(p => {
            // Crea un nuevo elemento div para la tarjeta del personaje
            const card = document.createElement('div');
            // Asigna la clase 'card' para aplicar estilos CSS
            card.className = 'card';

            // Define el contenido HTML interno de la tarjeta usando template literals
            card.innerHTML = `
                <div class="portrait">
                    <img src="${p.image}" alt="${p.name}">
                </div>
                <div class="name">${p.name}</div>
                <div class="house">${p.house || 'Sin casa'}</div>
                <div class="actor">${p.actor || 'Desconocido'}</div>
                <div class="alive">${p.alive ? 'Vivo' : 'Fallecido/Desconocido'}</div>
            `;
            
            // Agrega la tarjeta al contenedor 'grid'
            grid.append(card);
        });
    })
    .catch(error => {
        // Manejo de errores en caso de fallo en la petición
        console.error('Error al obtener los datos de la API:', error);
        document.getElementById('loading').innerHTML = 'Error al cargar los datos.';
    });

// Nota: Se añadió el campo 'alive' y un manejo simple para 'actor' 
// y el estado 'alive' para hacer la tarjeta más informativa,
// aunque solo 'name', 'house' e 'actor' se veían explícitamente en la imagen,
// la estructura de datos de la API lo sugiere.