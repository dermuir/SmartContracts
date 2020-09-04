App ={
    web3Provider: null,
    contracts: {},

    init: async function(){
        //Codigo que se ejecutara al iniciar
        //Regresamos la pantalla de metamask que preguntara si quieres dar tu cuenta 
        var cantFactu=$('#cantidadFacturas');
        cantFactu.append('facturas totales: ');
        return await App.initWeb3();
    },
    //Hacer coneccion con metamask
    initWeb3: async function(){
        //SI cuenta con una wallet
        var mostrar=$('#mostrar');
        

        if(window.ethereum){
            App.web3Provider=window.ethereum;
            try{
                mostrar.append('M1');
                await window.ethereum.enable();
                mostrar.append('M2');
            }catch(error){
                console.error("Usuario no permitio la accion")
                mostrar.append('M3');
            }
        }else{
            //Si no cuenta con un administrador de ethereum le asignamos uno de nuestro Ganache-cli
            App.web3Provider=new web3.providers.HttpProvider('http://localhsot:8545');
        }
        web3=new Web3(App.web3Provider);
        mostrar.append('Marco: ');
        return App.initContract();
    },
    //Metodo para instanciar nuestro contrato
    initContract:function(){
        //en este json que se encuentra en la carpeta build contracts se encuentra el abi de los contratos que hemos compilado 
        $.getJSON('Facturas.json',function(data){
            var FacturasArtifact=data;
            //hacemos referencia a nuestro contrato
            App.contracts.Facturas=TruffleContract(FacturasArtifact);
            //La propiedad que establecimos en initWeb3 la implementamos como el proovedor de nuestro contrato
            App.contracts.Facturas.setProvider(App.web3Provider);
            return App.obtenerTodasFacturas();
        });

    },
    obtenerTodasFacturas: function(){
        var instanciaFactura;   
        App.contracts.Facturas.deployed().then(function(instance){
            instanciaFacturas=instance;
            return instanciaFacturas.getNumFactura("0xcbf1350f9b2167aff6638c34decb380ce1aff546",{from: App.web3Provider});
        }).then(function(facturas){
            var cantFactur=$('#cantidadFacturas');
            cantFactur.append('123');
            cantFactur.append(facturas);
        }).catch(function(err){
            console.log(err.message);
        });
    }

};
$(function(){
    $(window).load(function(){
        App.init();
    });
});
