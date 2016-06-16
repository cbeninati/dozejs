import {DozeAJAX} from './DozeAJAX';

$(document).on('click', '.dz-show', function (event) {
    DozeAJAX.View(this, event);
});

$(document).on('click', '.dz-cancel', function (event) {
    DozeAJAX.View(this, event);
});

$(document).on('click', '.dz-edit', function (event) {
    DozeAJAX.Edit(this, event);
});

$(document).on('click', '.dz-new', function (event) {
    DozeAJAX.New(this, event);
});

$(document).on('submit', '.dz-update', function(event) {
    DozeAJAX.Update(this, event);
});

$(document).on('submit', '.dz-create', function (event) {
    DozeAJAX.Create(this, event);
});

$(document).on('click', '.dz-delete', function (event) {
    DozeAJAX.Delete(this, event);
});