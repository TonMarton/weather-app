import React, { ChangeEvent, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

  &.selected {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCapital, setSelectedCapital] = useState<string | null>(null);
  const [suggestedCapitals, setSuggestedCapitals] = useState<string[]>([]);

  const findCapitals = function findMatchingCapitals(
    newSearchTerm: string,
  ): string[] {
    const matcher = new RegExp(`${newSearchTerm}`, 'gi');
    let count = 0;
    return capitals.filter((c: string) => {
      if (!newSearchTerm || count > 8) return false;
      if (c.match(matcher)) {
        count += 1;
        return true;
      }
      return false;
    });
  };

  const change = function changeSearchTerm(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const val = event.target.value;
    setSearchTerm(event.target.value);
    const newSuggestedCapitals = val !== '' ? findCapitals(val) : [];
    setSuggestedCapitals(newSuggestedCapitals);
    if (selectedCapital && !newSuggestedCapitals.includes(selectedCapital)) {
      setSelectedCapital(null);
    }
  };

  const buildResultItems = function buildSearchResultItems() {
    return suggestedCapitals.map((c: string) => (
      <ResultItem
        type="button"
        onClick={(event) => {
          setSelectedCapital(event.currentTarget.textContent);
        }}
        className={c === selectedCapital ? 'selected' : undefined}
        key={c}
      >
        {c}
      </ResultItem>
    ));
  };

  return (
    <NewCapitalContainer>
      <input onChange={change} type="text" placeholder="Search..." />
      <ResultsContainer>{searchTerm && buildResultItems()}</ResultsContainer>
      {selectedCapital && (
        <SaveButton
          type="button"
          onClick={() => {
            navigate(`/weather/${selectedCapital}`, { replace: true });
          }}
        >
          SAVE
        </SaveButton>
      )}
    </NewCapitalContainer>
  );
}
