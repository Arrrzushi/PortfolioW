import {  useEffect, useRef  } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 1rem;
    text-align: center;
  }
`;

const HeroSection = styled.section`
  width: 100%;
  max-width: 1200px;
  min-height: calc(100vh - 8rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const WelcomeText = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 5rem);
  line-height: 1.2;
  margin-bottom: 2rem;
  
  span {
    display: block;
  }
  
  .highlight {
    color: var(--accent-magenta);
    text-shadow: var(--glow-magenta);
  }
  
  .gradient-text {
    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-magenta), var(--accent-purple));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 10px rgba(144, 0, 255, 0.5));
  }
`;

const IntroText = styled(motion.p)`
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  line-height: 1.6;
  max-width: 600px;
  margin-bottom: 3rem;
  color: var(--text-secondary);
`;

const CTAButton = styled(motion.a)`
  padding: 0.8rem 1.8rem;
  background: transparent;
  border: 1px solid var(--accent-cyan);
  border-radius: 4px;
  color: var(--accent-cyan);
  font-family: var(--font-secondary);
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: inline-block;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: var(--glow-cyan);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: var(--accent-cyan);
    opacity: 0.1;
    transition: width 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    color: white;
    border-color: var(--accent-magenta);
    box-shadow: var(--glow-magenta);
    
    &::before {
      width: 100%;
    }
  }
`;

const FloatingCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  z-index: -1;
  opacity: 0.4;
`;

const Home: React.FC = () => {
  const controls = useAnimation();
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const circle3Ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    controls.start('visible');
    
    // Animate floating circles with GSAP
    const circles = [circle1Ref.current, circle2Ref.current, circle3Ref.current];
    circles.forEach((circle, index) => {
      if (circle) {
        gsap.to(circle, {
          x: `random(-100, 100)`,
          y: `random(-100, 100)`,
          duration: 10 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    });
  }, [controls]);
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <HomeContainer>
      <HeroSection>
        <FloatingCircle
          ref={circle1Ref}
          style={{ 
            width: '300px', 
            height: '300px', 
            background: 'var(--accent-cyan)',
            top: '10%',
            right: '5%',
            opacity: 0.08
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2 }}
        />
        <FloatingCircle
          ref={circle2Ref}
          style={{ 
            width: '250px', 
            height: '250px', 
            background: 'var(--accent-magenta)',
            bottom: '15%',
            left: '10%',
            opacity: 0.05
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <FloatingCircle
          ref={circle3Ref}
          style={{ 
            width: '180px', 
            height: '180px', 
            background: 'var(--accent-purple)',
            top: '40%',
            left: '30%',
            opacity: 0.07
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.07 }}
          transition={{ duration: 2, delay: 1 }}
        />
        
        <WelcomeText
          custom={0}
          initial="hidden"
          animate={controls}
          variants={textVariants}
        >
          <span>Hey there! I'm</span>
          <span className="highlight">Arushi</span>
          <span className="gradient-text">developer. designer. creator.</span>
        </WelcomeText>
        
        <IntroText
          custom={1}
          initial="hidden"
          animate={controls}
          variants={textVariants}
        >
          A developer, designer & 3D creator blending code and creativity to build immersive digital experiences.
        </IntroText>
        
        <motion.div
          custom={2}
          initial="hidden"
          animate={controls}
          variants={textVariants}
        >
          <CTAButton 
            as={Link}
            to="/projects"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Projects
          </CTAButton>
        </motion.div>
      </HeroSection>
    </HomeContainer>
  );
};

export default Home; 