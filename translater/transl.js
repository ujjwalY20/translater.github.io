const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selecTag = document.querySelectorAll("select");
const exchangeIcon = document.querySelector(".exchange");
translateBtn = document.querySelector("button");
icons  = document.querySelectorAll(".row i");



selecTag.forEach((tag,id) =>{
        for(let country_code in countries)
        {
                let selected;
                if(id==0 && country_code == "en-GB"){
                        selected = "selected";
                        
                }
                else if(id==1 && country_code == "hi-IN"){
                        selected = "selected";
                         

                }
                
                let option = `<option value ="${country_code}" ${selected}>${countries[country_code]}</option>`;
                tag.insertAdjacentHTML("beforeend",option);

        }
    
        
        
});

exchangeIcon.addEventListener("click", () => {
        let tempText = fromText.value;
        tempLang = selecTag[0].value;
        fromText.value = toText.value;
        selecTag[0].value = selecTag[1].value;

        
        toText.value = tempText;
        selecTag[1].value = tempLang;

        
});

translateBtn.addEventListener("click",()=>{
        let text = fromText.value;
        let translateFrom = selecTag[0].value;
        let translateTo = selecTag[1].value;
        if(!text) return;
        toText.setAttribute("placeholder","translating...")
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
        fetch(apiUrl).then(res =>res.json()).then(data =>{
                console.log(data);
                toText.value = data.responseData.translatedText;
                toText.setAttribute("placeholder","translation")
        
        })
        

});

icons.forEach(icon =>{
        icon.addEventListener("click",({target}) =>{
                if(target.classList.contains("fa-copy")) {
                        if(target.id == "from") {
                                navigator.clipboard.writeText(fromText.value);
                        }
                        else{
                                navigator.clipboard.writeText(toText.value);
                        }
                }else
                {
                        let utterance;
                        if(target.id == "from") {
                                utterance = new SpeechSynthesisUtterance(fromText.value)
                                utterance.lang = selecTag[0].value;
                               
                        }
                        else{
                                utterance = new SpeechSynthesisUtterance(toText.value);
                                utterance.lang = selecTag[1].value;
                        }
                        speechSynthesis.speak(utterance);
                       
                }
        });
})