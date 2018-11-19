$('.input').change(function()
{
  if($(this).attr('value') == "0") {
    $('#choose_own_text').append('<input type="text" id="my_own_text" name="my_own_text" value="Please type in .." />');
  } else {
    $('#choose_own_text').empty();
  }
});