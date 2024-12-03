function loadIntercom() {
  (function () {
    const w: any = window;
    const ic = w.Intercom;
    if (typeof ic === "function") {
      ic("reattach_activator");
      ic("update", w.intercomSettings);
    } else {
      const d = document;
      const i = function () {
        i.c(arguments);
      };
      i.q = [];
      i.c = function (args) {
        i.q.push(args);
      };
      w.Intercom = i;
      const s = d.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.intercom.io/widget/rxsoqwkv";
      const x = d.getElementsByTagName("script")[0];
      if (x && x.parentNode) {
        x.parentNode.insertBefore(s, x);
        console.log("intercom loading.");
      }
    }
  })();
}

function checkAndLoadIntercom() {
  if (document.readyState === "complete") {
    // Wait 15 seconds after document ready and network idle
    setTimeout(loadIntercom, 15000);
  }
}

// Check for document ready and network idle
if (document.readyState === "complete") {
  checkAndLoadIntercom();
} else {
  window.addEventListener("load", checkAndLoadIntercom, false);
}
