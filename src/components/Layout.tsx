import React from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import styled from 'styled-components';
import chevronLeft from '../assets/chevron-left.png';
import LoadingSpinner from './LoadingSpinner';

const BackButton = styled.button`
  background-color: inherit;
  filter: invert(52%) sepia(20%) saturate(1305%) hue-rotate(148deg)
    brightness(96%) contrast(82%);
  border: none;
`;

const Header = styled.header`
  position: absolute;
`;

export default function Layout() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  return (
    <>
      {navigation.state === 'loading' && <LoadingSpinner />}
      <Header>
        {location.pathname !== '/' && (
          <BackButton
            type="button"
            disabled={navigation.state === 'loading'}
            onClick={() => navigate(-1)}
          >
            <img src={chevronLeft} alt="Navigate back" />
          </BackButton>
        )}
      </Header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
