// src/hooks/useProductLookup.js
import { useState, useEffect } from 'react';
import productsData from '../data/products';

const useProductLookup = (barcode) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                // Simulate an asynchronous operation
                await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay

                const foundProduct = productsData.find(item => item.barcode === barcode);
                setProduct(foundProduct ? foundProduct.product : null);
            } catch (err) {
                setError('Error fetching product data');
            } finally {
                setLoading(false);
            }
        };

        if (barcode) {
            fetchProduct();
        }
    }, [barcode]);

    return { product, loading, error };
};

export default useProductLookup;
