import React, { FC } from 'react';

import './Typography.css';
import { createClassNameGenerator } from '../createClassNameGenerator';
import { theme } from '../theme';

export enum TypographyVariants {
  h1 = 'header1',
  h2 = 'header2',
  h3 = 'header3',
  p = 'paragraph',
  xs = 'xs',
}

export interface Props {
  id?: string;
  className?: string;
  variant: TypographyVariants;
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase';
  color?: keyof typeof theme.colors;
  Component?: React.ElementType;
}

const classNameGenerator = createClassNameGenerator('Typography');

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
  id,
  className,
  variant,
  textTransform,
  color = 'eggshell',
  Component: PropsComponent,
  children,
}) => {
  const { Component: VariantComponent, props } = variantConfigs[variant];
  const Component = PropsComponent || VariantComponent;
  const classNames: string[] = [props.className];
  if (textTransform) classNames.push(textTransform);
  if (color) classNames.push(color);
  return (
    <Component
      {...props}
      className={classNameGenerator(className, ...classNames)}
      id={id}
    >
      {children}
    </Component>
  );
};

Typography.defaultProps = {
  variant: TypographyVariants.p,
};

export default Typography;
