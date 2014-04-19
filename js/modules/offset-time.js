// OFFSET TIME

module.exports = {

  getTime: function(date, time){

    var offsetTime = new Date(date+'T'+time);
    var hours = offsetTime.getHours();
    var minutes = offsetTime.getMinutes();

    if(minutes === 0){
      minutes = '0' + minutes;
    }

    if(hours === 0){
      hours = '0' + hours;
    }
    
    return (hours + ':' + minutes);

    },

    getDate: function(lessMinutes){
      var date = new Date();
      // offset for Daylight saving hours
      var offset = Math.abs(date.getTimezoneOffset());
      date.setHours(date.getHours() + (offset / 60));

      if(lessMinutes){
        var dateInMs = date.valueOf();
        var minutesInMs = (Math.abs(lessMinutes) * 60) * 1000;
        date = new Date(dateInMs - minutesInMs);
      }

      return date.toISOString().split('T').shift();
    }

};