function getHash() {
    input_node = document.getElementById("text_input")
    output_node = document.getElementById("hash_container")
    let text = input_node.value
    fetch(`http://localhost:5555/sha256?text=${text}`)
        .then(res=>res.json())
        .then(res=>output_node.innerHTML=res.hash)
}

function getText() {
    input_node = document.getElementById("hash_input")
    output_node = document.getElementById("text_container")
    let hash = input_node.value
    fetch(`http://localhost:5555/sha256`, {
        method: "POST",
        body: JSON.stringify({
            hash
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(res=>res.json()).catch(res=>{ return {text: "no match!"}})
      .then(res=>output_node.innerHTML=res.text)
}