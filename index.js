let hospitaisSelecionados= [];

        let quantidadeHospitais = 0;
        let qtdHospitaisSelecionados = 0
        const btnPost = document.querySelector('button#post');
        let text = document.getElementById('texto');
        btnPost.addEventListener('click', buscarGET);
        function MostraNaTela(data){
                    let hospitais_div = ""
                    hospitais = data.hospitais;

                    if (hospitais.length == 0){
                        document.querySelector('.nao_encontrado').innerText = "Nenhum hospital encontrado"
                        document.querySelector('.nome_hospital').innerHTML = ""
                    }
                    else{
                        document.querySelector('.nao_encontrado').innerHTML = ""
                        quantidadeHospitais = hospitais.length;
                        for (let i = 0; i < hospitais.length; i++) {

                            hospitais_div += " <div class= 'hospitais1'  > <div  class = 'hosp" + i + "' > <p>" + hospitais[i]+    "</p></div> </div>" ;
                        }
                        document.querySelector('.nome_hospital').innerHTML = hospitais_div;
                        cor()
                    }
                }
        document.addEventListener('click', function(event) {
            console.log(hospitaisSelecionados)
            for(let i = 0; i < quantidadeHospitais ; i++){
                if (event.target.matches('.hosp' + i+ "> p")) {
                    
                    if(document.querySelector('.hosp' + i+ "> p").style.backgroundColor == 'rgb(66, 163, 66)'){
                        hospitaisSelecionados.splice(hospitaisSelecionados.indexOf(document.querySelector('.hosp' + i+ "> p").innerText), 1)
                        let selecionado = document.querySelector('.hosp' + i+ "> p")
                        selecionado.style.backgroundColor = ''
                     
                        selecionado.style.color = '#ffffff7e' 
                        qtdHospitaisSelecionados -= 1 
                        botaoSelecionar();
                        mostraSelecionadosLadoDireito()
                        console.log(qtdHospitaisSelecionados)
                    }   
                    else{
                        if  (! hospitaisSelecionados.includes(document.querySelector('.hosp' + i + "> p").innerText)){
                            console.log("nao tem")
                            hospitaisSelecionados.push(document.querySelector('.hosp' + i+ "> p").innerText)
                        }
                        
                       
                        let selecionado = document.querySelector('.hosp' + i+ "> p")
                        selecionado.style.backgroundColor = 'rgb(66, 163, 66)'
                        selecionado.style.color = 'white'
                        selecionado.style.width = '700px'
                        qtdHospitaisSelecionados += 1
                        console.log(qtdHospitaisSelecionados)
                        botaoSelecionar();
                        mostraSelecionadosLadoDireito()
                    }
                }
            }
            
        }); 

             function buscarGET(){
                text = document.getElementById('texto').value;    
                
            
             
                fetch(`http://localhost:8080/texto?hospital=${text}`, {
                    method: 'GET',
                } )
                    .then(response => response.json())
                    .then(data => MostraNaTela(data))
                    .catch(error => console.error(error));
        }

        function botaoSelecionar(){
            const botaoSelecionar = document.querySelector('button#enviarSelecionados');
            if (qtdHospitaisSelecionados > 0){
                botaoSelecionar.style.backgroundColor= 'rgb(10, 208, 66)'
            }else{
                botaoSelecionar.style.backgroundColor= 'cadetblue';
            }
        }

        function cor(){
            for (let i = 0; i < quantidadeHospitais; i++) {
            const hosp = document.querySelector(".hosp" + i  +      " > p");
            if(hospitaisSelecionados.includes(hosp.innerText)){
                hosp.style.backgroundColor = 'rgb(66, 163, 66)'
                hosp.style.color = 'white'
                hosp.style.width = '700px'
                hosp.style.padding = '6px    2px'  
                console.log("passqqq")
        
              
            }
            console.log("pass")
            // adiciona listener de evento 'mouseover'
            hosp.addEventListener("mouseover", function () {
                if( hosp.style.color != 'rgb(144, 238, 144)' && hosp.style.backgroundColor != 'rgb(66, 163, 66)'  ){
                    hosp.style.color= "rgba(17, 19, 17, 0.37)";
                }
            });
            // adiciona listener de evento 'mouseout'
            hosp.addEventListener("mouseout", function () {
                if (hosp.style.color != 'rgb(144, 238, 144)'){
                    if (hosp.style.backgroundColor != 'rgb(66, 163, 66)'){
                        hosp.style.color = "black";  
                    }
                }
            });
  }
        }

function mostraSelecionadosLadoDireito(){
    if(qtdHospitaisSelecionados > 0){
        let hospitais_div  = '<h1> Selecionados </h1>'
        for(let i =0; i < hospitaisSelecionados.length; i++){
            hospitais_div += " <div class= 'mostraSelecionadosLadoDireito0'  > <div class = 'mostraSelecionadosLadoDireito1' >" + hospitaisSelecionados[i]+    "</div> </div>" ;
        }
        document.querySelector('.nome_hospital_selecionado').innerHTML = hospitais_div;
        document.querySelector(".nome_hospital_selecionado").style.display = 'block'
    }
}
      

function enviarSelecionados(dados){
    fetch("http://localhost:8080/hospitais-selecionados",{
        method :"post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }).then(response => response.json())
    .then( function respo(response){
        alert("Operação realizada com sucesso!")
        setTimeout(function() {
            window.location.reload();
          }, 2000);
    })
    .catch(error=> console.log(error))
}

const botaoSelecionado = document.querySelector('button#enviarSelecionados');
botaoSelecionado.addEventListener('click', function(){
    let  hospital_ = document.querySelector('#escolha_hospital').value 
    let dados ={ [hospital_]: hospitaisSelecionados };
                enviarSelecionados(dados)
})

if (qtdHospitaisSelecionados == 0){
    document.querySelector(".nome_hospital_selecionado").style.display = 'None'
}


