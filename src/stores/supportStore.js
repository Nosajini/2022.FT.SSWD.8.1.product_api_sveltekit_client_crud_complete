import { writable } from 'svelte/store';


// .env variables starting with VITE_ are accessible client and server side 
const base_url = import.meta.env.VITE_API_BASE_URL

// declare writable stores for supportTickets and supportAreas
export let supportTickets = writable([]);
export let supportAreas = writable([]);


//
// Used to Initialise  requests
// parameters: http method and body content note default values)
const initRequest = (http_method = 'GET', body_data = '') => {

    let request = {
        method: http_method,
        //credentials: 'include',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            //,"Authorization": "Bearer " + getAccessToken()
        },
        mode: 'cors',
        cache: 'default',
    };

    if (body_data) {
        request.body = body_data;
    }

    return request;
};


// Function to fetch and return data from an API
// Full URI based on base_url + endpoint
const getAPIData = async (endpoint = '', request = initRequest()) => {
    try {
        const response = await fetch(`${base_url}${endpoint}`, request);
        const data = await response.json();
        console.log(data);
        return data;

    } catch (err) {
        console.log('API error (store) ', err.message);
    } finally {
        
    }
};

// Function to get all supportTickets from the api
// sets the supportTickets store
export const getAllsupportTickets = async () => {

    const data = await getAPIData('/support');
    supportTickets.set(data);
};

// Function to get all supportAreas from the api
// sets the supportAreas store
export const getAllsupportAreas= async () => {

    const data = await getAPIData('/supportarea');
    supportAreas.set(data);     

};


// Function to get supportTickets in a category (by category id)
// sets the supportTickets store
export const getsupportTicketsByArea= async (area_id = 0) => {

    // 
    if (area_id > 0) {
        const data = await getAPIData(`/support/byarea/${area_id}`);
        supportAreas.set(data);
    }

};

export const addNewSupportTicket= async (support = '') => {

    if (support) {
        const request = initRequest('POST', support);
        const result = await getAPIData('/support', request);
        getAllsupportTickets();

        return result;
    } else {
        console.log('Store: Add new Support Ticket failed: missing support ticket');
    }
}