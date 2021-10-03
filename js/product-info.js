//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    let data = undefined;
    let prods = undefined;
    let prodComments = undefined;

    getJSONData(PRODUCT_INFO_URL).then(resul => {
        if (resul.status === "ok") { //Obtengo jSON de info producto
            data = resul.data;

            getJSONData(PRODUCTS_URL).then(resul2 => {
                if (resul2.status === "ok") { //Obtengo JSON de productos relacionados
                    prods = resul2.data;

                    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(resul3 => { 
                        if (resul3.status === "ok") {  // Comentarios usuarios
                            prodComments = resul3.data;
                            show(data, prodComments, prods);
                            // Si cargan todos los JSON...

                            //si doy click a una estrella agrega como checked sino remueve
                            $('.rating').click(function () {
                                let index = $(this).attr('id');
                                $('.selected').removeClass('selected');
                                $(this).addClass('selected');
                                $('.rating').each(function () {
                                    if ($(this).attr('id') <= index) {
                                        $(this).addClass('checked');
                                    } else {
                                        $(this).removeClass('checked')
                                    }
                                });
                            });
                            // Boton de comentar
                            $('#btnComentar').click(function () {
                                let usrComment = $('#userComment').val();
                                if (usrComment === '') {  //si el comentario esta
                                    $('#warning').html('No puedes enviar un comentario vacío.');
                                } else {
                                    $('#warning').html('');
                                    comentar(sessionStorage.getItem('user'), $('.selected').attr('id')[1], usrComment, new Date());
                                    $('#userComment').val('');
                                }
                            });


                            $('.secondary').click(function () {
                                let aux = $('.principal').attr('src');
                                $('.principal').attr('src', $(this).attr('src'))
                                $(this).attr('src', aux);
                            });

                            //Fin get
                        }
                    });
                }
            });
        }
    });

});

function show(info, prodComments, prods) {

    let img = ``;
    for (let i = 1; i < info.images.length; i++) {
        img += `<img src="${info.images[i]}" class="secondary">`
    }
    //Entrega 4!!
    let prodRelated = ``;
    for (let i = 0; i < info.relatedProducts.length; i++) {  //Agrego los productos relacionados 
        prodRelated += `
         <div class="col-sm-4">
                 <div class="card">
                     <a class="card-link" href="#">
                         <img class="card-img-top" src="${prods[info.relatedProducts[i]].imgSrc}" alt="Card image cap">
                         <div class="card-body">
                             <h5 class="card-title">${prods[info.relatedProducts[i]].name}</h5>
                             <p class="card-text">${prods[info.relatedProducts[i]].description}</p>
                             <p class="card-text">${prods[info.relatedProducts[i]].currency} ${prods[info.relatedProducts[i]].cost}</p>
                         </div>
                     </a>
                 </div>
             </div>
         `
    }
    let comments = ``;
    cmtUsers = sessionStorage.getItem('comments');// obtengo el item comentario
    console.log(cmtUsers);
    if (cmtUsers !== null) {
        prodComments = prodComments.concat(JSON.parse(cmtUsers)); //transformo
    }
    for (com of prodComments) { //agrego los comentarios, rating , fecha
        comments += `
        <div class="col-sm-12 mt-3 comment">
        <div class="row">
          <div class="col-sm-4">
          <p class="nameUsuario ml-3">${com.user}</p> <!--Nombre de usuario-->
          </div>
          <div class="col-sm-4 text-left">
            <p class="rating">${stars(com.score)}</p>   <!--Estrellas de los usuarios-->
          </div>
          <div class="col-sm-4 text-right">
            <p>${(new Date(com.dateTime)).toLocaleDateString()}</p> <!--Fechas-->
          </div>
          </div> 
          <hr class="mt-0">
          <p>${com.description}</p> <!--Comentarios de los usuario-->
        </div>
        `
    }
    let html = `
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="${info.images[0]}" class="d-block w-100" alt="">
        </div>
        <div class="carousel-item">
          <img src="${img}">
        </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
            <div class="col-xs-7 col-lg-6">
                <div class="row">
                    <div class="col p-1">
                        <h2 class="name">${info.name}</h2>  <!--Nombre del producto-->
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col p-1">
                        <p class="desc">${info.description}</p>  <!--Descripcion del Auto-->
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <p class="precio">${info.currency} ${info.cost}</p>   <!--Precio del Vehiculo-->
                    </div>
                    <div class="col-sm-6"></div>
                    <div class="col-sm-3">
                        <button class="comprar">Comprar</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <p class="soldCount">Vendidos: ${info.soldCount}</p>
                        <button href="products.html" class="category">${info.category}</b>
                    </div>
                </div>
            </div>
        </div>

        <!-- Row info producto -->
        <hr>
        
        <div class="row">
            <div class="col-sm-12">
                <h3>Productos relacionados:</h3>
            </div>
            ${prodRelated}
        </div>
        <!-- row relacionados -->
        <hr>
        <div class="row" id="comentarios"> <!--Creo id para comentarios-->
        <div class="col-sm-12">
          <h3>Comentarios</h3>
        </div>
        ${comments}
        <span id="usrComments"></span>
        </div>
        <hr>
    `
    $('#infoProd').html(html);
}

//funcion para las estrellas
function stars(score) {
    let star = ``;
    for (let i = 0; i < score; i++) {
        star += `<span class="fa fa-star checked"></span>`;
    }
    for (let i = 0; i < 5 - score; i++) {
        star += `<span class="fa fa-star"></span>`
    }
    return star;
}
//funcion para comentar/ usuario 
function comentar(userC, scoreC, msg, date) {
    let cmt = {
        score: scoreC,
        description: msg,
        user: userC,
        dateTime: date.toString()
    };
    let arr = []; //array vacio
    comments = sessionStorage.getItem('comments') 
    if (comments === null) {
        arr.push(cmt);
        arr = JSON.stringify(arr);
        sessionStorage.setItem('comments', arr);
    } else {
        arr = JSON.parse(comments);
        arr.push(cmt);
        arr = JSON.stringify(arr);
        sessionStorage.setItem('comments', arr);
    }
    location.reload();
}