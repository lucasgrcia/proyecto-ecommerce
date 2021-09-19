const PRECIO_ALTO = 0; //Declaro las constantes de los precios y relevancia
const PRECIO_BAJO = 1;
const RELEVANTES = 2;

var listOfProducts = []; //Arrays vacios
var prod_Original = [];

var minCount = NaN; //not a number
var maxCount = NaN; //not a number
var current = PRECIO_ALTO // declaro la variable que va actualmente
var rel = undefined;
//_________________________________________________________________________________________________________________________
document.addEventListener("DOMContentLoaded", function(e) { //Funcion que se ejecuta cuando carga el documento, obtengo datos del JSON y 
    //clasifica y muestra la lista

    // Agregado entrega 2
    getJSONData(PRODUCTS_URL).then(resultObj => {
        if (resultObj.status === "ok") {
            prod_Original = resultObj.data;
            listOfProducts = prod_Original;
            sortList(current, listOfProducts);
            showList(listOfProducts);
        }
    });

    //TAREA 2
    //Botones de orden
   $('#mayorPrecio').click(function() { //id.click haciendo uso de jquery para la funcion
        current = PRECIO_ALTO;  //
        sortList(PRECIO_ALTO, listOfProducts);// si doy click aparece de Mayor a Menor precio
        showList(listOfProducts);
    });

   $('#menorPrecio').click(function() {
        current = PRECIO_BAJO;
        sortList(PRECIO_BAJO, listOfProducts);
        showList(listOfProducts);
    });

   $('#mayorRelevancia').click(function() {
        current = RELEVANTES;
        sortList(RELEVANTES, listOfProducts);
        showList(listOfProducts);
    });

    // Botones de filtrado

   $('#filter').click(function() {
        minCount = parseInt($('#rangeFilterMin').val());
        maxCount = parseInt($('#rangeFilterMax').val());
        sortList(current, listOfProducts);
        showList(listOfProducts);
    }); //fin click.
    
   $('#clear').click(function() {
        $('#rangeFilterMin').val('');
        $('#rangeFilterMax').val('');
        maxCount = NaN;
        minCount = NaN;
        listOfProducts = prod_Original;
        sortList(current, listOfProducts);
        showList(listOfProducts);
    });
     //Buscador
     $('#buscar').keyup(function() {
        let inputSearch = $('#buscar').val().toLowerCase();
        console.log(inputSearch);
        if (inputSearch !== '') {
            r = new RegExp(inputSearch.replaceAll(/\s/g, '\\s'));
        } else {
            r = undefined;
        }
        console.log(r);
        showList(listaProductos);
    });
    //boton para limpiar busqueda
    $('#clearSearch').click(function() {
        $('#buscar').val('');
        r = undefined;
        showList(listaProductos);
    });
    
    // EVENTO PARA BUSCAR UNA PALABRA RELACIONADA CON EL NOMBRE O LA DESCRIPCION
    document.getElementById("search").addEventListener("input", function() {

        searchedWord = document.getElementById("input-search-word").value.toLowerCase();

        showProducts(currentProductsArray);
    });

    // EVENTO PARA LIMPIAR LA PALABRA BUSCADA
    document.getElementById("clearSearch").addEventListener("click", function () {
        
        document.getElementById("input-search-word").value = "";

        searchedWord = undefined;

        showProducts(currentProductsArray);
    })
    
});
//____________________________________________________________________________________________________________________________
// Funcion creada en entrega 2, codigo de entrega1
function showList(prodData) {
    let htmlContentToAppend = '';
    let filtro = isNaN(minCount) && isNaN(maxCount);
    for (prod of prodData) {
        //filtro dependiendo precio inspirado en categorias... tarea 2
        if ((rel === undefined || rel.test(prod.name.toLowerCase()) || rel.test(prod.description.toLowerCase())) && (filtro || (!filtro && ((prod.cost >= minCount && prod.cost <= maxCount) || (isNaN(minCount) && prod.cost <= maxCount) || (isNaN(maxCount) && prod.cost >= minCount))))) {
            htmlContentToAppend += `    
            <a href="product-info.html" class="list-group-item list-group-item-action producto" id="${prod.name}">
                <div class="row">
                    <div class="col-3">
                        <img src="` + prod.imgSrc + `" alt="` + prod.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + prod.name + `</h4>
                            <small class="text-muted">` + prod.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + prod.description + `</p>
                        <p class="mb-1 precio">` + prod.currency + ` ` + prod.cost + `</p>      
                    </div>
                </div>
            </a>
            `
        }
    }
    document.getElementById('product-list-container').innerHTML = htmlContentToAppend;
}
//__________________________________________________________________________________________________________________________________________
function sortList(criterio, productos) { //Funcion que clasifica la lista con dos parametros productos y criterio
    switch (criterio) {
        case  PRECIO_ALTO: //Uso del switch para ordenar mejor la expresión // Visto en curso de Udemy Victor Robles y Developer Mozilla
            productos.sort((a, b) => {
                if (a.cost > b.cost) { return -1; } // declaracion del resultado de expresión coincide con el valor en esta instancia
                if (a.cost < b.cost) { return 1; }
                return 0;
            });
            break; //termina la instancia y continua a la siguiente
        case PRECIO_BAJO:
            productos.sort((a, b) => {
                if (a.cost > b.cost) { return 1; }
                if (a.cost < b.cost) { return -1; }
                return 0;
            });
            break;
        case RELEVANTES:
            productos.sort((a, b) => {
                if (a.soldCount > b.soldCount) { return -1; }
                if (a.soldCount < b.soldCount) { return 1; }
                return 0;
            });
            break;
    }
}






//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

