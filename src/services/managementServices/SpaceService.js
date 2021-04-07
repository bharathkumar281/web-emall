import axios from 'axios';
import { api } from '../../constants/urls';

class SpaceService {

    constructor() {
        this.service = axios.create({
            baseURL: api.mgmturl + '/space'
        })
    }

    getAll() {
        return this.service.get('/all');
    }

    addSpace(floorId) {
        return this.service.post('/add?id=' + floorId);
    }

}

export default new SpaceService();