import axios from 'axios';
import { api } from '../../constants/urls';

class MallService {

    constructor() {
        this.service = axios.create({
            baseURL: api.mgmturl + '/mall'
        })
    }

    getAll() {
        return this.service.get('/all');
    }

    addMall(mall, adminId) {
        return this.service.post('/add?id=' + adminId, mall);
    }

}

export default new MallService();