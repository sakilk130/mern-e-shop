import React from 'react';
import { Helmet } from 'react-helmet';

interface IProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const Meta: React.FC<IProps> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};
Meta.defaultProps = {
  title: 'Welcome To E-Shop',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electroincs',
};

export default Meta;
