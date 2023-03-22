import React, { ChangeEvent, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type NewCapitalState = {
  selectedOption?: string | null;
  suggestedOptions?: string[];
};

const NewCapitalContainer = styled.div`
  margin-top: 10vh;
  display: flex;
  justify-content: top;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    margin-top: 100px;
  }

  input,
  input:focus {
    background-color: inherit;
    color: ${(props) => props.theme.colors.primaryUltraLight};
    font-size: 32px;
    border-style: none none solid none;
    border-color: ${(props) => props.theme.colors.primary};
    border-width: 1px;
    border-radius: 0;
    outline: none;
    box-shadow: none;
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const ResultItem = styled.button`
  font-size: 32px;
  color: ${(props) => props.theme.colors.primary};
  background-color: inherit;
  border: none;
`;

const SaveButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: inherit;
  border: none;
  color: ${(props) => props.theme.colors.primaryLight};
  font-size: 20px;
  font-weight: 700;
`;

export default function NewCapital() {
  const navigate = useNavigate();
  const capitals = useLoaderData() as string[];
  const [state, setState] = useState<NewCapitalState>();
  const change = function changeSearchTerm(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    let count = 0;
    const searchTerm = event.target.value;
    const matcher = new RegExp(`${searchTerm}`, 'gi');
    setState({
      selectedOption: null,
      suggestedOptions: capitals.filter((c: string) => {
        if (!searchTerm || count > 8) return false;
        if (c.match(matcher)) {
          count += 1;
          return true;
        }
        return false;
      }),
    });
  };
  const generateResults = function generateResults(
    suggestedCapitals?: string[],
  ) {
    return suggestedCapitals?.map((c: string) => (
      <ResultItem
        type="button"
        onClick={(event) => {
          setState({
            selectedOption: event.currentTarget.textContent,
            suggestedOptions: state?.suggestedOptions,
          });
        }}
      >
        {c}
      </ResultItem>
    ));
  };
  return (
    <NewCapitalContainer>
      <input onChange={change} type="text" placeholder="Search..." />
      <ResultsContainer>
        {generateResults(state?.suggestedOptions)}
      </ResultsContainer>
      {state?.selectedOption && (
        <SaveButton
          type="button"
          onClick={() => {
            if (state?.selectedOption) {
              navigate(`/weather/${state.selectedOption}`, { replace: true });
            }
          }}
        >
          SAVE
        </SaveButton>
      )}
    </NewCapitalContainer>
  );
}
