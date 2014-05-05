// OFFSET TIME

module.exports = {

  getTime: function(date, time){
    var offsetTime = new Date(date+'T'+time);
    var hours = offsetTime.getHours();
    var minutes = offsetTime.getMinutes();
    if(minutes.toString().length === 1){
      minutes = '0' + minutes;
    }

    if(hours === 0){
      hours = '0' + hours;
    }
    
    return (hours + ':' + minutes);

    },

    getDate: function(lessMinutes, otherDate){
      var date = otherDate ? new Date(otherDate) : new Date();
      // offset for Daylight saving hours
      var offset = Math.abs(date.getTimezoneOffset());
      date.setHours(date.getHours() + (offset / 60));

      if(lessMinutes){
        var dateInMs = date.valueOf();
        var minutesInMs = (Math.abs(lessMinutes) * 60) * 1000;
        date = new Date(dateInMs - minutesInMs);
      }

      return date.toISOString().split('T').shift();
    },

    convertCestTime: function(time){

      if(time.match(/can/i)){
        return "P  -  P";
      }

      if(isNaN(parseInt(time, 10))){
        return time;
      }

      if(!time.match(':')){
        return parseInt(time, 10);
      }

      var date = new Date();
      date.setHours(time.split(':')[0]);
      date.setMinutes(time.split(':')[1]);
      var localtime = date.getTime();
      var localoffset = date.getTimezoneOffset()*60000;
      var newDate = new Date(localtime + localoffset);
      var newHours = newDate.getHours();
      var newMinutes =  newDate.getMinutes().toString();
      
      if(newMinutes.length === 1){
        newMinutes = '0' + newMinutes;
      }

      if(newHours.length === 1){
        newHours = '0' + newHours;
      }

      return newHours + ":" + newMinutes;

    }

};