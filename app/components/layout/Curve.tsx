'use client';
import { AnimationTiming } from '@/app/utils/anim';
import { AnimationProps, motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { exit } from 'process';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './Curve.module.css';

interface CurveProps {
    children: ReactNode
}

interface WindowDimensions {
  width: number,
  height: number
}

const anim = (variants: Variants): AnimationProps => {
  return {
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants
  }
}

const Curve = ({ children }: CurveProps) => {

  const pathname = usePathname();
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    height: 0,
    width: 0
  })

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    resize();

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  const text: Variants = {
    initial: {
      opacity: 1
    },
    enter: {
      opacity: 0,
      top: -100,
      transition: {
        duration: .75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1]
      },
      transitionEnd: {
        top: '57.5%'
      }
    },
    exit: {
      opacity: 1,
      top: '50%',
      transition: {
        duration: .75,
        delay: 0.3,
        ease: [0.33, 1, 0.68, 1]
      },
    }
  }

  const routes = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'Home';
      case '/play':
        return 'Jouer'
      case '/dashboard':
        return 'Tableau de bord'
      default:
        return ''
    }
  }

  const container: Variants = {
    initial: {
      y: 200
    },
    enter: {
      y: 0,
      transition: AnimationTiming.easeInOutQuad(.3, .75)
    }
  }

  return (
    <div className={styles.curve} style={{ overflow: 'hidden'}}>
      <motion.p {...anim(text)} className={styles.route}>{routes(pathname)}</motion.p>
      <div style={{ opacity: dimensions.width > 0 ? 0 : 1 }} className={styles.background}>

      </div>
      {dimensions.width > 0 && <SVG {...dimensions} />}
      <motion.div {...anim(container)}>
        {children}
      </motion.div>
    </div>
  )
}

const SVG = ({ width, height }: WindowDimensions) => {

  const initialPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 300
  `;

  const targetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 300
  `;

  const curve: Variants = {
    initial: {
      d: initialPath
    },
    enter: {
      d: targetPath,
      transition: {
        duration: .75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    exit: {
      d: initialPath,
      transition: {
        duration: .75,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  }

  const slide: Variants = {
    initial: {
      top: '-300px'
    },
    enter: {
      top: '-100vh',
      transition: {
        duration: .75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1]
      },
      transitionEnd: {
        top: "100vh"
      }
    },
    exit: {
      top: '-300px',
      transition: {
        duration: .75,
        ease: [0.76, 0, 0.24, 1]
      },
    }
  }
  
  return (
    <motion.svg className={styles.curvesvg} key='svg' {...anim(slide)}>
      <motion.path key='path' {...anim(curve)}></motion.path>
    </motion.svg>
  )
}


export default Curve