import axios from 'axios';
import { api } from '../../constants/urls';

class FloorService {

    constructor() {
        this.service = axios.create({
            baseURL: api.mgmturl + '/floor'
        })
    }

    getAll() {
        return this.service.get('/all');
    }

    addFloor(mallId) {
        return this.service.post('/add?id=' + mallId);
    }

}

export default new FloorService();