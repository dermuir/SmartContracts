App={
    //variables de entrada de nuestro modulo js
    web3Provider: null,
    contracts: {},
    account: '0x0',
    loading: false,
    addComprador: '0x0',
    producto: '0x0',
    fechaCompra: '0x0',
    costo: '0x0',
    cantidad: '0x0',
    facturasTotales: '0',
    //funcion para inicializar cualquier valor estatico se puede colocar aqui
    init: function() {
        return App.initWeb3();
    },
    //Verificamos que cuente con algun intermediario como metamask para utilizar su address
    initWeb3: function(){
        //como el objeto web3 por defecto esta null o undefined si no cuenta con el intermediario se quedara asi pero cuando ya tienes un intermediario se crean todas sus propiedades como objeto
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        //siempre es posible que no cuente con un intermediario por lo tal se le podria asignar una address de ganache-cli falta comprobar el debido funcionamiento de esta parte
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
            //App.web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/c0cc50eb813248fe869e2ef0a91e54da');
            web3 = new Web3(App.web3Provider);
        }
        return App.initContract();
    },
    initContract: function(){
        //este JSON cuenta con el abi del contrato y se genera cada vez que migramos nuestro contrato a la red
        $.getJSON("build/contracts/Facturas.json", function(factura){
            var parametro =factura;
            //El metodo TruffleCOntract es para castear el contrato y usarlo como variable local, algo importante a destacar es tener importada la libreria de truffle-contract.js 
            App.contracts.Facturas=TruffleContract(parametro);
            App.contracts.Facturas.setProvider(App.web3Provider);
            return App.render();
        });
        
    },
    //Esta funcionn se despliega cuando intentamos ver todas las facturas 
    frmTodasF: function(){
        var divFact=$('#agregarFacturas');
        divFact.hide();
        var facturaEncontrada=$('#block');
        try{
            //aqui agregamos el resultado de ver todas las facturas que desplegamos en la red y lo agregamos a la etiqueta block
                facturaEncontrada.show();
                var imprimirResultados=$('#block');
                imprimirResultados.html('');
                imprimirResultados.show();
                var i;
                for(  i=1;i<=App.facturasTotales;i++){
                    getDataQ(i);
                }
        }catch(Exception){
            facturaEncontrada.hide();
        }
    },
    //Aqui desplegamos el campo para buscar una factura en especifico
    frmUnaF: function(){
        verTotalDataQ();
        var divFact=$('#agregarFacturas');
        divFact.show();
        divFact.html('<p>Numero de factura a buscar: <input type="text" id="numFact"></p><button type="button" onclick="App.BuscarUna()">Buscar</button>');
        var bloque=$('#block');
        bloque.html('');
    },
    //aqui ahora si buscamos la factura con el id dado
    BuscarUna: function(){
        var numero=$('#numFact').val();
        var facturaEncontrada=$('#block');
        try{
            if(parseInt(numero)!==NaN && App.facturasTotales>=parseInt(numero)){
                facturaEncontrada.show();
                facturaEncontrada.html('');
                getDataQ(parseInt(numero));
                
            }else{
                facturaEncontrada.hide();
            }
        }catch(Exception){
            facturaEncontrada.hide();
        }
    },
    //Aqui agregamos los campos necesarios para agregar una factura a la red
    frmAddF: function(){
        var divFact=$('#agregarFacturas');
        divFact.show();
        divFact.html(
        '<p>Producto a agregar: <input type="text" id="productoF"></p>'
        +'<p>Fecha: <input type="text" id="fechaF"></p>'
        +'<p>Costo: <input type="text" id="costoF"></p>'
        +'<p>Cantidad: <input type="text" id="cantF"></p>'
        +'<button type="button" onclick="App.AddFact()">Agregar</button>');
        var bloque=$('#block');
        bloque.html('');
    },
    //Una ves llenados los campos se obtienen los valores y se crea una nueva transaccion en la red
    AddFact: function(){
        var producto=$('#productoF').val();
        var fecha=$('#fechaF').val();
        var costo=$('#costoF').val();
        var cantidad=$('#cantF').val();
        addDataQ(producto,fecha,parseInt(costo),parseInt(cantidad));
    },

    render: function(){
        //var contenido=$('#block');
        /*var pruebasas=$('#pruebas21');
        if(web3.isConnected){
            pruebasas.append('\nnodo conectado');
        }else{
            pruebasas.append('\nno estas conectado a un nodo');
        }*/
        var titulo=$('#titulo');
        //contenido.show();titulo.show();
        //aqui obtenemos la cuenta del usuario con el metodo getCoinbase el cual nos retornara una address (la de metamask en mi caso)
        web3.eth.getCoinbase(function(err, account) {
            var  btnP= $('#botonesPrincipales');
            if (err === null) {
              App.account = account;
              titulo.append('<h2>Cuenta Actual:</h2><p>' + App.account+'</p>');
              if(App.account!==null){
                  btnP.show();
                }else{
                    btnP.hide();
                }
            }else{
                btnP.hide();
            }
        });
        //Aqui agregamos el numero total de facturas para que el usuario sepa de antemano cuales puede buscar
        verTotalDataQ();
    } 
};
//Esta es la funcion inicial que concatena todas las demas con la funcion init
$(function() {
    $(window).load(function() {
        App.init();
    });
});
//Aqui obtenemos un registro especifico de la red la cual como es un metodo view no consume gas por lo tanto es gratis ejecutarlo
function getDataQ(i) {
    //Aqui llamamos al contrato deployado para generar una variable instancia y poder trabajar con el
    App.contracts.Facturas.deployed().then(function(instancia){
        //Aqui asignamos a una variable la instancia para poder llamar a sus metodos 
        var instanciaFactura =instancia;
        var imprimirResultados=$('#block');
        //Aqui llamamos al metodo del contrato que se llama getFactura(tiene solo 2 parametros pero enviamos el msg.sender como from y el gas)
        instanciaFactura.getFactura(App.account,i, {
            from: App.account,
            gas: 500000
        }).then(function(numFact){
            //como es una promesa puede cambiar el tiempo de procesar por lo tanto puede ser que primero cargue la factura 5 y despues una 2 
            var prod;
            try{
                //Como guardo el dato de producto como un bytes32 es posible convertirlo a texto otra vez por eso agrego esta linea
                prod=web3.toAscii(numFact[0]);
            }catch(Exception){
                prod=numFact[0];
            }
            var imprimir='<br>Factura#: '+i+'<br>Producto: '+prod
            +'<br>Fecha: '+numFact[1] 
            +'<br>Costo: '+numFact[2]
            +'<br>Cantidad: '+ numFact[3]+'<br>';
            imprimirResultados.append(imprimir);
        });
    });
};
//Este metodo agrega los datos a la red de ropsten
function addDataQ(producto,fecha,costo,cantidad){
    App.contracts.Facturas.deployed().then(function(instancia){
        var instanciaFacturas =instancia;
        return instanciaFacturas.addFactura(App.account,producto,fecha,costo,cantidad, {
            from: App.account,
            gas: 500000
        }).then(function(nomFact){
            //Como el tiempo para que se termine de agregar es variante asi como las transacciones que tienen que pasar preferi mostrarlo con un alert
            window.alert("TRANSACCION EJECUTADA CORRECTAMENTE!!");
        });
    });
};
//Aqui solo ejecuto un metodo para traer el numero total de facturas y guardarlo en una variable local, esto tambien podria ser un evento pero necesitarias cambiar el contrato
function verTotalDataQ(){
    App.contracts.Facturas.deployed().then(function(instancia){
        var instanciaFacturas =instancia;
        return instanciaFacturas.getNumFactura(App.account, {
            from: App.account,
            gas: 500000
        }).then(function(numFact){
            var imprimirResultados=$('#cantidadFacturas');
            App.facturasTotales=numFact;
            imprimirResultados.html('\nNum facturas ='+ numFact.toNumber());
        });
    });
}
    
 