import React from 'react';
import { useAxiosPrivate } from '../../../hooks';

interface EvaluationData {
  studentId: string;
  courseId: string;
  evaluations: any;
}

const SaveEvaluation: React.FC<{ data: EvaluationData }> = ({ data }) => {
  const api = useAxiosPrivate();

  const saveEvaluation = async () => {
    try {
      await api.post('/professors/evaluations', data);
      console.log('Evaluations saved successfully!');
    } catch (error) {
      console.error('Error saving evaluations:', error);
    }
  };

  React.useEffect(() => {
    saveEvaluation();
  }, [data]);

  return null;
};

export default SaveEvaluation;
