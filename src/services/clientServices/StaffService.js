import axios from 'axios';
import {api} from '../../constants/urls';

class StaffService {

    constructor() {
        this.service = axios.create({
            baseURL: api.staffurl + '/staff'
        })
    }

    getAll() {
        return this.service.get('/all');
    }

    addStaff(user) {
        return this.service.post('/add', user);
    }

}

export default new StaffService();