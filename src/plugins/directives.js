// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import Vue from "vue";
import Ripple from "vue-ripple-directive";

Vue.directive("ripple", Ripple);
