const bg = document.querySelector(".bg");
const menu = document.querySelector(".fa-bars");
const sidebar = document.querySelector(".sidebar");
const close = document.querySelector(".fa-xmark");

menu.addEventListener("click",()=>{
    sidebar.classList.toggle("close");
    bg.classList.add("close")
})

close.addEventListener("click",closefn)

function closefn(){
    sidebar.classList.add("close");
    bg.classList.toggle("close")
}


document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault()

        const url = this.getAttribute('data-url');

        document.getElementById('contentFrame').src = url;

        document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));

        this.classList.add('active');
    });
});
