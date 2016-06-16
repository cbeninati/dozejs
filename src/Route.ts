export class Route
{
    name:   string;
    method: string;
    path:   string;

    constructor(name: string, method: string, path: string)
    {
        this.name   = name;
        this.method = method;
        this.path   = path;
    }
}