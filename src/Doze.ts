import { Rest } from './Rest';

export class Doze
{
    public targets: { [name: string]: HTMLElement; } = {};
    public id:      string;

    public rest:    Rest;
    public parent:  Rest;

    public base_path: string;

    constructor(
        base_url:   string,
        resource:   string,
        id:         string = null,
        targets:    {[name: string]: HTMLElement; },
        parent?:    string,
        parent_id?: string
    )
    {
        this.base_path  = base_url;

        this.id         = id;
        this.targets    = targets;

        this.rest       = new Rest(resource, id, base_url);

        if(parent && parent_id) {
            this.parent = new Rest(parent, parent_id, base_url);
        }
    }

}