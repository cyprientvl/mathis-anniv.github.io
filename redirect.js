var url = "https://cyprientvl.github.io/mathis-anniv.github.io";

function openSamsung() {
  var intent = "intent://" + url.replace("https://", "") +
    "#Intent;scheme=https;package=com.sec.android.app.sbrowser;end";

  window.location.href = intent;

  //fallback();
}

function openChrome() {
  var intent = "intent://" + url.replace("https://", "") +
    "#Intent;scheme=https;package=com.android.chrome;end";

  window.location.href = intent;

  //fallback();
}

function fallback() {
  setTimeout(function() {
    window.location.href = url;
  }, 15000);
}