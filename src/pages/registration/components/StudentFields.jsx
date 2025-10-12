import React from 'react';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const StudentFields = ({ formData, onFieldChange, validationErrors }) => {
  const gradeOptions = [
    { value: 'grade-1', label: 'Grade 1', description: 'Ages 6-7' },
    { value: 'grade-2', label: 'Grade 2', description: 'Ages 7-8' },
    { value: 'grade-3', label: 'Grade 3', description: 'Ages 8-9' },
    { value: 'grade-4', label: 'Grade 4', description: 'Ages 9-10' },
    { value: 'grade-5', label: 'Grade 5', description: 'Ages 10-11' },
    { value: 'grade-6', label: 'Grade 6', description: 'Ages 11-12' },
    { value: 'grade-7', label: 'Grade 7', description: 'Ages 12-13' },
    { value: 'grade-8', label: 'Grade 8', description: 'Ages 13-14' }
  ];

  const kenyanSchools = [
    { value: 'nairobi-primary', label: 'Nairobi Primary School', description: 'Nairobi County' },
    { value: 'mombasa-academy', label: 'Mombasa Academy', description: 'Mombasa County' },
    { value: 'kisumu-elementary', label: 'Kisumu Elementary School', description: 'Kisumu County' },
    { value: 'nakuru-primary', label: 'Nakuru Primary School', description: 'Nakuru County' },
    { value: 'eldoret-academy', label: 'Eldoret Academy', description: 'Uasin Gishu County' },
    { value: 'thika-primary', label: 'Thika Primary School', description: 'Kiambu County' },
    { value: 'machakos-elementary', label: 'Machakos Elementary', description: 'Machakos County' },
    { value: 'nyeri-primary', label: 'Nyeri Primary School', description: 'Nyeri County' },
    { value: 'meru-academy', label: 'Meru Academy', description: 'Meru County' },
    { value: 'kitale-primary', label: 'Kitale Primary School', description: 'Trans Nzoia County' },
    { value: 'garissa-elementary', label: 'Garissa Elementary', description: 'Garissa County' },
    { value: 'kakamega-primary', label: 'Kakamega Primary School', description: 'Kakamega County' }
  ];

  const handleInputChange = (field) => (e) => {
    onFieldChange(field, e?.target?.value);
  };

  return (
    <div className="space-y-4">
      <Input
        label="Age"
        type="number"
        placeholder="Enter your age"
        value={formData?.age || ''}
        onChange={handleInputChange('age')}
        error={validationErrors?.age}
        min="6"
        max="18"
        description="Student age for appropriate content delivery"
        required
      />
      <Select
        label="Grade Level"
        placeholder="Select your current grade"
        options={gradeOptions}
        value={formData?.grade || ''}
        onChange={(value) => onFieldChange('grade', value)}
        error={validationErrors?.grade}
        description="Your current academic grade level"
        id="grade"
        name="grade"
        required
      />
      <Select
        label="School"
        placeholder="Select your school"
        options={kenyanSchools}
        value={formData?.school || ''}
        onChange={(value) => onFieldChange('school', value)}
        error={validationErrors?.school}
        description="Your current primary school"
        id="school"
        name="school"
        searchable
        required
      />
      <Input
        label="Parent/Guardian Name"
        type="text"
        placeholder="Enter parent or guardian name"
        value={formData?.parentName || ''}
        onChange={handleInputChange('parentName')}
        error={validationErrors?.parentName}
        description="Primary contact person for your account"
        required
      />
      <Input
        label="Parent/Guardian Phone"
        type="tel"
        placeholder="+254 700 000 000"
        value={formData?.parentPhone || ''}
        onChange={handleInputChange('parentPhone')}
        error={validationErrors?.parentPhone}
        description="Contact number for account notifications"
        required
      />
    </div>
  );
};

export default StudentFields;