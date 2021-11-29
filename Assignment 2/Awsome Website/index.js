$(document).ready(function () {
    $(".change-color-btn").on('click', function () {
        let getRandom = () => Math.floor(Math.random() * 256)
        let getRandomColor = () => `${getRandom()}, ${getRandom()}, ${getRandom()}`
        $(".topSection").css({
            backgroundImage: `linear-gradient(to bottom, rgba(${getRandomColor()}, 0.52), rgba(${getRandomColor()}, 0.73)), url(Images/IMG_7572.png)`
        })
    })
});