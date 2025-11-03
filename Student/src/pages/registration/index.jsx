import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationContainer from 'components/ui/AuthenticationContainer';
import FormNavigation from 'components/ui/FormNavigation';
import RegistrationForm from './components/RegistrationForm';

const Registration = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticationContainer screenType="registration">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Create Your Account
            </h2>
            <p className="text-sm text-muted-foreground">
              Join the Abacus Learning Portal and start your educational journey
            </p>
          </div>

          <RegistrationForm />

          <FormNavigation
            currentScreen="registration"
            onNavigate={handleNavigation}
          />
        </div>
      </AuthenticationContainer>
    </div>
  );
};

export default Registration;