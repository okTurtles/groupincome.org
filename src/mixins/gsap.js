import { gsap } from "gsap/dist/gsap"
import ScrollTo from 'gsap/dist/ScrollToPlugin'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import MotionPathPlugin from 'gsap/dist/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(MotionPathPlugin)
gsap.registerPlugin(ScrollTo)

export default {
  beforeCreate: function () {
    this.gsap = gsap;
  }
};