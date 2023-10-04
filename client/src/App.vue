<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // this.disabledCopy();
  },
  methods: {
    disabledCopy() {
      setInterval(() => {
        if (
          window.Firebug &&
          window.Firebug.chrome &&
          window.Firebug.chrome.isInitialized
        ) {
          window.location = "https://www.facebook.com/me";
        }
      }, 1);
      window.onload = function () {
        document.addEventListener(
          "contextmenu",
          function (e) {
            e.preventDefault();
          },
          false
        );
        document.addEventListener(
          "keydown",
          function (e) {
            //document.onkeydown = function(e) {
            // "I" key
            if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
              disabledEvent(e);
            }
            // "J" key
            if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
              disabledEvent(e);
            }
            // "S" key + macOS
            if (
              e.keyCode == 83 &&
              (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
            ) {
              disabledEvent(e);
            }
            // "U" key
            if (e.ctrlKey && e.keyCode == 85) {
              disabledEvent(e);
            }
            // "F12" key
            if (event.keyCode == 123) {
              disabledEvent(e);
            }
          },
          false
        );

        function disabledEvent(e) {
          if (e.stopPropagation) {
            e.stopPropagation();
          } else if (window.event) {
            window.event.cancelBubble = true;
          }
          e.preventDefault();
          return false;
        }
      };
    },
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  overflow-x: hidden;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, ".SFNSText-Regular",
    sans-serif;
  color: #050505;
  background-color: #ffffff;
}
</style>
