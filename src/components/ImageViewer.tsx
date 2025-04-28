import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ViewerContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  max-width: 90%;
  max-height: 85%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 230, 255, 0.3);
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
`;

const CloseButtonWrapper = styled(motion.div)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled(motion.h2)`
  color: var(--text-primary);
  font-size: 1.8rem;
  margin-top: 1.5rem;
  text-align: center;
  max-width: 800px;
`;

// Map of project IDs to image info
const projectImages = {
  robot: {
    src: '/assets/profile.jpg',
    title: 'Robot Character'
  },
  cafe: {
    src: '/assets/profile.jpg',
    title: 'Cozy Cafe Scene'
  },
  granny: {
    src: '/assets/profile.jpg',
    title: 'Granny Character'
  }
};

const ImageViewer: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [imageData, setImageData] = useState<{src: string, title: string} | null>(null);
  
  useEffect(() => {
    if (id && projectImages[id as keyof typeof projectImages]) {
      setImageData(projectImages[id as keyof typeof projectImages]);
    } else {
      // If invalid ID, go back to projects
      navigate('/projects');
    }
  }, [id, navigate]);
  
  const handleClose = () => {
    navigate('/projects');
  };
  
  return (
    <AnimatePresence>
      {imageData && (
        <ViewerContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CloseButtonWrapper 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <CloseButton onClick={handleClose}>
              ✕
            </CloseButton>
          </CloseButtonWrapper>
          
          <ImageContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Image src={imageData.src} alt={imageData.title} />
          </ImageContainer>
          
          <Title
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {imageData.title}
          </Title>
        </ViewerContainer>
      )}
    </AnimatePresence>
  );
};

export default ImageViewer; 