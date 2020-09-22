import React, { FC } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { Button, ContainedButton } from '../../components/Button';
import ControlledSearchInput from '../../components/ControlledSearchInput';
import { HeaderContainer } from '../../components/HeaderContainer';
import { Logo } from '../../components/Logo';
import { TypographyVariants } from '../../components/Typography';
import { classNames } from '../../utils';
import ReactGA from 'react-ga';

// const LoginLinks: FC<{ className?: string }> = ({ className }) => {
//   const history = useHistory();
//   return (
//     <div className={classNames('LoginLinks', className)}>
//       <Button
//         variant={TypographyVariants.p}
//         onClick={(e) => history.push('/login')}
//       >
//         Login
//       </Button>
//       <ContainedButton
//         variant={TypographyVariants.p}
//         color="important0"
//         onClick={(e) => history.push('/create-account')}
//       >
//         Create Account
//       </ContainedButton>
//     </div>
//   );
// };

export const Header: FC = (props) => {
  return (
    <HeaderContainer className="HeaderContainer">
      <Link to="/" title="Home">
        <Logo />
      </Link>
      <Switch>
        <Route exact path="/"></Route>
        <Route>
          <ControlledSearchInput variant="window" />
        </Route>
      </Switch>
      {/* <LoginLinks /> */}
      <ReactGA.OutboundLink
        eventLabel="download"
        to="https://github.com/Arcia125/tempest-release/releases/latest/download/tempest-setup.exe"
        download
      >
        <ContainedButton variant={TypographyVariants.p} color="important0">
          Download
        </ContainedButton>
      </ReactGA.OutboundLink>
    </HeaderContainer>
  );
};
