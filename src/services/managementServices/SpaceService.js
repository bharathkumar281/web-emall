import axios from 'axios';
import {api} from '../../constants/urls';

class SpaceService {

    constructor() {
        this.service = axios.create({
            baseURL: api.mgmturl + '/space'
        })
    }

    getAll() {
        return this.service.get('/all');
    }

    addSpace(user,id) {
        return this.service.post('/add?id='+id, user);
    }

}

export default new SpaceService();