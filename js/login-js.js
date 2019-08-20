$(function(){
    $("#rememberpwd").click(function() {
        $("input[name=rememberpwd]").parent().removeClass().addClass('auto-login-c');
        $("input[name=rememberpwd]:checked").parent().removeClass().addClass('auto-login-cd');
    });
});

