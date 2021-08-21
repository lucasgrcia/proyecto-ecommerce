//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e) {

 getJSONData(PRODUCTS_URL).then(productos => {
        prodData = productos.data;
        let htmlContentToAppend = '';//string
        for (prod of prodData) {    //for para recorrer el string htmlContentToAppend y colocar los datos de la url en el documento html 
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
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
        document.getElementById('product-list-container').innerHTML = htmlContentToAppend;
    });
});



