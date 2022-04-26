
/*
    Funções e eventos para manipulação do menu no layout
*/

const menu_sidebar = document.querySelector('#sidebar');
const menu_icon = document.querySelector('#menu-icon');

// ponto de divisão entre layout desktop e mobile
const min_window_width = 992;

// Setado pelas funções 'hide_menu()' e 'show_menu()', usado para o click no botão de menu 
let showing_menu_flag = true;


// Função inicializadora que prepara o menu para ser manipulado
function load_menu(){
    window.onresize = () => {
        handle_menu();
    }

    // nesse ponto a largura de tela já é mobile
    menu_icon.onclick = () => {
        if (showing_menu_flag){
            hide_menu();
        }
        else{
            show_menu();
        }
    }

    handle_menu();
}

function handle_menu(){

    // largura mobile -> esconde menu e mostra botão de menu
    // largura desktop -> mostra o menu e esconde botão de menu

    if (window.innerWidth <= min_window_width){
        hide_menu();
    }
    else{
        show_menu();
    }
}

function hide_menu(){
    showing_menu_flag = false;

    menu_sidebar.style = `
    position: absolute;
    width: 1px;
    height: 1px;
    left: -1000px;
    top: -1000px;`;  
}

function show_menu(){
    showing_menu_flag = true;

    menu_sidebar.style = `
    position: relative;
    height: 100vh;`;

    if (window.innerWidth <= min_window_width){
        menu_sidebar.style.width = '50vw';
    }
}

export default { load_menu };
