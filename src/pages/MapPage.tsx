import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRegions } from '../api/fetchLocations';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './items.module.css'; 

const MapPage = () => {
    const [regions, setRegions] = useState<any[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        fetchRegions().then(setRegions);
    }, []);

    const filteredRegions = regions.filter(r => 
        r.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className={styles.pageContainer}>
            <Header query={query} setQuery={setQuery} />
            <main className={styles.main}>
                <h2 style={{ textAlign: 'center', margin: '20px 0', color: '#333' }}>Mapa Regional</h2>
                <div className={styles.itemList}>
                    {filteredRegions.map((region) => (
                        <Link 
                            key={region.name} 
                            to={`/location/${region.name}`} 
                            className={styles.listItem}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className={styles.listItemText}>
                                <span style={{ fontSize: '1.2rem', display: 'block' }}>📍</span>
                                <b>{region.name.toUpperCase()}</b>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MapPage;
