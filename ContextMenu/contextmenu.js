$(document).ready(function() {
    $('body').contextmenu(function(e) {
        var list = document.getElementsByClassName("rmenu");
        for (var i = 0; i < list.length; i++) {
            $(list[i]).addClass("hide");
            $(list[i]).removeClass("show");
        }
        
        var element = document.elementFromPoint(mouseX(e), mouseY(e));
        var elem = $(`#${element.tagName.toLowerCase()}menu`);
        if (elem[0] === undefined)
            elem = $(`#${element.id.toLowerCase()}menu`);
        if (elem[0] === undefined)
            for (var i = 0; i < element.classList.length; i++) {
                elem = $(`#${element.classList[i]}menu`);
                if (elem[0] !== undefined)
                    break;
            }
        
        if (elem[0] === undefined) {
            return;
        }
        
        var inmenu = elem.parents();
        
        elem.attr("data-linkedsetimagelinkid" , element.getAttribute("data-setimagelinkid"));
        
        elem.removeClass("hide");
        elem.addClass("show");  
        elem.css("top", mouseY(e) + 'px');
        elem.css("left", mouseX(e) + 'px');
        
        evalWithContext(elem.attr('data-onmenuopen'), elem[0]);
        
        e.preventDefault();
    });
});

function evalWithContext(code, context) {
    evval.call(context, code)
}
function evval(code) {
    eval(code);
}

$(document).bind("click", function(event) {
    var list = document.getElementsByClassName("rmenu");
    for (var i = 0; i < list.length; i++) {
        $(list[i]).addClass("hide");
        $(list[i]).removeClass("show");
    }
});

function mouseX(evt) {
    if (evt.pageX) {
        return evt.pageX;
    } else if (evt.clientX) {
       return evt.clientX + (document.documentElement.scrollLeft ?
           document.documentElement.scrollLeft :
           document.body.scrollLeft);
    } else {
        return null;
    }
}

function mouseY(evt) {
    if (evt.pageY) {
        return evt.pageY;
    } else if (evt.clientY) {
       return evt.clientY + (document.documentElement.scrollTop ?
       document.documentElement.scrollTop :
       document.body.scrollTop);
    } else {
        return null;
    }
}