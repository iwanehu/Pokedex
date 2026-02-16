import { useNavigate, useParams } from "react-router-dom";
import PokeballImg from "../assets/pokeball.png"
import Footer from "../components/Footer";
import BulbasaurImg from "../assets/bulbasaur.gif"
import styles from "./pokemon.module.css"
import { PokemonDetails } from "../types/types";
import { useEffect, useState } from "react";
import { fetchPokemon } from "../api/fetchPokemon";
import LoadingScreen from "../components/LoadingScreen";
import { waitFor } from "../utils/utils";



function Pokemon() {

    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState<PokemonDetails>();
    const {name} = useParams();
    const navigate = useNavigate();


    useEffect(()=>{
    async function getPokemon(){
         setIsLoading(true);
         await waitFor(500);
         const fetchedPokemon = await fetchPokemon(name as string);
         setPokemon(fetchedPokemon);
         setIsLoading(false);
    }
    getPokemon();
    },[name])

    if(isLoading || !pokemon){return <LoadingScreen/>}

    return (
        <>
          <button className={styles.pokeballButton} onClick={()=>navigate(-1)}>
            <img className={styles.pokeballImg} src={PokeballImg} alt="Pokeball" />Go back  
          </button>
            <div className={styles.pokemon}>

          <main className={styles.pokemonInfo}>
            <div className={styles.pokemonTitle}>{pokemon?.name?.toUpperCase()}</div>
            <div>Nr. {pokemon?.id}</div>
            <div>
                <img className={styles.pokemonInfo} src={pokemon?.imgSrc} alt={pokemon?.name} />  
            </div>
            <div>HP:{pokemon?.hp}</div>
            <div>Attack: {pokemon?.attack}</div>
            <div>Defense: {pokemon?.defense}</div>
          </main>
            </div>
          <Footer/>
        </>
    )
}

export default Pokemon
