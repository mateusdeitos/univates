import React from 'react';
import {
  Label,
  Container,
  ImageItem,
  ImageContainer,
  ImageAction,
  ImageActionIcon,
} from './styles';

interface ImageGridProps {
  images: string[];
  onDelete(image: string): void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onDelete }) => {
  return (
    <>
      <Label>Fotos</Label>
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
