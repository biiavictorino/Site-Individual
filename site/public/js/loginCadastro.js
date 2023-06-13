function cadastroProLogin(){   
    //Essa linha está adicionando um ouvinte de evento de clique ao elemento HTML com o ID 'sign-in-call-btn'.
    //Quando esse elemento for clicado, a função anônima definida entre chaves será executada.

    // - Essa linha está obtendo a referência para o elemento HTML com o ID 'cover' e armazenando-a na variável 'cover'.
    const cover = document.getElementById('cover');

    //  - Essa linha está adicionando a classe CSS 'right' ao elemento 'cover'. 
    // Isso provavelmente altera a aparência ou o posicionamento do elemento usando estilos CSS pré-definidos.
    cover.classList.add('right');

    // - Essa linha está removendo a classe CSS 'left' do elemento 'cover'. 
    // Isso pode ser feito para reverter uma modificação anterior ou para garantir que apenas uma classe esteja aplicada ao elemento.
    cover.classList.remove('left');


    // - Essa linha está obtendo a referência para o elemento HTML com o ID 'sign-in-call' e 
    // armazenando-a na variável 'signin'.
    const signin = document.getElementById('sign-in-call');

    // - Essa linha está obtendo a referência para o elemento 
    // HTML com o ID 'sign-in-call' e armazenando-a na variável 'signin'.
    signin.classList.add('hide');

    // Essa linha está obtendo a referência para o elemento 
    // HTML com o ID 'sign-up-call' e armazenando-a na variável 'signup'.
    const signup = document.getElementById('sign-up-call');

    // - Essa linha está removendo a classe CSS 'hide' do elemento 'signup'. 
    // Isso provavelmente torna o elemento visível novamente, revertendo a alteração feita anteriormente.
    signup.classList.remove('hide');
}

document.getElementById('sign-up-call-btn').addEventListener('click', () => {
    const cover = document.getElementById('cover');
    cover.classList.add('left');
    cover.classList.remove('right');

    const signin = document.getElementById('sign-in-call');
    signin.classList.remove('hide');

    const signup = document.getElementById('sign-up-call');
    signup.classList.add('hide');
})

// ENTRAR

function FazerLogin() {

    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {
        alert("erro conta não cadastrada!!")
        return false;
    }
    else{
        
        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                setTimeout(function () {
                    window.location = "./inicio.html";
                }, 1000); // apenas para exibir o loading
                
            });
            
        } else {
            
            console.log("Houve um erro ao tentar realizar o login!");
            
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
        
    }).catch(function (erro) {
        console.log(erro);
    })
    
    return false;
}
}


// CADASTRO

function cadastrar() {

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome_cadastro_input.value;
    var emailVar = email_cadastro_input.value;
    var senhaVar = senha_cadastro_input.value;

    if (nomeVar == "" || emailVar == "" || senhaVar == "") {
        alert("Campos vazios")
    }
    else{

        // Enviando o valor da nova input
        fetch("/usuarios/cadastrar", {
            method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
     
        
        // cadastro realizado 
        
        if (resposta.ok) {
            const Toast = Swal.mixin({ //  Cria uma constante chamada "Toast" que armazena uma mistura (mixin) personalizada do SweetAlert.
                toast: true,
                position: 'top-end',
                showConfirmButton: false, // Define a propriedade "showConfirmButton" como falso, para que o toast não tenha um botão de confirmação.
                timer: 3000,
                timerProgressBar: true, // Ativa a barra de progresso que é exibida durante a duração do timer do toast.
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer) // Ativa a barra de progresso que é exibida durante a duração do timer do toast.
                  toast.addEventListener('mouseleave', Swal.resumeTimer) // Adiciona um ouvinte de evento para quando o mouse sair do toast, retomando o timer.
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Cadastro realizado com sucesso!'
              })
            // alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...")
            
            setTimeout(() => {
                cadastroProLogin()
            }, "3100")
            
        } else {
            alert ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    
    return false;
}

}