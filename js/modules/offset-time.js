// OFFSET TIME

module.exports = function(date, time){

  var offsetTime = new Date(date+'T'+time);
  var hours = offsetTime.getHours();
  var minutes = offsetTime.getMinutes();
  console.log(minutes.length);
  if(minutes === 0){
    minutes = '0' + minutes;
  }
  return (hours + ':' + minutes);

};