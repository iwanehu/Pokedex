export type Pokemon = {
  name: string;
  id: string;
  imgSrc: string;
};


export type PokemonDetails = {
  name : string;
  id : string;
  imgSrc: string;
  hp: number;
  attack: number;
  defense: number;
}

export type Item = {
  name: string;
  id: number;
  imgSrc: string;
  effect: string;
};

export type Location = {
  name: string;
  url: string; // La PokeAPI devuelve la URL para ver qué Pokémon hay dentro
};