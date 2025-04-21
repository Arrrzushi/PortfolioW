import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Create ProfilePhoto component
const ProfilePhoto = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const AboutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 6rem 1rem 2rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-primary);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-magenta));
    box-shadow: var(--glow-cyan);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin-top: 4rem;
  gap: 4rem;
  
  @media (max-width: 996px) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
`;

const TextContent = styled(motion.div)`
  flex: 1;
  max-width: 600px;
`;

const ModelContainer = styled(motion.div)`
  flex: 1;
  height: 400px;
  max-width: 400px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(45deg, var(--accent-cyan), var(--accent-magenta));
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 10;
    box-shadow: var(--glow-cyan);
  }
  
  @media (max-width: 996px) {
    width: 100%;
    height: 300px;
  }
`;

const Paragraph = styled(motion.p)`
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  margin-bottom: 1.5rem;
`;

const HighlightText = styled.span`
  color: var(--accent-cyan);
  font-weight: 700;
  text-shadow: var(--glow-cyan);
`;

const GlitchText = styled(motion.div)`
  font-family: var(--font-secondary);
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--accent-magenta);
  margin: 2rem 0;
  font-weight: 700;
  position: relative;
  display: inline-block;
  text-shadow: var(--glow-magenta);
  
  &::before, &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
  
  &::before {
    color: var(--accent-cyan);
    z-index: -1;
    animation: glitch-animation 2s infinite linear alternate-reverse;
    text-shadow: var(--glow-cyan);
  }
  
  &::after {
    color: var(--accent-purple);
    z-index: -2;
    animation: glitch-animation 3s infinite linear alternate-reverse;
    text-shadow: var(--glow-purple);
  }
  
  @keyframes glitch-animation {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-3px, 3px);
    }
    40% {
      transform: translate(-3px, -3px);
    }
    60% {
      transform: translate(3px, 3px);
    }
    80% {
      transform: translate(3px, -3px);
    }
    100% {
      transform: translate(0);
    }
  }
`;

const SkillsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
`;

const SkillTag = styled(motion.span)`
  background: rgba(144, 0, 255, 0.1);
  border: 1px solid var(--accent-purple);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: inline-block;
  box-shadow: var(--glow-purple);
`;

const skills = [
  'React', 'Three.js', 'TypeScript', 'GSAP', 'Framer Motion',
  'Node.js', 'Flutter', 'Firebase', 'UI/UX Design', '3D Modeling',
  'WebGL', 'Blender', 'Unity'
];

const About: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = "Blending Code & Creativity";
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  // Typewriter effect for the highlighted text
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <AboutContainer>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Me
      </Title>
      
      <ContentWrapper ref={ref}>
        <TextContent
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.8,
                delay: 0.2
              }
            }
          }}
        >
          <Paragraph>
            Hey there! I'm <HighlightText>Arushi</HighlightText>, a passionate developer and designer with a love for creating immersive digital experiences that blend technology with creativity.
          </Paragraph>
          
          <GlitchText data-text={typewriterText}>
            {typewriterText}
          </GlitchText>
          
          <Paragraph>
            I specialize in building interactive web applications and 3D experiences. My journey began with traditional web development, but I quickly became fascinated with the possibilities of creating more engaging and visually stunning interfaces.
          </Paragraph>
          
          <Paragraph>
            When I'm not coding, you can find me exploring new design trends, experimenting with 3D modeling, or playing around with game development in Unity. I believe in continuous learning and pushing the boundaries of what's possible in digital design.
          </Paragraph>
          
          <SkillsContainer
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.6
                }
              }
            }}
          >
            {skills.map((skill, index) => (
              <SkillTag
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </SkillTag>
            ))}
          </SkillsContainer>
        </TextContent>
        
        <ModelContainer
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: 0.4
              }
            }
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
          <ProfilePhoto>
            <img src="/assets/profile.jpg" alt="Arushi" />
          </ProfilePhoto>
        </ModelContainer>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About; 