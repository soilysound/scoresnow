// OFFSET TIME

module.exports = {

  getTime: function(date, time){

    var offsetTime = new Date(date+'T'+time);
    var hours = offsetTime.getHours();
    var minutes = offsetTime.getMinutes();

    if(minutes === 0){
      minutes = '0' + minutes;
    }
    return (hours + ':' + minutes);

    },

    getDate: function(){
      var date = new Date();
      // offset for Daylight saving hours
      var offset = Math.abs(date.getTimezoneOffset());
      date.setHours(date.getHours() + (offset / 60));
      return date.toISOString().split('T').shift();
    }

};