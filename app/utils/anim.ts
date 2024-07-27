import { AnimationProps, Variants } from 'framer-motion';

export const anim = (variants: Variants): AnimationProps => {
  return {
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants,
  };
};

export class AnimationTiming {
  static easeInOutQuad(delay: number, duration: number) {
    return {
      duration: duration,
      delay: delay,
      ease: [0.76, 0, 0.24, 1],
    };
  }
}
