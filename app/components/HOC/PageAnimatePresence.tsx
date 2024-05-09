'use client';
import { anim, AnimationTiming } from '@/app/utils/anim';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import styles from '../layout/Curve.module.css';

interface WindowDimensions {
  width: number,
  height: number
}

interface PageAnimatePresenceProps {
  children: ReactNode
}

const FrozenRoute = ({ children }: PageAnimatePresenceProps) => {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  return <LayoutRouterContext.Provider value={frozen}>{children}</LayoutRouterContext.Provider>
}

const PageAnimatePresence = ({ children }: PageAnimatePresenceProps) => {
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

  const variants: Variants = {
    initial: { opacity: 0, y: 100 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };

  return (
    <>
            {children}
    </>
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

export default PageAnimatePresence