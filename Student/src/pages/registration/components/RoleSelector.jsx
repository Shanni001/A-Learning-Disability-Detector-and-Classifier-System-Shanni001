import React from 'react';
import Select from 'components/ui/Select';

const RoleSelector = ({ selectedRole, onRoleChange, error }) => {
  const roleOptions = [
    { 
      value: 'student', 
      label: 'Student',
      description: 'Primary school student learning '
    },
    { 
      value: 'teacher', 
      label: 'Teacher',
      description: 'Educational professional teaching'
    }
  ];

  return (
    <Select
      id="role-selector"
      name="role"
      label="I am a"
      description="Select your role to customize your registration experience"
      placeholder="Choose your role"
      options={roleOptions}
      value={selectedRole}
      onChange={onRoleChange}
      error={error}
      required
      className="mb-6"
    />
  );
};

export default RoleSelector;