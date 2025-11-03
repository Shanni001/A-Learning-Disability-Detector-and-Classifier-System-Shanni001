import React, { useState, useEffect } from 'react';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const ConditionalFieldRenderer = ({ 
  selectedRole, 
  onFieldChange, 
  validationErrors = {},
  formData = {}
}) => {
  const [kenyanSchools, setKenyanSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock Kenyan schools data - in production, this would come from an API
  const mockKenyanSchools = [
    { value: 'nairobi-primary', label: 'Nairobi Primary School', region: 'Nairobi' },
    { value: 'mombasa-academy', label: 'Mombasa Academy', region: 'Mombasa' },
    { value: 'kisumu-elementary', label: 'Kisumu Elementary School', region: 'Kisumu' },
    { value: 'nakuru-primary', label: 'Nakuru Primary School', region: 'Nakuru' },
    { value: 'eldoret-academy', label: 'Eldoret Academy', region: 'Eldoret' },
    { value: 'thika-primary', label: 'Thika Primary School', region: 'Kiambu' },
    { value: 'machakos-elementary', label: 'Machakos Elementary', region: 'Machakos' },
    { value: 'nyeri-primary', label: 'Nyeri Primary School', region: 'Nyeri' }
  ];

  const gradeOptions = [
    { value: 'grade-1', label: 'Grade 1' },
    { value: 'grade-2', label: 'Grade 2' },
    { value: 'grade-3', label: 'Grade 3' },
    { value: 'grade-4', label: 'Grade 4' },
    { value: 'grade-5', label: 'Grade 5' },
    { value: 'grade-6', label: 'Grade 6' },
    { value: 'grade-7', label: 'Grade 7' },
    { value: 'grade-8', label: 'Grade 8' }
  ];

  const subjectOptions = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'english', label: 'English Language' },
    { value: 'kiswahili', label: 'Kiswahili' },
    { value: 'science', label: 'Science' },
    { value: 'social-studies', label: 'Social Studies' },
    { value: 'creative-arts', label: 'Creative Arts' },
    { value: 'physical-education', label: 'Physical Education' }
  ];

  useEffect(() => {
    if (selectedRole === 'teacher') {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setKenyanSchools(mockKenyanSchools);
        setLoading(false);
      }, 500);
    }
  }, [selectedRole]);

  const handleFieldChange = (fieldName, value) => {
    if (onFieldChange) {
      onFieldChange(fieldName, value);
    }
  };

  if (!selectedRole) return null;

  return (
    <div className="space-y-4 transition-educational">
      {selectedRole === 'student' && (
        <>
          <Input
            label="Age"
            type="number"
            placeholder="Enter your age"
            value={formData?.age || ''}
            onChange={(e) => handleFieldChange('age', e?.target?.value)}
            error={validationErrors?.age}
            min="6"
            max="18"
            required
          />
          
          <Select
            label="Grade Level"
            placeholder="Select your grade"
            options={gradeOptions}
            value={formData?.grade || ''}
            onChange={(value) => handleFieldChange('grade', value)}
            error={validationErrors?.grade}
            description="Select your current grade level"
            id="grade"
            name="grade"
            required
          />

          <Input
            label="Parent/Guardian Name"
            type="text"
            placeholder="Enter parent or guardian name"
            value={formData?.parentName || ''}
            onChange={(e) => handleFieldChange('parentName', e?.target?.value)}
            error={validationErrors?.parentName}
            required
          />

          <Input
            label="Parent/Guardian Phone"
            type="tel"
            placeholder="e.g., +254 700 000 000"
            value={formData?.parentPhone || ''}
            onChange={(e) => handleFieldChange('parentPhone', e?.target?.value)}
            error={validationErrors?.parentPhone}
            required
          />
        </>
      )}
      {selectedRole === 'teacher' && (
        <>
          <Select
            label="School"
            placeholder="Select your school"
            options={kenyanSchools}
            value={formData?.school || ''}
            onChange={(value) => handleFieldChange('school', value)}
            error={validationErrors?.school}
            loading={loading}
            searchable
            description="Select your school from the list"
            id="school"
            name="school"
            required
          />

          <Input
            label="Teacher ID Number"
            type="text"
            placeholder="Enter your teacher identification number"
            value={formData?.teacherId || ''}
            onChange={(e) => handleFieldChange('teacherId', e?.target?.value)}
            error={validationErrors?.teacherId}
            required
          />

          <Select
            label="Primary Subject"
            placeholder="Select your primary teaching subject"
            options={subjectOptions}
            value={formData?.primarySubject || ''}
            onChange={(value) => handleFieldChange('primarySubject', value)}
            error={validationErrors?.primarySubject}
            description="Select your primary teaching subject"
            id="primarySubject"
            name="primarySubject"
            required
          />

          <Select
            label="Grade Levels Taught"
            placeholder="Select grade levels you teach"
            options={gradeOptions}
            value={formData?.gradeLevels || []}
            onChange={(value) => handleFieldChange('gradeLevels', value)}
            error={validationErrors?.gradeLevels}
            multiple
            description="Select all grade levels you teach"
            id="gradeLevels"
            name="gradeLevels"
            required
          />

          <Input
            label="Years of Experience"
            type="number"
            placeholder="Enter years of teaching experience"
            value={formData?.experience || ''}
            onChange={(e) => handleFieldChange('experience', e?.target?.value)}
            error={validationErrors?.experience}
            min="0"
            max="50"
            required
          />
        </>
      )}
    </div>
  );
};

export default ConditionalFieldRenderer;