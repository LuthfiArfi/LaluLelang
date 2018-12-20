function timer(tanggal, time){
  let interval = setInterval( function() {
    // let end_time = new Date(days +' ' + time + ':00')
    let end_time = new Date(tanggal + ' ' + time + ':00').getTime()
    let now = new Date().getTime()
    let distance = end_time - now
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((distance % (1000 * 60)) / (1000))
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    display(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's' )

    if (!distance) {
      clearInterval(interval)
    }

    // <p id="demo"></p>
    // if (distance < 0) {
    //   clearInterval(x);
    //   document.getElementById("demo").innerHTML = "EXPIRED";
    // }
  }, 1000)
};

function display(time) {
  console.log(time);
}1


// <input type="date" id="start" name="trip-start"
//        value="2018-07-22"
//        min="2018-01-01" max="2018-12-31"> 

//        <form action="/action_page.php">
//   Select a time:
//   <input type="time" name="usr_time">
//   <input type="submit">
// </form>

module.exports = timer