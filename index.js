function submitForm() {
    var senhaInput = document.getElementById('senha');
    var senha = senhaInput.value;
    var senhamd5 = "04c968ec4abf514f6a7be3be7ec01b5b";
    var inputMD5 = hex_md5(senha)

    if (inputMD5 == senhamd5) {
        sessionStorage.setItem('entrar', 'aa');
        document.location = "/atletas.html";
    } else {
        alert("senha incorreta!");
    }
}