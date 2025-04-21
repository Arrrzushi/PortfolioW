import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactContainer = styled.div`
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
  margin: 1.5rem auto 3rem;
  color: var(--text-secondary);
`;

const FormContainer = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  background: rgba(20, 20, 37, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 230, 255, 0.2);
  border-radius: 10px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 230, 255, 0.2);
    border-color: var(--accent-cyan);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--text-primary);
  font-family: var(--font-secondary);
  font-size: 1rem;
  letter-spacing: 1px;
`;

const Input = styled(motion.input)`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 230, 255, 0.3);
  border-radius: 5px;
  padding: 0.8rem 1rem;
  color: var(--text-primary);
  font-family: var(--font-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgba(0, 230, 255, 0.1);
  
  &:focus {
    outline: none;
    border-color: var(--accent-magenta);
    box-shadow: 0 0 10px rgba(255, 0, 200, 0.3);
  }
`;

const TextArea = styled(motion.textarea)`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 230, 255, 0.3);
  border-radius: 5px;
  padding: 0.8rem 1rem;
  color: var(--text-primary);
  font-family: var(--font-primary);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgba(0, 230, 255, 0.1);
  
  &:focus {
    outline: none;
    border-color: var(--accent-magenta);
    box-shadow: 0 0 10px rgba(255, 0, 200, 0.3);
  }
`;

const SubmitButton = styled(motion.button)`
  background: transparent;
  border: 2px solid var(--accent-cyan);
  border-radius: 5px;
  padding: 1rem 2rem;
  color: var(--accent-cyan);
  font-family: var(--font-secondary);
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: none;
  margin-top: 1rem;
  transition: all 0.3s ease;
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
    opacity: 0.2;
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

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 230, 255, 0.3);
  color: var(--text-primary);
  font-size: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgba(0, 230, 255, 0.1);
  
  &:hover {
    background: rgba(144, 0, 255, 0.2);
    border-color: var(--accent-purple);
    color: var(--accent-cyan);
    box-shadow: 0 0 15px rgba(144, 0, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(0, 230, 255, 0.1);
  border: 1px solid var(--accent-cyan);
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: var(--accent-cyan);
  text-align: center;
  box-shadow: var(--glow-cyan);
`;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission to a backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <ContactContainer>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Contact Me
      </Title>
      
      <SubTitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Let's create something amazing together! Feel free to reach out for collaborations or just to say hi.
      </SubTitle>
      
      <FormContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {isSubmitted && (
          <SuccessMessage
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            Thanks for your message! I'll get back to you soon.
          </SuccessMessage>
        )}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </FormGroup>
          
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </SubmitButton>
        </Form>
      </FormContainer>
      
      <SocialLinks
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <SocialLink 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fab fa-github"></i>
        </SocialLink>
        
        <SocialLink 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fab fa-linkedin-in"></i>
        </SocialLink>
        
        <SocialLink 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fab fa-twitter"></i>
        </SocialLink>
        
        <SocialLink 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fab fa-instagram"></i>
        </SocialLink>
      </SocialLinks>
    </ContactContainer>
  );
};

export default Contact; 