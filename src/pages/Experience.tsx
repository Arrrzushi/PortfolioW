import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ExperienceContainer = styled.div`
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
    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple));
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

const TimelineWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  position: relative;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(50% - 1px);
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, var(--accent-cyan), var(--accent-magenta), var(--accent-purple));
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)<{ $isEven: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${props => props.$isEven ? 'flex-start' : 'flex-end'};
  margin-bottom: 5rem;
  padding-left: ${props => props.$isEven ? '0' : '50%'};
  padding-right: ${props => props.$isEven ? '50%' : '0'};
  position: relative;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 60px;
    padding-right: 0;
  }
`;

const TimelineContent = styled(motion.div)`
  background: rgba(20, 20, 37, 0.4);
  border: 1px solid rgba(0, 230, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 2rem;
  max-width: 450px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
  
  &:hover {
    border-color: var(--accent-magenta);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 0, 200, 0.2);
  }
`;

const TimelineDot = styled(motion.div)<{ $isEven: boolean }>`
  position: absolute;
  top: 20px;
  left: calc(50% - 15px);
  width: 30px;
  height: 30px;
  background: var(--accent-cyan);
  border-radius: 50%;
  box-shadow: var(--glow-cyan);
  z-index: 2;
  
  @media (max-width: 768px) {
    left: 5px;
  }
`;

const TimelineDate = styled.div`
  position: absolute;
  top: 20px;
  left: ${props => props.$isEven ? 'auto' : 'calc(50% + 25px)'};
  right: ${props => props.$isEven ? 'calc(50% + 25px)' : 'auto'};
  color: var(--accent-cyan);
  font-family: var(--font-secondary);
  font-size: 1rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    left: 45px;
    right: auto;
  }
`;

const JobTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const CompanyName = styled.h3`
  font-size: 1.2rem;
  color: var(--accent-magenta);
  margin-bottom: 1rem;
  font-weight: 500;
  text-shadow: var(--glow-magenta);
`;

const JobDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1rem;
`;

// Experience data
const experienceData = [
  {
    id: 1,
    jobTitle: '3D Modelling Intern',
    company: 'Light Vue',
    date: '2024',
    description: 'Designed and developed 3D assets and environments for virtual reality applications. Collaborated with a team of designers to create immersive user experiences.'
  },
  {
    id: 2,
    jobTitle: 'Freelance Designer',
    company: 'E-State Residency',
    date: '2021',
    description: 'Created digital marketing materials, website layouts, and user interface designs for real estate clients. Implemented responsive design principles and modern UI/UX practices.'
  },
  {
    id: 3,
    jobTitle: 'Social Media Handler',
    company: 'LEAD CLUB',
    date: '2020',
    description: 'Managed social media accounts across multiple platforms. Created engaging content that increased audience engagement by 35%. Developed content strategies that aligned with brand values.'
  }
];

const Experience: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  return (
    <ExperienceContainer>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My Experience
      </Title>
      
      <SubTitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        A timeline of my professional journey and career highlights.
      </SubTitle>
      
      <TimelineWrapper ref={ref}>
        {experienceData.map((experience, index) => {
          const isEven = index % 2 === 0;
          return (
            <TimelineItem
              key={experience.id}
              $isEven={isEven}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, x: isEven ? -50 : 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.3
                  }
                }
              }}
            >
              <TimelineContent
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <JobTitle>{experience.jobTitle}</JobTitle>
                <CompanyName>{experience.company}</CompanyName>
                <JobDescription>{experience.description}</JobDescription>
              </TimelineContent>
              
              <TimelineDot
                $isEven={isEven}
                initial={{ scale: 0 }}
                animate={controls}
                variants={{
                  hidden: { scale: 0 },
                  visible: {
                    scale: 1,
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      delay: index * 0.3 + 0.2
                    }
                  }
                }}
              />
              
              <TimelineDate $isEven={isEven}>{experience.date}</TimelineDate>
            </TimelineItem>
          );
        })}
      </TimelineWrapper>
    </ExperienceContainer>
  );
};

export default Experience; 