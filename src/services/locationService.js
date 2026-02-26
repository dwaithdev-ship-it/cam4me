import api from './api';

export const locationService = {
    getLocationTree: async () => {
        const response = await api.get('/locations/tree');
        return response.data;
    },
    getStates: async () => {
        const response = await api.get('/locations/states');
        return response.data;
    },
    getDistricts: async (stateId) => {
        const response = await api.get(`/locations/districts/${stateId}`);
        return response.data;
    },
    getConstituencies: async (districtId) => {
        const response = await api.get(`/locations/constituencies/${districtId}`);
        return response.data;
    },
    getMandals: async (constituencyId) => {
        const response = await api.get(`/locations/mandals/${constituencyId}`);
        return response.data;
    },
    getVillages: async (mandalId) => {
        const response = await api.get(`/locations/villages/${mandalId}`);
        return response.data;
    }
};
