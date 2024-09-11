import React, { createContext, useState, useContext, useEffect } from 'react';
const BuyContext = createContext();

export const useBuyContext = () => useContext(BuyContext);

export const BuyProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 0,
        typeOfProperty: 'all',
        minBedRoom: 0,
        maxBedRoom: 0,
        location: 'all',
        minradius: 0,
        maxradius: 0,
        page: 1,
        page_size: 3,
        viewType: '',
    });

    const [totalCount, setTotalCount] = useState(0); // total count of records
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setIsloading(true); // Set isLoading to true before fetching data
                const queryParams = new URLSearchParams(filters).toString();
                const response = await fetch(`https://nutlip-backend.onrender.com/api/apartments/getallapartments?${queryParams}`);
                const data = await response.json();
                if (response.ok) {
                    setTotalCount(data.total_record_count); // Set total record count from API
                    setProperties(data.data);
                    console.log(data);
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setIsloading(false); // Set isLoading to false after fetching data, regardless of success or failure
            }
        };

        fetchProperties();
    }, [filters]);

    const totalPages = Math.ceil(totalCount / filters.page_size); // Calculate total pages

    const value = {
        filters,
        setFilters,
        properties,
        setProperties,
        totalCount,
        totalPages, // Expose totalPages
        isLoading
    };

    return <BuyContext.Provider value={value}>{children}</BuyContext.Provider>;
};