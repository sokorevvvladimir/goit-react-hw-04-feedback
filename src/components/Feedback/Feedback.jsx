import { useState } from 'react';
import styled from 'styled-components';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';

const CenteredDiv = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const Feedback = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onClick = name => {
    switch (name) {
      case 'good':
        setGood(prevState => {
          return prevState + 1;
        });
        break;

      case 'neutral':
        setNeutral(prevState => {
          return prevState + 1;
        });
        break;

      case 'bad':
        setBad(prevState => {
          return prevState + 1;
        });
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    const values = [good, neutral, bad];
    return values.reduce((acc, value) => {
      return acc + value;
    }, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const res = (good / total) * 100;
    return Number.isNaN(res) ? 0 : Math.round(res);
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();
  const options = ['good', 'neutral', 'bad'];

  return (
    <CenteredDiv>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onClick} />
      </Section>
      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </CenteredDiv>
  );
};

export default Feedback;
