import React from 'react';
import { QuestionList } from './QuestionList';
import { getUnansweredQuestions, QuestionData } from './QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { Question } from './Question';

export const HomePage = () => {
  const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  const [questionsLoading, setQuestionsLoading] = React.useState(true);
  // Хук useEffect - функция, позволяющая выполнить побочный
  // эфект, например полусить данные. Функция принимает 2 параметра
  // 1 - функция для выполнения
  // 2 - определяет когда длжна быть выполнена функция (1 парам.)
  // 2 парам - массив переменных, изменение которого приводит к
  // выполнению фуекций первого параметра
  // Если массив пуст, то функция будет вызываться только один раз
  // в момент отрисовки
  React.useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
  }, []);

  return (
    <Page>
      <div>
        <PageTitle>Unanswered Questions</PageTitle>
        <button>Ask a question</button>
      </div>
      {questionsLoading ? (
        <div>Loading...</div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  );
};
