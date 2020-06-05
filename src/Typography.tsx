import React, { FC } from 'react';

import './Typography.css';

export enum TypographyVariants {
  h1 = 'header1',
  h2 = 'header2',
  h3 = 'header3',
  p = 'paragraph',
  xs = 'xs',
}

export interface Props {
  variant: TypographyVariants;
  Component?: React.ElementType;
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase';
}

const className = 'Typography';

const createClassName = (...addedNames: string[]) =>
  `${className} ${className}-${addedNames.join(` ${className}-`)}`;

const variantConfigs: Record<
  TypographyVariants,
  { Component: React.ElementType; props: { className: string } }
> = {
  [TypographyVariants.h1]: {
    Component: 'h1',
    props: {
      className: 'header1',
    },
  },
  [TypographyVariants.h2]: {
    Component: 'h2',
    props: {
      className: 'header2',
    },
  },
  [TypographyVariants.h3]: {
    Component: 'h3',
    props: {
      className: 'header3',
    },
  },
  [TypographyVariants.p]: {
    Component: 'p',
    props: {
      className: 'paragraph',
    },
  },
  [TypographyVariants.xs]: {
    Component: 'p',
    props: {
      className: 'xs',
    },
  },
};

const Typography: FC<Props> = ({
  variant,
  Component: PropsComponent,
  textTransform,
  children,
}) => {
  const { Component: VariantComponent, props } = variantConfigs[variant];
  const Component = PropsComponent || VariantComponent;
  const classNames: string[] = [props.className];
  if (textTransform) {
    classNames.push(textTransform);
  }
  return (
    <Component {...props} className={createClassName(...classNames)}>
      {children}
    </Component>
  );
};

Typography.defaultProps = {
  variant: TypographyVariants.p,
};

export default Typography;
