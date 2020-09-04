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
    frmTodasF: function(){
        var divFact=$('#agregarFacturas');
        divFact.hide();
        var facturaEncontrada=$('#block');
        try{
                facturaEncontrada.show();
                var imprimirResultados=$('#block');
                imprimirResultados.html('');
                imprimirResultados.show();
                var i;
                for(  i=1;i<App.facturasTotales;i++){
                    
                        getDataQ(i);
                }
        }catch(Exception){
            facturaEncontrada.hide();
        }
    },
    
    frmUnaF: function(){
        var divFact=$('#agregarFacturas');
        divFact.html('<p>Numero de factura a buscar: <input type="text" id="numFact"></p><button type="button" onclick="App.BuscarUna()">Buscar</button>');
    },
    BuscarUna: function(){
        var numero=$('#numFact').val();
        var facturaEncontrada=$('#block');
        try{
        if(parseInt(numero)!==NaN && App.facturasTotales>=numero){
            facturaEncontrada.show();
            App.contracts.Facturas.deployed().then(function(instancia){
                var instanciaFactura =instancia;
                return instanciaFactura.getFactura(App.account,numero, {
                    from: App.account,
                    gas: 500000
                }).then(function(numFact){
                    var imprimirResultados=$('#block');
                    imprimirResultados.show();
                    //imprimirREsultados.html('Address Cliente: ' +facturasss);
                    imprimirResultados.html('<br>Producto: '+ numFact[0]+'<br>Fecha: '+numFact[1] +'<br>Costo: '+numFact[2]+'<br>Cantidad: '+ numFact[3]);
                });
            });
        }else{
            facturaEncontrada.hide();
        }
    }catch(Exception){
        facturaEncontrada.hide();
    }
        //facturaEncontrada.append('\nNumero'+parseInt(numero));
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
        App.contracts.Facturas.deployed().then(function(instancia){
            var instanciaFacturas =instancia;
            return instanciaFacturas.getNumFactura(App.account, {
                from: App.account,
                gas: 500000
            }).then(function(numFact){
                var imprimirResultados=$('#block');
                App.facturasTotales=numFact;
                imprimirResultados.append('\nNum facturas ='+ numFact.toNumber());
            });
        });
        //esta instancia es para guardar todo el objeto que nos devuelve la variable contracts.Facturas.deployed() para asi poder interactuar con el, cabe destacar que el parerntesis hace una diferencia en la salida
        /*var instanciaFacturas;
        App.contracts.Facturas.deployed().then(function(instance){
            instanciaFacturas=instance;
            //Aqui ejecutamos un metodo que en mi caso es completamente de prueba para verificar el correcto funcionamiento de la dapp
            return instanciaFacturas.getPrueba();
        }).then(function(countPrueba){
            //Aqui podemos ver como la s
            console.log('Prueba',countPrueba.toNumber());
            var imprimirResultado=$('#block');
            imprimirResultado.empty();
            var templateDePrueba='<h1>Esto es una prueba</h1>'+ '<h2>'+countPrueba.toNumber()+'</h2>';
            imprimirResultado.append(templateDePrueba);

        });*/


        /*App.contracts.Facturas.deployed().then(function(instancia){
            var instanciaFacturas =instancia;
            return instanciaFacturas.addFactura(App.account,"0x01","0x01","0x01","0x02", {
                from: App.account,
                gas: 500000
            }).then(function(numFact){
                var imprimirResultados=$('#block');
                imprimirResultados.append('\nHecho');
            });
        });
        App.contracts.Facturas.deployed().then(function(instancia){
            var instanciaFacturas =instancia;
            return instanciaFacturas.getFactura(App.account,5, {
                from: App.account,
                gas: 500000
            }).then(function(numFact){
                var imprimirResultados=$('#block');
                imprimirResultados.append('\nFactura total ='+ numFact);
            });
        });*/
        //(address _cliente,bytes32 _producto,uint _fecha, uint _costo,uint _cantidad)
        // App.contracts.Facturas.deployed().then(function(instance){
        //     instanciaFacturas=instance;
        //     return instanciaFacturas.getNumFactura(App.addComprador,{
        //         from: App.addComprador, 
        //         gas: 500000
        //     });
        // });
    } 
};
$(function() {
    $(window).load(function() {
        App.init();
    });
});

function getDataQ(i) {
    App.contracts.Facturas.deployed().then(function(instancia){
        var instanciaFactura =instancia;
    var imprimirResultados=$('#block');
    instanciaFactura.getFactura(App.account,i, {
        from: App.account,
        gas: 500000
    }).then(function(numFact){
        console.log(i);
        imprimirResultados.append(i);
        var imprimir='<br>Producto: '+ numFact[0]+'<br>Fecha: '+numFact[1] +'<br>Costo: '+numFact[2]+'<br>Cantidad: '+ numFact[3];
        imprimirResultados.append(imprimir);

        if(i > 5){
            return;
        }
        getDataQ(i + i);
    });
});
}
    
 