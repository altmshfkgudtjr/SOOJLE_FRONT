function A_JAX(url, type, token, data){
    var ajax_;
    ajax_ = $.ajax({
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

function A_JAX_FILE(url, type, token, data){
    var ajax_;
    ajax_ = $.ajax({
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