$(document).ready(function () {
    $(".change-color-btn").on('click', function () {
        let getRandom = () => Math.floor(Math.random() * 256)
        let getRandomColor = () => `${getRandom()}, ${getRandom()}, ${getRandom()}`
        $(".topSection").css({
            backgroundImage: `linear-gradient(to bottom, rgba(${getRandomColor()}, 0.52), rgba(${getRandomColor()}, 0.73)), url(Images/IMG_7572.png)`
        })
    })

    $(".navbar-brand").click(function () {
        $("body").toggleClass("light-mode")
        $("body").toggleClass("dark-mode")
    })

    $(".list-group-item-action").click(function () {
        let myCollapse = document.getElementById('sidebar')
        let bsCollapse = new bootstrap.Collapse(myCollapse)
        bsCollapse.hide();
    })

    let prevScroll = -100;
    $(document).scroll(function () {
        let currentScroll = $(this).scrollTop();
        if (prevScroll > currentScroll) {
            $(".navbar").css({opacity: 1})
        } else {
            $(".navbar").css({opacity: 0})
        }
        prevScroll = currentScroll;
    })

    $('.navbar').hover(function () {
        $(".navbar").css({opacity: 1})
    })

    // to reset form
    $('.modal').on('hidden.bs.modal', function () {
        $('form').trigger('reset')
    })

    $('#toastActivator').click(function () {
        new bootstrap.Toast($('#myToast')).show()
    })
});