import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../store';

type HomeProps = {
  savedCapitals: string[];
};

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    margin-top: 100px;
  }

  & > a {
    font-size: 64px;
    font-weight: 900;
    color: ${(props) => props.theme.colors.secondary};
    text-decoration: none;
  }
`;

const SavedCapitalsList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    text-align: center;
    margin-bottom: 12px;

    a {
      font-weight: 700;
      font-size: 32px;
      color: ${(props) => props.theme.colors.primaryUltraLight};
      text-decoration: none;
    }
  }
`;

function Home(props: HomeProps) {
  const { savedCapitals } = props;
  return (
    <HomeContainer>
      <SavedCapitalsList>
        {savedCapitals.map((capital) => (
          <li>
            <Link to={`weather/${capital}`}>{capital}</Link>
          </li>
        ))}
      </SavedCapitalsList>
      <Link to="newCapital">+</Link>
    </HomeContainer>
  );
}

function mapStateToProps(state: AppState): HomeProps {
  return { savedCapitals: state.reducer.savedCapitals };
}

export default connect(mapStateToProps)(Home);
