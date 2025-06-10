import { useState, useEffect } from 'react';
import { countriesApi } from '../services/countriesApi';

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await countriesApi.getAllCountries();
      setCountries(data.sort((a, b) => a.name.common.localeCompare(b.name.common)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchCountries = async (searchTerm) => {
    if (!searchTerm.trim()) {
      fetchCountries();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await countriesApi.searchCountries(searchTerm);
      setCountries(data.sort((a, b) => a.name.common.localeCompare(b.name.common)));
    } catch (err) {
      setError(err.message);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return {
    countries,
    loading,
    error,
    searchCountries,
    refetch: fetchCountries
  };
};
