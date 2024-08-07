import React, { createContext, useState, useContext, useEffect } from 'react';
const BuyContext = createContext();

export const useBuyContext = () => useContext(BuyContext);

export const BuyProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 0,
        typeOfProperty: 'flat/apartment',
        minBedRoom: 0,
        maxBedRoom: 0,
        location: 'all',
        minradius: 0,
        maxradius: 0,
    });

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const queryParams = new URLSearchParams(filters).toString();
                const response = await fetch(`https://nutlip-backend.onrender.com/api/apartments/getallapartmentswithoutpag`);
                const data = await response.json();
                if (response.ok) {
                    setProperties(data.data);
                    console.log(data.data);
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, [filters]);

    const value = {
        filters,
        setFilters,
        properties,
        setProperties,
    };

    return <BuyContext.Provider value={value}>{children}</BuyContext.Provider>;
};
