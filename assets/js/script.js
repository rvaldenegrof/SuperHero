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
            $("#resultado").show();
            console.log(data);
            const imagenPerfil = data.image.url;
            const nombreHero = data.name;
            const publisherBy = data.biography.publisher;
            const occupation = data.work.occupation;
            const firstAparition = data.biography["first-appearance"];
            const altura = data.appearance["height"];
            const peso = data.appearance["weight"];
            const alianza = data.biography.aliases;
            const stats = data.powerstats;

            const alturaB = replaceComa(altura);
            const pesoB = replaceComa(peso);

            
            


            $("#hero_thumb").attr("src", imagenPerfil);
            $("#hero_thumb").css("width", "200");

            
            document.querySelector("#nombre_hero").innerHTML = `Nombre: ${nombreHero}`;
            document.querySelector(".published_by").innerHTML = `Publicado por: ${publisherBy}`;
            document.querySelector(".occ_hero").innerHTML = `Ocupación: ${occupation}`;
            document.querySelector(".first_appearance").innerHTML = `Primera Aparición: ${firstAparition}`;
            document.querySelector(".altura").innerHTML = `Altura: ${alturaB}`;
            document.querySelector(".peso").innerHTML = `Peso: ${pesoB}`;
            document.querySelector(".alianza").innerHTML = `Alianza: ${alianza}`;

            const nombre = data["name"].toString().toUpperCase();

            const dataPoints = []; 
            for(keys in stats){
                dataPoints.push({ y: parseInt(stats[keys])||0, label:keys})
            }
            renderChart(dataPoints, nombre); 
        },
        error: function(response){
            if ( response.error == 'invalid id' || response.response == 'error') {
                console.log('404.');

                console.log(jqXHR);
                document.getElementById('#resultHero').innerHTML = "SuperHero no encontrado";
            }
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

//RENDER CHART
const renderChart = (dataPoints, nombre) => {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: `Estadísticas de ${nombre}`
        },
        data: [
            {
                type: "pie",
                startAngle: 25,
                showInLegend: "true",
                legendText: "{label}",
                indexLabel: "{label} ({y})",
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();
};

//
function replaceComa(a){
    return a.join(' - ');
}
