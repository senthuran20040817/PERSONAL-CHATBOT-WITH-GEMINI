document.getElementById("txtRequest").addEventListener("keydown",function(e){
    if(e.key === "Enter") btnSendMessageOnAction();
});

function btnSendMessageOnAction(){
    if(document.getElementById("txtRequest").value!==""){
        document.getElementById("respond").innerText="";
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let userInput = document.getElementById("txtRequest").value;
        document.getElementById("txtRequest").value="";
        const raw = JSON.stringify({
        "contents": [
            {
            "parts": [
                {
                "text": userInput
                }
            ]
            }
        ]
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch("/api/chat", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let markdownText = result.candidates[0].content.parts[0].text;
            let html = marked.parse(markdownText);
            document.getElementById("respond").innerHTML=html;
        })
        .catch((error) => console.error(error));
    }
}

