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

    addSpace(space, floorId) {
        return this.service.post('/add?id=' + floorId, space);
    }

}

export default new SpaceService();