$( document ).ready(function() {
    $(".change-color-btn").on('click', function () {
        rnd = ()=>Math.floor(Math.random() * 256)
        $(".topSection").css({
            backgroundImage: `linear-gradient(to bottom, rgba(${rnd()}, ${rnd()}, ${rnd()}, 0.52), rgba(${rnd()}, ${rnd()}, ${rnd()}, 0.73)), url(Images/IMG_7572.png)`
        })
    })
});