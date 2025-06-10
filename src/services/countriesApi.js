const BASE_URL = 'https://restcountries.com/v3.1';

export const countriesApi = {
    // Buscar todos os países
    getAllCountries: async () => {
        try {
            const response = await fetch(`${BASE_URL}/all?fields=name,flags,cca3`);
            if (!response.ok) {
                throw new Error('Failed to fetch countries');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching countries:', error);
            throw error;
        }
    },

    // Buscar país por código
    getCountryByCode: async (code) => {
        try {
            const response = await fetch(`${BASE_URL}/alpha/${code}`);
            if (!response.ok) {
                throw new Error('Failed to fetch country details');
            }
            const data = await response.json();
            return data[0];
        } catch (error) {
            console.error('Error fetching country details:', error);
            throw error;
        }
    },

    // Buscar países por nome
    searchCountries: async (name) => {
        try {
            const response = await fetch(`${BASE_URL}/name/${name}?fields=name,flags,cca3`);
            if (!response.ok) {
                throw new Error('Failed to search countries');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching countries:', error);
            throw error;
        }
    }
};
