function A_JAX(url, type, nope, data){
    let token = localStorage.getItem('sj-state');
    let authorization;
    if (token != null && token != undefined && token != 'undefined') {
        authorization = {'Authorization': "Bearer " + token};
    } else {
        authorization = {};
    }
    let ajax_;
    ajax_ = $.ajax({
        headers: authorization,
        type: type,
        url: url,
        data: data,
        dataType : "json",
        success: function(res){
        },
        error: function(res){
        }
    });
    return ajax_;
}

function A_JAX_FILE(url, type, nope, data){
    let token = localStorage.getItem('sj-state');
    let authorization;
    if (token != null && token != undefined && token != 'undefined') {
        authorization = {'Authorization': "Bearer " + token};
    } else {
        authorization = {};
    }
    let ajax_;
    ajax_ = $.ajax({
        headers: authorization,
        type: type,
        url: url,
        data: data,
        dataType : "json",
        processData : false,
        contentType : false,
        success: function(res){
        },
        error: function(res){
        }
    });
    return ajax_;
}