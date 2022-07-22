import Arweave from 'arweave';

export const initialize = () => {
    return Arweave.init({
        host: import.meta.env.VITE_ARWEAVE_HOST || 'localhost',
        port: !import.meta.env.VITE_ARWEAVE_PORT
            ? 1984
            : parseInt(import.meta.env.VITE_ARWEAVE_PORT, 10),
        protocol: import.meta.env.VITE_ARWEAVE_PROTOCOL || 'http',
    });
};

