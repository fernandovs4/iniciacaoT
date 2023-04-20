let hospitaisSelecionados= [];

        let quantidadeHospitais = 0;
        let qtdHospitaisSelecionados = 0
        const btnPost = document.querySelector('button#post');
        let text = document.getElementById('texto');
        btnPost.addEventListener('click', buscarPost);
        



        function MostraNaTela(data){

            
                    let hospitais_div = ""
                    hospitais = data.hospitais;
                    quantidadeHospitais = hospitais.length;
                    for (let i = 0; i < hospitais.length; i++) {
                        hospitais_div += " <div    class= 'hospitais1'  > <div style='padding: 6px 2px'  class = 'hosp" + i + "' >" + hospitais[i]+    "</div> </div>" ;
                    }
                    document.querySelector('.nome_hospital').innerHTML = hospitais_div;
                    cor()

                }
                
        
        console.log(quantidadeHospitais)

        


        function passouPorCima(){

        }
       
        document.addEventListener('click', function(event) {
            console.log(hospitaisSelecionados)
            for(let i = 0; i < quantidadeHospitais ; i++){
                if (event.target.matches('.hosp' + i)) {
                    
                    if(document.querySelector('.hosp' + i).style.backgroundColor == 'rgb(66, 163, 66)'){
                        hospitaisSelecionados.splice(hospitaisSelecionados.indexOf(document.querySelector('.hosp' + i).innerText), 1)
                        let selecionado = document.querySelector('.hosp' + i)
                        selecionado.style.backgroundColor = '#c5ddc6'
                        selecionado.style.padding = '6px    2px'  
                        selecionado.style.color = 'rgba(17, 19, 17, 0.37)' 
                        
                        qtdHospitaisSelecionados -= 1 
                        botaoSelecionar();
                        console.log(qtdHospitaisSelecionados)
                        

                    }
                    else{
                        hospitaisSelecionados.push(document.querySelector('.hosp' + i).innerText)
                        let selecionado = document.querySelector('.hosp' + i)
                        selecionado.style.backgroundColor = 'rgb(66, 163, 66)'
                        selecionado.style.color = 'white'
                        
                        selecionado.style.width = '700px'
                        qtdHospitaisSelecionados += 1
                        console.log(qtdHospitaisSelecionados)
                        botaoSelecionar();
                        
                    }
                }
            }
            
        });


             function buscarPost(){
                text = document.getElementById('texto').value;    
                const data = { "mensagem": text};
                const json = JSON.stringify(data);
                console.log(json);
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: json
                    };

                fetch('https://IniciacaoTec.pythonanywhere.com/texto', requestOptions )
                    .then(response => response.json())
                    .then(data => MostraNaTela(data))
                    .catch(error => console.error(error));
        }

        function botaoSelecionar(){
            const botaoSelecionar = document.querySelector('button#enviarSelecionados');
            botaoSelecionar.addEventListener('click', function(){
                console.log(hospitaisSelecionados)
            })
            if (qtdHospitaisSelecionados > 0){
                botaoSelecionar.style.backgroundColor= 'rgb(10, 208, 66)'
            }else{
                botaoSelecionar.style.backgroundColor= 'cadetblue';
            }
            
        }

        function cor(){
            for (let i = 0; i < quantidadeHospitais; i++) {
            const hosp = document.querySelector(".hosp" + i);
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
      
        