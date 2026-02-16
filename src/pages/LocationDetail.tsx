import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRegionDetails } from '../api/fetchLocations';
import Footer from '../components/Footer';
import styles from './itemDetail.module.css'; // Reutilizamos el estilo de tarjeta

const LocationDetail = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState<any>(null);

    useEffect(() => {
        if (name) fetchRegionDetails(name).then(setDetails);
    }, [name]);

    if (!details) return <div className={styles.itemPage}>Cargando mapa...</div>;

    return (
        <div className={styles.itemPage}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                &larr; Volver al Mundo
            </button>
            
            <div className={styles.itemCard}>
                <h1 className={styles.itemTitle}>Región {name}</h1>
                <div className={styles.specsContainer}>
                    <span className={styles.specLabel}>Lugares importantes:</span>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
                        {details.locations.map((loc: any) => (
                            <li key={loc.name} style={{
                                padding: '12px',
                                borderBottom: '1px solid #eee',
                                textTransform: 'capitalize',
                                color: '#444'
                            }}>
                                🏙️ {loc.name.replace(/-/g, ' ')}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LocationDetail;