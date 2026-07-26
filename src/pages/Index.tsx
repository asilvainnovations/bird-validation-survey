import React from 'react';
import AppLayout from '@/components/AppLayout';
import SurveyWizard from '@/components/strategic/SurveyWizard';

const Index: React.FC = () => {
  return (
    <AppLayout>
      <SurveyWizard />
    </AppLayout>
  );
};

export default Index;