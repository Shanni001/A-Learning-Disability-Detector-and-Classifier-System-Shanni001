import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';

const AuthFooter = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/registration');
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">
            New to Abacus Learning Portal?
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        size="lg"
        fullWidth
        onClick={handleCreateAccount}
        iconName="UserPlus"
        iconPosition="left"
      >
        Create Account
      </Button>
      <div className="text-center text-xs text-muted-foreground space-y-2">
        <p>© {new Date()?.getFullYear()} Abacus Learning Portal</p>
        <p>Empowering education across Kenya</p>
      </div>
    </div>
  );
};

export default AuthFooter;