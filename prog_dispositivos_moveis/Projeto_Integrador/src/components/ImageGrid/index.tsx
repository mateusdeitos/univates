import React from 'react';
import {
  Container,
  ImageItem,
  ImageContainer,
  ImageAction,
  ImageActionIcon,
} from './styles';
import { colors } from '../../styles/global';
import Label from '../Label';

interface ImageGridProps {
  images: string[];
  onDelete(image: string): void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onDelete }) => {
  return (
    <>
      <Label text="Fotos" labelColor={colors.primaryColor} />

      <Container>
        {images.map(uri => (
          <ImageContainer key={uri}>
            <ImageItem source={{ uri }} />
            <ImageAction onPress={() => onDelete(uri)}>
              <ImageActionIcon size={15} name="trash" />
            </ImageAction>
          </ImageContainer>
        ))}
      </Container>
    </>
  );
};

export default ImageGrid;
