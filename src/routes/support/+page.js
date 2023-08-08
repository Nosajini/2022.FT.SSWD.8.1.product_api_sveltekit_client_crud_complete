// import the products store
import  {getAllsupportTickets, getAllsupportAreas} from '../../stores/supportStore';

// Refresh the store when page loads (optional due to overhead but probably a good idea)
export const load = async ({ fetch }) => {

    // fill the store
    await getAllsupportTickets();
    await getAllsupportAreas();

    return {

    }
}