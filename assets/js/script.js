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
            const imagenPerfil = data.image.url;
            const nombreHero = data.name;
            const publisherBy = data.biography.publisher;
            const occupation = data.work.occupation;
            const firstAparition = data.biography["first-appearance"];
            const altura = data.appearance["height"];
            console.log(altura);

            $("#hero_thumb").attr("src", imagenPerfil);
            
            document.querySelector("#nombre_hero").innerHTML = `Nombre: ${nombreHero}`;
            document.querySelector(".published_by").innerHTML = `Publicado por: ${publisherBy}`;
            document.querySelector(".occ_hero").innerHTML = `Ocupación: ${occupation}`;
            document.querySelector(".first_appearance").innerHTML = `Primera Aparición: ${firstAparition}`;
            document.querySelector(".altura").innerHTML = `Altura: ${altura}`;
        }
    });
}
/* Zona de funciones */

//VALIDAR 
function validar(id_hero){
    let pasamosLaValidacion = true;
    let validacionNombre = /^[0-9]+$/gim
    if(validacionNombre.test(id_hero) == false){
        document.querySelector(".errorNombre").innerHTML = "Ingrese un ID válido";
        pasamosLaValidacion = false;
    } else {
        document.querySelector(".errorNombre").innerHTML = "";
    }
    return pasamosLaValidacion;
}