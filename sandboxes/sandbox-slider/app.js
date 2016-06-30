$(function() {
  $( '#slider-range-min' ).slider({
    range: 'min',
    value: 0,
    min: 0,
    max: 100,
    slide: function( event, ui ) {
      $( '#amount' ).val( '$' + ui.value );
    }
  });
  $( '#amount' ).val( '$' + $( '#slider-range-min' ).slider( 'value' ) );
});
