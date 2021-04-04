import axios from 'axios';
import { api } from '../../constants/urls';

class AdminService {

    constructor() {
        this.service = axios.create({
            baseURL: api.mgmturl + '/admin'
        })
    }

    getAll() {
        return this.service.get('/all');
    }

    addAdmin(admin) {
        return this.service.post('/add', admin);
    }

    getAdmin(id) {
        return this.service.get('/get?id=' + id);
    }

    login(user) {
        return this.service.post('/login', user);
    }

}

export default new AdminService();