$("#buscar").click(function(){
    var characterId = $("#txtId").val().toLowerCase();
    //console.log(idHero);
    let resultado = validar(characterId);
    getHeroData(characterId);


    $("#txtId").val("");
});

const getHeroData = (idHero) => {
    const tokenP = "10226574675213290";
    $.ajax({
       type: "GET",
        url: "https://www.superheroapi.com/api.php/"+tokenP+"/"+ idHero,

        success: function (data) {
            console.log(data);
        }
    });
}

function validar(id_hero){
    let pasamosLaValidacion = true;
    let validacionNombre = /^[0-9]+$/gim
    if(validacionNombre.test(id_hero) == false){
        document.querySelector(".errorNombre").innerHTML = "Ingrese un ID válido";
        pasamosLaValidacion = false;
    }
    return pasamosLaValidacion;
}