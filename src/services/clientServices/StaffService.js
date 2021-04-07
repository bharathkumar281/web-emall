import axios from 'axios';
import { api } from '../../constants/urls';

class StaffService {

    constructor() {
        this.service = axios.create({
            baseURL: api.staffurl + '/staff'
        })
    }

    getAll() {
        return this.service.get('/all');
    }

    addStaff(staff) {
        return this.service.post('/add', staff);
    }

    login(staff) {
        return this.service.post('/login', staff);
    }

    getStaffFromMallId(mallId) {
        return this.service.get('/from-mall?id=' + mallId);
    }

}

export default new StaffService();