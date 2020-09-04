App={
    init: async function() {
        var contenido=$('#pruebas21');
        contenido.append('<p>Hola Ethereum</p>');
        return 1;
    }
};
$(function() {
    $(window).load(function() {
        App.init();
    });
});
    


