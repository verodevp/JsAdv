document.addEventListener("DOMContentLoaded", ()=>{


    const tableVaccini = document.getElementById("tableVaccini")
   
    const APIUrl = "script/vaccini.json"
    console.log(APIUrl)
    

    fetch(APIUrl).then(
        (response) => {
            if (response.ok){return response.json()}
            }).then(
        (data) =>{
            console.log(data);



            let str = 
            `
                <thead>
                    <tr>
                        <th>Regione</th>
                        <th>Dosi somministrate</th>
                        <th>Dosi consegnate</th>
                        <th>Percentuale di somministrazione</th>
                        <th>Ultimo aggiornamento</th>
                        
                    </tr>
                </thead>
                
            `
            str+= `
            <tbody>
            `

           

            data.data.forEach(
                element => {
                    str +=
                    `
                        <tr>
                            <td>${element.reg.toUpperCase()}</td>
                            <td>${element.dosi_somministrate}</td>
                            <td>${element.dosi_consegnate}</td>
                            <td>${element.percentuale_somministrazione}</td>
                            <td>${cambiaFormatoData(element.ultimo_aggiornamento)}</td>
                            
                            

                        </tr>
                       
                        
                    `  

            });



            let totSomm =0;
            let totCons=0;
            

            for(let i=0; i<data.data.length;i++){

                
                totSomm+= data.data[i].dosi_somministrate
                //console.log(totSomm)

                totCons += data.data[i].dosi_consegnate
                //console.log(totCons)

                
            }


            str+= 
            `
            <tr>

                <td>Totale</td>
                <td>${totSomm}</td>
                <td>${totCons}</td>

            </tr>
            `


            str+= `
            </tbody>
            `

            tableVaccini.innerHTML=str


        }
    )

})




function cambiaFormatoData(date){


    let anno = date.substr(0,4)
    

    let mese = date.substr(5,2)

    let giorno = date.substr(8,2)

    return giorno + "-" + mese +"-" + anno


}
