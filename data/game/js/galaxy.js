$(function() {

    var z = 55;
    var z_min = 55;
    var z_max = 100;
    var delta = 15;

    $("#galaxy").iviewer({
	src : "game/img/galaxy.jpg",
	ui_disabled : true,
	zoom : z,
	zoom_max : z_max,
	zoom_min : z_min
    });

    $(".iviewer_zoom_in").click(function() {
	z += delta;
	if (z > z_max)
	    z = z_max;
	$("#galaxy").iviewer('set_zoom', z);
    });

    $(".iviewer_zoom_out").click(function() {
	z -= delta;
	if (z < z_min)
	    z = z_min;
	$("#galaxy").iviewer('set_zoom', z);
    });

    $(".iviewer_zoom_zero").click(function() {
	z = z_max;
	$("#galaxy").iviewer('set_zoom', z);
    });

    $(".iviewer_zoom_fit").click(function() {
	z = z_min;
	$("#galaxy").iviewer('set_zoom', z);
    });
});