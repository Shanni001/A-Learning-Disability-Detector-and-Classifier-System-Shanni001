import React from 'react';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const TeacherFields = ({ formData, onFieldChange, validationErrors }) => {
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

  const subjectOptions = [
    { value: 'mathematics', label: 'Mathematics', description: 'Primary mathematics curriculum' },
    { value: 'english', label: 'English Language', description: 'English language and literature' },
    { value: 'kiswahili', label: 'Kiswahili', description: 'Kiswahili language and literature' },
    { value: 'science', label: 'Science', description: 'Integrated science curriculum' },
    { value: 'social-studies', label: 'Social Studies', description: 'History, geography, and civics' },
    { value: 'creative-arts', label: 'Creative Arts', description: 'Art, music, and drama' },
    { value: 'physical-education', label: 'Physical Education', description: 'Sports and physical activities' }
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

  const handleInputChange = (field) => (e) => {
    onFieldChange(field, e?.target?.value);
  };

  return (
    <div className="space-y-4">
      <Select
        id="school"
        name="school"
        label="School"
        placeholder="Select your school"
        options={kenyanSchools}
        value={formData?.school || ''}
        onChange={(value) => onFieldChange('school', value)}
        error={validationErrors?.school}
        description="Your current teaching institution"
        searchable
        required
      />
      <Input
        label="Teacher ID Number"
        type="text"
        placeholder="Enter your teacher identification number"
        value={formData?.teacherId || ''}
        onChange={handleInputChange('teacherId')}
        error={validationErrors?.teacherId}
        description="Official teacher registration number"
        required
      />
      <Select
        id="primarySubject"
        name="primarySubject"
        label="Primary Subject"
        placeholder="Select your primary teaching subject"
        options={subjectOptions}
        value={formData?.primarySubject || ''}
        onChange={(value) => onFieldChange('primarySubject', value)}
        error={validationErrors?.primarySubject}
        description="Your main area of teaching expertise"
        required
      />
      <Select
        id="gradeLevels"
        name="gradeLevels"
        label="Grade Levels Taught"
        placeholder="Select grade levels you teach"
        options={gradeOptions}
        value={formData?.gradeLevels || []}
        onChange={(value) => onFieldChange('gradeLevels', value)}
        error={validationErrors?.gradeLevels}
        description="All grade levels you currently teach"
        multiple
        required
      />
      <Input
        label="Years of Experience"
        type="number"
        placeholder="Enter years of teaching experience"
        value={formData?.experience || ''}
        onChange={handleInputChange('experience')}
        error={validationErrors?.experience}
        min="0"
        max="50"
        description="Total years of professional teaching experience"
        required
      />
    </div>
  );
};

export default TeacherFields;