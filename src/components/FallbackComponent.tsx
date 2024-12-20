import { storyblokEditable } from '@storyblok/react/rsc';

const FallbackComponent = ({ blok }: any) => {
  return (
    <h2 data-cy="fallback" {...storyblokEditable(blok)}>
      This component does not exists: {blok.component }
    </h2>
  );
};

export default FallbackComponent;
