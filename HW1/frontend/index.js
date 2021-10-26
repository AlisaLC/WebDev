prefix = "http://localhost:8080/"

function alerter(alertPlaceholder, message, type) {
    let wrapper = document.createElement('div');
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.append(wrapper)
}

function getBackend() {
    const rbs = document.querySelectorAll('input[name="backend"]');
    for (const rb of rbs) {
        if (rb.checked) {
            return rb.value
        }
    }
}

function getHash() {
    let input_node = document.getElementById("text_input")
    let output_node = document.getElementById("hash_container")

    let text = input_node.value
    if (text.length < 8) {
        alerter(output_node, text + " is too small (at least 8 needed)", "danger")
        return
    }
    fetch(`${prefix}${getBackend()}/sha256`, {
        method: "POST",
        body: JSON.stringify({
            text
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(res => res.json())
        .then(res => alerter(output_node, res.hash, "success"))
}

function getText() {
    let input_node = document.getElementById("hash_input")
    let output_node = document.getElementById("text_container")
    let hash = input_node.value
    fetch(`${prefix}${getBackend()}/sha256?hash=${encodeURIComponent(hash, {method: "GET"})}`)
        .then(res => {
            if (res.status !== 200)
                throw "not successful!"
            return res
        })
        .then(res => res.json()).catch(res => alerter(output_node, "no match!", "danger"))
        .then(res => alerter(output_node, res.text, "success"))
}
