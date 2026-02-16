import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import styles from './itemDetail.module.css';

const Item = () => {
    // Obtenemos el nombre del item desde la URL (ej: /items/ultra-ball)
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    
    // Estado para guardar la información detallada del item
    const [item, setItem] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getItemDetail() {
            setIsLoading(true);
            try {
                // Hacemos el fetch directamente a la PokeAPI usando el nombre de la URL
                const res = await fetch(`https://pokeapi.co/api/v2/item/${name?.toLowerCase()}`);
                if (!res.ok) throw new Error("Item no encontrado");
                
                const data = await res.json();
                setItem(data);
            } catch (error) {
                console.error("Error al obtener el item:", error);
            } finally {
                setIsLoading(false);
            }
        }
        getItemDetail();
    }, [name]);

    if (isLoading) return <div className={styles.itemPage}>Cargando especificaciones...</div>;
    if (!item) return <div className={styles.itemPage}>No se encontró el objeto.</div>;

    return (
        <div className={styles.itemPage}>
            {/* Botón para regresar a la lista de Items */}
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                &larr; Volver
            </button>
            
            <div className={styles.itemCard}>
                {/* Cabecera con Nombre e ID */}
                <h1 className={styles.itemTitle}>{item.name.replace(/-/g, ' ')}</h1>
                <span className={styles.itemNr}># {item.id}</span>
                
                {/* Imagen destacada */}
                <div className={styles.imageContainer}>
                    <img 
                        className={styles.itemImg} 
                        src={item.sprites.default} 
                        alt={item.name} 
                    />
                </div>

                {/* Tabla de especificaciones técnicas */}
                <div className={styles.specsContainer}>
                    <div className={styles.specLine}>
                        <span className={styles.specLabel}>Categoría</span>
                        <span className={styles.specValue}>
                            {item.category.name.replace(/-/g, ' ')}
                        </span>
                    </div>
                    
                    <div className={styles.specLine}>
                        <span className={styles.specLabel}>Costo</span>
                        <span className={styles.specValue}>
                            {item.cost > 0 ? `${item.cost} ¥` : "Gratis / Especial"}
                        </span>
                    </div>

                    <div className={styles.specLine}>
                        <span className={styles.specLabel}>Efecto Principal</span>
                        <p className={styles.effectText}>
                            {/* Buscamos el efecto en inglés, si no existe ponemos uno por defecto */}
                            {item.effect_entries.find((e: any) => e.language.name === 'en')?.effect 
                             || "No hay descripción detallada disponible para este objeto."}
                        </p>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default Item;