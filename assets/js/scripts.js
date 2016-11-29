/* 
File Name: scripts.js
Date: 15 Mar 16
Programmer: Jaymes Young-Liebgott
 */

$(document).ready(function () {
    // Hide menu when page is clicked
    $(document).on('click', function (evt) {
        if (!$(evt.target).closest('nav').length) {
            var eleClass = $('.menuOn');
            if (eleClass.length > 0) {
                eleClass.removeClass('menuOn');
            }
        }
    });
   // Toggle main menu
    $('#li-btn-menu').on('click', function (evt) {
        if ($(evt.target).attr('href') === '#') {
            evt.preventDefault();
        }
        $('#ul-sub-menu').toggleClass('menuOn');
    });
});


