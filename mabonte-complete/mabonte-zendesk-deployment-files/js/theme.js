/*
  Template Name: Mabonte
  Version: 2.0
  Author: Allies Interactive
  Website: http://www.diziana.com/
  Corporate Website : http://www.diziana.com
  Contact: support@diziana.com
  Follow: https://twitter.com/dizianaEngage
  Like: https://www.facebook.com/diziana.engage
  Purchase: Diziana.com
  License: You must have a valid license purchased only from
  diziana.com in order to legally use the theme for your project.
  Copyright: © 2016 Allies Interactive Services Pvt. Ltd. All Rights Reserved
*/

$(document).ready(function () {

// --------------------- Tooltips starts -------------------------- //
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
// --------------------- Tooltips ends -------------------------- //
});

(function(_w, _d, $) {
  
  'use strict';
  
  $(_d).ready(function() {
    
    $('body').addClass('hc_body');

    $('a.login, .language-selector > a').addClass('btn');

    $('.article-body').find('table').wrap('<div class="table-responsive"></div>');    
    $('.my-activities-nav.nav-bordered li').each(function(id, it) {
      if(typeof $(it).find('a').get(0) == 'undefined') {
        $(it).addClass('active');
      }
    });
  
    $('.my-activities-sub-nav.nav-spaced li').each(function(id, it) {
      if(typeof $(it).find('a').get(0) == 'undefined') {
        $(it).addClass('active');
      }
    });

    var _x = window.location.href.split('/hc/')[1].split('/').length
    if(_x==1) {
      $('.search-form').addClass('home-search-form');
    }

    var x = new Date();
    var y = x.getFullYear();
    $('#year').html(y);

  });

}(window, document, jQuery));

$(document).ready(function() {

  // toggle categories and sections on the home page
  $(".category-tree").on("click", "h2 a, h3 a", function() {
    $(this).parent().nextAll().toggle();
    return false;
  });

  // social share popups
  $(".share a").click(function(e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });

  // toggle the share dropdown in communities
  $(".share-label").on("click", function(e) {
    e.stopPropagation();
    var isSelected = this.getAttribute("aria-selected") == "true";
    this.setAttribute("aria-selected", !isSelected);
    $(".share-label").not(this).attr("aria-selected", "false");
  });

  $(document).on("click", function() {
    $(".share-label").attr("aria-selected", "false");
  });

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var $answerbodyTextarea = $(".answer-body textarea"),
      $answerFormControls = $(".answer-form-controls"),
      $commentContainerTextarea = $(".comment-container textarea"),
      $commentContainerFormControls = $(".comment-form-controls");

  $answerbodyTextarea.one("focus", function() {
    $answerFormControls.show();
  });

  $commentContainerTextarea.one("focus", function() {
    $commentContainerFormControls.show();
  });

  if ($commentContainerTextarea.val() !== "") {
    $commentContainerFormControls.show();
  }

  if ($answerbodyTextarea.val() !== "") {
    $answerFormControls.show();
  }

  // Submit requests filter form in the request list page
  $("#request-status-select, #request-organization-select")
    .on("change", function() {
      search();
    });

  // Submit requests filter form in the request list page
  $("#quick-search").on("keypress", function(e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $("#quick-search").val(),
      status: $("#request-status-select").val(),
      organization_id: $("#request-organization-select").val()
    });
  }

  // Submit organization form in the request page
  $("#request-organization select").on("change", function() {
    this.form.submit();
  });

  // Function to list categories in all templates

  var _src = 'YOUR_HC_ASSETS_PATH';

  // get id and template name
  var _location = window.location.href.split('/');
 if(_location.length>5){
   var _templatename = _location[5];
   var _templateid = _location[6].split('-')[0];
 }

  var categoriesList = function(_categories) {
    if(typeof HelpCenter.user.locale == 'undefined') {
      HelpCenter.user.locale = window.location.pathname.replace('/', '').replace('?','/').split('/')[1];
    }

    $.ajax({
      url: '/api/v2/help_center/'+HelpCenter.user.locale+'/categories.json',
      type: 'GET',
      dataType: 'json',
      success: _categories
    });
  };

  var _list = '';

  categoriesList(function(data){
    $(data.categories).each(function(idx, itm){
      _list = _list + '<li><a href="'+itm.html_url+'" id="'+itm.id+'"><article class="text-center"><img src="'+_src+itm.id+'.png?v='+(new Date().getTime())+'" class="cat-image '+itm.id+'"/><h4>'+itm.name+'</h4><p>'+itm.description+'</p></article></a></li>'
    });
    $('.hc-category-list').html(_list);
    $('.hc-category-list a#' +_templateid).addClass('active');

    if(_templatename=='sections' || _templatename=='articles') {
      var categoryid = $('.breadcrumbs > li:nth-child(2) > a').attr('href').split('/categories/')[1].split('-')[0];
      $('.hc-category-list a#' + categoryid).addClass('active');
    }

  });
  
  // function to list categories in all templates ends here

});
