import axios from 'axios';
import {api} from '../../constants/urls';

class BookingService {

    constructor() {
        this.service = axios.create({
            baseURL: api.staffurl + '/booking'
        })
    }

    getAll() {
        return this.service.get('/all');
    }

    addBooking(user,id) {
        return this.service.post('/add?id='+id, user);
    }

    deleteBooking(id){
        return this.service.delete('/delete?id='+id)
    }
}

export default new BookingService();