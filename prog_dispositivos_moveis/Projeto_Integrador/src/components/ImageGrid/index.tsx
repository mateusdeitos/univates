import React from 'react';
import { View } from 'react-native';
import { Label, Container, ImageItem } from './styles';

interface ImageGridProps {
  images: string[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <>
      <Label>Fotos</Label>
      <Container>
        {images.map(uri => (
          <ImageItem
            key={uri}
            source={{ uri }}
            style={{ width: 100, height: 100 }}
          />
        ))}
      </Container>
    </>
  );
};

export default ImageGrid;
