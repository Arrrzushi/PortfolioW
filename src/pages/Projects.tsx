import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, Environment } from '@react-three/drei';

// Project Card Component with 3D elements
const ProjectContainer = styled.div`
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

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 3rem;
  width: 100%;
  max-width: 1200px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(20, 20, 37, 0.4);
  border: 1px solid rgba(0, 230, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 1.5rem;
  height: 450px;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    border-color: var(--accent-magenta);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 0, 200, 0.2);
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background: rgba(0, 230, 255, 0.1);
  color: var(--accent-cyan);
  font-size: 0.8rem;
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 230, 255, 0.2);
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const ProjectLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--accent-cyan);
  color: var(--accent-cyan);
  font-size: 0.9rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: var(--glow-cyan);
  
  &:hover {
    background: rgba(0, 230, 255, 0.1);
    border-color: var(--accent-magenta);
    color: var(--accent-magenta);
    box-shadow: var(--glow-magenta);
  }
`;

// Simple 3D models for projects
const ModelViewer: React.FC<{ modelType: string }> = ({ modelType }) => {
  // This is a placeholder component
  // In a real implementation, you'd import actual models
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff00c8" />
      
      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
        snap
        speed={1.5}
        zoom={0.8}
      >
        {modelType === 'phone' && (
          <mesh scale={[1.5, 3, 0.1]} position={[0, 0, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="#00e6ff" metalness={0.8} roughness={0.2} />
          </mesh>
        )}
        
        {modelType === 'web' && (
          <mesh scale={[3, 2, 0.1]} position={[0, 0, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="#9000ff" metalness={0.7} roughness={0.2} />
          </mesh>
        )}
        
        {modelType === 'game' && (
          <group position={[0, 0, 0]}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="#ff00c8" metalness={0.5} roughness={0.3} />
            </mesh>
            <mesh position={[2, 0, 0]} scale={0.5}>
              <torusGeometry args={[1, 0.3, 16, 32]} />
              <meshStandardMaterial color="#00e6ff" metalness={0.5} roughness={0.3} />
            </mesh>
          </group>
        )}
        
        {modelType === 'design' && (
          <group position={[0, 0, 0]}>
            <mesh position={[-1, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#9000ff" metalness={0.5} roughness={0.3} />
            </mesh>
            <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#00e6ff" metalness={0.5} roughness={0.3} />
            </mesh>
          </group>
        )}
      </PresentationControls>
      
      <Environment preset="city" />
    </Canvas>
  );
};

// Project data
const projectsData = [
  {
    id: 1,
    title: 'Social Media Sharing App',
    description: 'A cross-platform mobile application for sharing moments and connecting with friends, built with Flutter and Firebase.',
    tags: ['Flutter', 'Firebase', 'Dart', 'Cloud Storage'],
    modelType: 'phone',
    links: [
      { title: 'Demo', url: '#' },
      { title: 'GitHub', url: '#' }
    ]
  },
  {
    id: 2,
    title: 'Web3 Complaint Portal',
    description: 'A decentralized platform for submitting and tracking public complaints using blockchain technology.',
    tags: ['React', 'MetaMask', 'TSX', 'Solidity'],
    modelType: 'web',
    links: [
      { title: 'Live', url: '#' },
      { title: 'GitHub', url: '#' }
    ]
  },
  {
    id: 3,
    title: 'LPUTouch Redesign',
    description: 'A complete UI/UX overhaul of the university portal to enhance user experience and accessibility.',
    tags: ['React', 'Expo', 'JSON', 'UI/UX'],
    modelType: 'design',
    links: [
      { title: 'Live', url: '#' },
      { title: 'GitHub', url: '#' }
    ]
  },
  {
    id: 4,
    title: 'Unity Game Projects',
    description: 'A collection of 3D game experiments created with Unity and Blender, focusing on interactive environments.',
    tags: ['Unity', 'Blender', 'C#', '3D Modeling'],
    modelType: 'game',
    links: [
      { title: 'Play', url: '#' },
      { title: 'GitHub', url: '#' }
    ]
  }
];

const Projects: React.FC = () => {
  return (
    <ProjectContainer>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My Projects
      </Title>
      
      <SubTitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Explore my portfolio of digital creations spanning web, mobile, and 3D experiences.
      </SubTitle>
      
      <ProjectsGrid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <ProjectImage>
              <ModelViewer modelType={project.modelType} />
            </ProjectImage>
            
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              
              <ProjectTags>
                {project.tags.map((tag, i) => (
                  <Tag key={i}>{tag}</Tag>
                ))}
              </ProjectTags>
              
              <ProjectDescription>{project.description}</ProjectDescription>
              
              <ProjectLinks>
                {project.links.map((link, i) => (
                  <ProjectLink
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.title}
                  </ProjectLink>
                ))}
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectContainer>
  );
};

export default Projects; 