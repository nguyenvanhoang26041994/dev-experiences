import styled from 'styled-components';

export const DemoWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;

  .what-dev-need,
  .the-anwser {
    display: flex;
    justify-content: center;
  }

  .what-dev-need {
    text-align: center;
  }

  .the-anwser {
    margin: 20px 0;
    padding: 50px 0;
    font-size: 48px;
  }
`;
