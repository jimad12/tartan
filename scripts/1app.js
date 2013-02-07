(function() {
  $(document).bind("mobileinit", function() {
    // Turn off jqm page transitions
    $.extend($.mobile, { defaultPageTransition: 'none' });
     // Add a back button to the nested list subpages
    $.mobile.page.prototype.options.addBackBtn = true;
  });
  var initDevice = function() {
    // Check for localStorage support in the browser.
    if(typeof(window.localStorage) == 'object') {
      // Add a click handler for the "I found it! buttons"
      $('.foundTartan').click(tartanFound);
      refreshTartans();
      addResetButton();
    }
  };
  // call the initDevice function when the DOM is ready
  $(document).ready(initDevice);
  // This is jQuery code. It means: iterate (loop) over each element
  // that matches the CSS selector ul.details (<ul>s with a class of “details”).
  refreshTartans = function() {
    $('ul.details').each(function() {
      var myID = $(this).attr('id');
      var tartanKey = 'found-' + myID;
      var foundValue = localStorage.getItem(tartanKey);
      var isFound  = Boolean (foundValue);
      $('#vendor-'+ myID).toggleClass('found',isFound);
      $('[data-url*="'+myID+'"]').toggleClass('found',isFound);
      $('#'+tartanKey).closest('li').toggle(!isFound);
    });
    $('ul').each(function() {
      if($(this).data('listview')) {
        $(this).listview('refresh');
      }
    });
  };
  
  // Click handler for "I found it" button
  var tartanFound = function(event) {
    // Get the ID of the clicked button
    var tartanKey = $(event.currentTarget).attr('id');
    // Store that this tartan was found
    localStorage.setItem(tartanKey, 'true');
    refreshTartans();
  };
  
  var addResetButton = function() {
    // create a button-styled <a> element
    var $resetButton = $('<a></a>').attr('data-role','button').html('start Over!');
    // Add a click handler for the reset button
    $resetButton.click(function() {
      // clear all entries from localStorage
      localStorage.clear();
      refreshTartans();
    });
    // Insert the reset button into the page.
    $resetButton.appendTo($('#booths'));
  };
}());