import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importante para la navegación
import { fetchItems } from '../api/fetchItems';

import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './items.module.css';
import { Item } from '../types/types';

const Items = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getItems = async () => {
            setIsLoading(true);
            try {
                const data = await fetchItems();
                setItems(data);
            } catch (error) {
                console.error("Error cargando items:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getItems();
    }, []);

    // Lógica de filtrado por nombre
    const filteredItems = items.filter((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase());
    });

    return (
        <div className={styles.pageContainer}>
            <Header query={query} setQuery={setQuery} />
            
            <main className={styles.main}>
                {isLoading ? (
                    <div className={styles.loading}>Cargando mochila...</div>
                ) : (
                    <div className={styles.itemList}>
                        {filteredItems.map((item) => (
                            /* Envolvemos cada item en un Link dinámico */
                            <Link 
                                key={item.id} 
                                to={`/items/${item.name.replace(/\s+/g, '-')}`} 
                                className={styles.listItem}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <img 
                                    src={item.imgSrc} 
                                    alt={item.name} 
                                    className={styles.listItemIcon} 
                                />
                                <div className={styles.listItemText}>
                                    <span className={styles.itemName}>{item.name}</span>
                                    {/* Opcional: una vista previa corta del efecto */}
                                    <p className={styles.itemEffect}>{item.effect}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Items;