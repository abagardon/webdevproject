"use strict";
(function () {
    $(document).ready(function() {

        var sectionSearch = $("[data-search]");
        var openButtonSearch = $(".navigation__link-search");
        var sectionNavigation = $("[data-navigation]");
        var openButtonNavigation = $(".navigation__button");

        $('.navigation__button').on('click', function(){

            if($(".navigation__list").hasClass('navigation__hidden')) {

                $('.navigation__list').removeClass("navigation__hidden");
                $('.navigation__burger-block').addClass("navigation-burger__hidden");
                focusManager.capture(sectionNavigation[0]);

            } else {

                $('.navigation__list').addClass("navigation__hidden");
                $('.navigation__burger-block').removeClass("navigation-burger__hidden");
                focusManager.release(openButtonNavigation[0]);
            }

        });

        $('.navigation__link-search').on('click', function() {

            $('.navigation__desc-search').addClass("navigation__desc-search_show");
            focusManager.capture(sectionSearch[0]);

        });

        $('.navigation__button-cross').on('click', function() {

            $('.navigation__desc-search').removeClass("navigation__desc-search_show");
            focusManager.release(openButtonSearch[0]);

        });

        $(window).keydown(function(e) {

            if(e.keyCode === 27) {

                e.preventDefault();

                if($(".navigation__desc-search").hasClass("navigation__desc-search_show")) {

                    $(".navigation__desc-search").removeClass("navigation__desc-search_show");
                    focusManager.release(openButtonSearch[0]);

                }

                if($(".navigation__burger-block").hasClass("navigation-burger__hidden")) {

                    $('.navigation__list').addClass("navigation__hidden");
                    $('.navigation__burger-block').removeClass("navigation-burger__hidden");
                    focusManager.release(openButtonNavigation[0]);

                }
            }

        });

    });
})();
