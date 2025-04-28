import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const EducationContainer = styled.div`
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

const SubTitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  text-align: center;
  max-width: 800px;
  margin: 1.5rem auto 4rem;
  color: var(--text-secondary);
`;

const TimelineContainer = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    height: 100%;
    width: 2px;
    background: linear-gradient(to bottom, var(--accent-cyan), var(--accent-magenta));
    box-shadow: var(--glow-cyan);
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  width: 100%;
  position: relative;
  margin-bottom: 4rem;
  display: flex;
  
  &:nth-child(odd) {
    justify-content: flex-start;
    
    @media (max-width: 768px) {
      justify-content: flex-end;
    }
  }
  
  &:nth-child(even) {
    justify-content: flex-end;
    
    @media (max-width: 768px) {
      justify-content: flex-end;
    }
  }
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const TimelineContent = styled(motion.div)`
  width: 45%;
  padding: 2rem;
  background: rgba(20, 20, 37, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid var(--accent-cyan);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 230, 255, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 20px;
    height: 2px;
    background-color: var(--accent-magenta);
  }
  
  ${TimelineItem}:nth-child(odd) & {
    &::before {
      right: -20px;
      
      @media (max-width: 768px) {
        left: -20px;
      }
    }
  }
  
  ${TimelineItem}:nth-child(even) & {
    &::before {
      left: -20px;
    }
  }
  
  @media (max-width: 768px) {
    width: calc(100% - 50px);
    margin-left: 50px;
  }
  
  &:hover {
    border-color: var(--accent-magenta);
    box-shadow: 0 0 25px rgba(255, 0, 200, 0.2);
  }
`;

const TimelineDot = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--accent-cyan);
  box-shadow: 0 0 10px rgba(0, 230, 255, 0.5);
  z-index: 2;
  
  @media (max-width: 768px) {
    left: 20px;
  }
`;

const EducationTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const EducationInstitution = styled.h4`
  font-size: 1.2rem;
  color: var(--accent-cyan);
  margin-bottom: 0.5rem;
  text-shadow: var(--glow-cyan);
`;

const EducationLocation = styled.h5`
  font-size: 1rem;
  color: var(--accent-magenta);
  margin-bottom: 1rem;
  font-style: italic;
  font-weight: normal;
`;

const EducationPeriod = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(144, 0, 255, 0.1);
  border: 1px solid var(--accent-purple);
  border-radius: 20px;
  color: var(--text-primary);
  font-size: 0.9rem;
  margin-top: 1rem;
  box-shadow: var(--glow-purple);
`;

const Education: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <EducationContainer>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Education
      </Title>
      
      <SubTitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        My academic journey that has shaped my skills and knowledge.
      </SubTitle>
      
      <TimelineContainer
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
      >
        {/* Current Education */}
        <TimelineItem 
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, delay: 0.3 }
            }
          }}
        >
          <TimelineContent
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            <EducationTitle>B.Tech in Computer Science</EducationTitle>
            <EducationInstitution>Lovely Professional University</EducationInstitution>
            <EducationLocation>Phagwara, Punjab</EducationLocation>
            <EducationPeriod>Current</EducationPeriod>
          </TimelineContent>
          <TimelineDot 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </TimelineItem>
        
        {/* Diploma */}
        <TimelineItem 
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, delay: 0.5 }
            }
          }}
        >
          <TimelineContent
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            <EducationTitle>Diploma in Electrical Engineering</EducationTitle>
            <EducationInstitution>IIMT College of Engineering</EducationInstitution>
            <EducationLocation>Greater Noida</EducationLocation>
            <EducationPeriod>Completed</EducationPeriod>
          </TimelineContent>
          <TimelineDot 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ repeat: Infinity, duration: 2.5 }}
          />
        </TimelineItem>
        
        {/* Secondary School */}
        <TimelineItem 
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, delay: 0.7 }
            }
          }}
        >
          <TimelineContent
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            <EducationTitle>10th Standard</EducationTitle>
            <EducationInstitution>Modern Public School</EducationInstitution>
            <EducationLocation>Delhi</EducationLocation>
            <EducationPeriod>Completed</EducationPeriod>
          </TimelineContent>
          <TimelineDot 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ repeat: Infinity, duration: 3 }}
          />
        </TimelineItem>
      </TimelineContainer>
    </EducationContainer>
  );
};

export default Education; 