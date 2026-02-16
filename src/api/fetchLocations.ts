export async function fetchRegions() {
    const response = await fetch('https://pokeapi.co/api/v2/region');
    if (!response.ok) throw new Error('Error al cargar regiones');
    const data = await response.json();
    return data.results; // Retorna [{name: "kanto", url: "..."}, ...]
}

export async function fetchRegionDetails(name: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/region/${name}`);
    if (!response.ok) throw new Error('Error al cargar detalle de región');
    return await response.json();
}