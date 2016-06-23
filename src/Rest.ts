import { Route } from './Route';

export class Rest
{
    id: string;
    base_path: string;
    resource_name: string;

    routes: { [name: string]: Route; } = {};

    constructor(resource_name: string, id?: string, base_path = '/')
    {
        this.base_path     = base_path;
        this.resource_name = resource_name;
        this.id = id;

        // @TODO: Handle nested REST resources (eg: '/category/{id}/item/{id}/edit'. - Chad
        this.routes["index"]       = new Route("index",  "GET",      this.base_path + resource_name + "/");
        this.routes["show"]        = new Route("show",   "GET",      this.base_path + resource_name + "/" + this.id);
        this.routes["new"]         = new Route("new",    "GET",      this.base_path + resource_name + "/new");
        this.routes["create"]      = new Route("create", "POST",     this.base_path + resource_name + "/");
        this.routes["edit"]        = new Route("edit",   "GET",      this.base_path + resource_name + "/" + this.id + "/edit");
        this.routes["update"]      = new Route("update", "PUT",      this.base_path + resource_name + "/" + this.id);
        this.routes["delete"]      = new Route("delete", "DELETE",   this.base_path + resource_name + "/" + this.id);
    }

    public GetPath(name :string) : Route {
        return this.GetRouteByName(name, this.id);
    }

    private GetRouteByName(name :string) : Route {
        name                = name.toLowerCase();
        let route :Route    = this.routes[name];

        if(route && this.id) {
            route                       = new Route(route.name, route.method, evaluatedPath);
        }

        return route;
    }
}