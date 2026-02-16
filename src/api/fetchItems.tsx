import { Item } from '../types/types'; // Asegúrate de tener la interfaz definida

export async function fetchItems(): Promise<Item[]> {
    // 1. Obtenemos la lista básica de items
    const response = await fetch('https://pokeapi.co/api/v2/item?limit=60');
    
    if (!response.ok) {
        throw new Error('Failed to fetch items');
    }

    const data = await response.json();

    // 2. Usamos Promise.all para obtener los detalles de cada item en paralelo
    const itemDetails = await Promise.all(
        data.results.map(async (item: any) => {
            const detailRes = await fetch(item.url);
            const detailData = await detailRes.json();
            
            return {
                name: detailData.name.replace(/-/g, ' '), // Limpiamos guiones (ej. "poke-ball" -> "poke ball")
                id: detailData.id,
                imgSrc: detailData.sprites.default,
                // Buscamos el efecto corto en inglés
                effect: detailData.effect_entries.find(
                    (entry: any) => entry.language.name === 'en'
                )?.short_effect || "No description available"
            };
        })
    );

    // 3. Filtramos los que no tienen imagen (algunos items de la API vienen vacíos)
    return itemDetails.filter(item => item.imgSrc !== null);
}