import axios from 'axios';
import { api } from '../../constants/urls';

class BookingService {

    constructor() {
        this.service = axios.create({
            baseURL: api.staffurl + '/booking',
        })
    }

    getAll() {
        return this.service.get('/all');
    }

    addBooking(booking, staffId) {
        return this.service.post('/add?id=' + staffId, booking);
    }

    deleteBooking(id) {
        return this.service.delete('/delete?id=' + id);
    }

    getBookingsFromMonthAndId(month, id) {
        return this.service.get('/from-month-id?month=' + month + '&id=' + id);
    }
}

export default new BookingService();