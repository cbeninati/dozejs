/// <reference path="../../typings/globals/jquery/index.d.ts" />

import { Route } from './Route';
import { Doze } from './Doze';

export class DozeAJAX
{

    // ====== jQuery DOM selector helpers. ====== //
    public static GetTarget(element: HTMLScriptElement)
    {
        return $(element).find('.dz-target');
    }

    public static GetParent(element: HTMLScriptElement)
    {
        return $(element).parent('.dz-resource');
    }

    // ====== jQuery AJAX helpers. ====== //
    public static Call(route: Route, data = {}, callback: any)
    {
        $.ajax({
            url:        route.path,
            data:       data,
            method:     route.method,
            success:    function (ajax_response) {
                callback(ajax_response);
            }
        });
    }

    public static Dozify(element) {
        let base_url        = $('meta[name=site_url]').attr('content');

        // Get 'Rest/Doze' from parent attributes.
        let parent          = $(element).parents('.dz-resource');

        let resource_name   = parent.data('resource');
        let id              = parent.data('id');
        let parent_resource = parent.data('parent_name');
        let parent_id       = parent.data('parent_id');

        let targets: { [name: string]: HTMLElement; } = {};
        targets['view']     = parent.find('.dz-target_view')[0];
        targets['edit']     = parent.find('.dz-target_edit')[0];
        targets['parent']   = parent;

        return new Doze(base_url, resource_name, id, targets, parent_resource, parent_id);
    }

    public static View(element: HTMLElement, event, force_show: boolean = true)
    {
        event.preventDefault();
        let doze = DozeAJAX.Dozify(element);

        // Get the RESTful path.
        let path = doze.rest.GetPath('show');

        // Call the RESTful path.
        let callback = function(ajax_response) {
            // Remove "edit" view if it exists.
            $(doze.targets['edit']).html('');

            $(doze.targets['view']).html(ajax_response);

            if(force_show) {
                $(doze.targets['view']).show();
            }
        };

        DozeAJAX.Call(path, null, callback);
    }

    public static New(element: HTMLElement, event)
    {
        DozeAJAX.Edit(element, event, 'new');
    }

    public static Edit(element: HTMLElement, event, method: string = 'edit')
    {
        event.preventDefault();
        let doze        = DozeAJAX.Dozify(element);

        // Get the RESTful path.
        let path        = doze.rest.GetPath(method);

        let parameters  = {parent: doze.parent.id};

        // Call the RESTful path.
        let callback = function(ajax_response) {
            // Hide the "show" view.
            $(doze.targets['view']).hide();

            $(doze.targets['edit']).html(ajax_response);
        };

        // Render the "edit" view.
        DozeAJAX.Call(path, parameters, callback);
    }

    public static Delete(element: HTMLElement, event)
    {
        event.preventDefault();
        let doze = DozeAJAX.Dozify(element);

        // Get the RESTful path.
        let path = doze.rest.GetPath('delete');

        // Call the RESTful path.
        let callback = function() {
            $(doze.targets['parent']).remove();
        };

        DozeAJAX.Call(path, null, callback);
    }

    public static Create(element: HTMLElement, event)
    {
        DozeAJAX.Submit(element, event, 'create');
    }

    public static Update(element: HTMLElement, event)
    {
        DozeAJAX.Submit(element, event, 'update');
    }

    public static Submit(element: HTMLElement, event, method: string = 'update')
    {
        event.preventDefault();
        let doze = DozeAJAX.Dozify(element);

        // @TODO: Handle create/update.
        // Get the RESTful path.
        let path = doze.rest.GetPath(method);

        let parameters = $(element).serialize();

        let callback = function(ajax_response) {
            // Remove "edit" view if it exists.
            $(doze.targets['edit']).html('');

            $(doze.targets['view']).html(ajax_response);
            $(doze.targets['view']).show();
        };

        DozeAJAX.Call(path, parameters, callback);
    }

}
