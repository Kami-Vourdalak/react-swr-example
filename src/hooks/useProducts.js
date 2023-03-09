import useSWR, {mutate} from "swr";
import axios from "axios";

const endpoint = '/products'
function fetcher(url) {
    return axios.get(url).then(res => res.data);
}

async function _addProduct(product, products) {
    let response = await axios.post(endpoint, product);
    return [...products, response.data];
}

async function _deleteProduct(products, productId) {
    await axios.delete(`${endpoint}/${productId}`);
    return products.filter(product => product.id !== productId);
}

export function useProducts() {
    const { data, error, mutate } = useSWR(endpoint, fetcher, { dedupingInterval: 2000 });
    return {
        products: data,
        isLoading: !data && !error,
        isError: !!error,
        mutate
    };
}

export async function addProduct(products, product) {
    return mutate(
        endpoint,
        async () => await _addProduct(product, products)
        , {
            optimisticData: [...products, product],
            rollbackOnError: true,
            revalidate: false
        }
    );
}

export async function deleteProduct(products, product) {
    return mutate(
        endpoint,
        async () => await _deleteProduct(products, product.id)
        , {
            // optimisticData: products.filter(_product => _product.id !== product.id),
            rollbackOnError: true,
            revalidate: false
        }
    );
}
