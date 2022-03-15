/*!
 * jQuery moveToTop Plugin
 * Copyright (c) 2020 Hassan Raza - info@hassanraza.net
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * Github Repo & Documentation: https://github.com/hassanrazadev/jquery-moveToTop
 * Version: 1 (24-September-2020)
 */

function moveToTop(options) {
    // default options
    let defaults = {
        // target: this.prev(),
        speed: 1000,
        opacity: 0.7,
        start: function () {},
        end: function () {}
    };

    let option = $.extend(defaults, options);

    let currentEl = option.target1,
    targetEl = option.target2,
    cssBefore = {
        "position": "relative",
        "opacity": option.opacity
    },
    cssAfter = {
        "top": "0",
        "opacity": 1
    },
    distance = currentEl.offset().top - targetEl.offset().top;

    // if(currentEl.offset().top < targetEl.offset().top){
    // targetEl = this;
    // currentEl = option.target;
    // distance = currentEl.offset().top - targetEl.offset().top;
    // }


    // if(distance < 0){
    // currentEl = option.target2;
    // targetEl = option.target1;
    // }

    if (/* distance > 0 */ true) {
        currentEl.css(cssBefore);
        option.start();
        $.when(currentEl.animate({
                top:  - distance
            }, option.speed))
        .done(function () {
            currentEl.css(cssAfter);
            currentEl.insertBefore(targetEl);
            option.end();
        });
    }
}

