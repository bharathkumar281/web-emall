import axios from 'axios';
import {api} from '../../constants/urls';

class AdminService {

    constructor() {
        this.service = axios.create({
            baseURL: api.mgmturl + '/admin'
        })
    }

    getAll() {
        return this.service.get('/all');
    }

    addAdmins(user) {
        return this.service.post('/add', user);
    }

}

export default new AdminService();