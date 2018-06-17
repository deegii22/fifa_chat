import {User} from './user';
import {Action} from './action';

export class Message {
    from?: User;
    content?: any;
    action?: Action;
}

