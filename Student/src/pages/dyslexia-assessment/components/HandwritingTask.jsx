import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import { Upload, PenTool, Camera, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const HandwritingTask = ({ onComplete, taskNumber, totalTasks }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadMethod, setUploadMethod] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const writingPrompts = [
    "Describe your favorite place to visit and why you enjoy going there.",
    "Write about a time when you learned something new and challenging.",
    "Explain how you would teach someone to do something you're good at."
  ];

  const selectedPrompt = writingPrompts?.[Math.floor(Math.random() * writingPrompts?.length)];

  const handleFileSelect = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    setIsUploading(true);
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'application/pdf'];
    if (!validTypes?.includes(file?.type)) {
      alert('Please upload an image (JPG, PNG, HEIC) or PDF file.');
      setIsUploading(false);
      return;
    }

    // Validate file size (max 10MB)
    if (file?.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.');
      setIsUploading(false);
      return;
    }

    setUploadedFile(file);

    // Create preview URL for images
    if (file?.type?.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    setIsUploading(false);
  };

  const handleSubmit = () => {
    if (!uploadedFile) {
      alert('Please upload a handwriting sample before submitting.');
      return;
    }

    const results = {
      file: uploadedFile,
      fileName: uploadedFile?.name,
      fileSize: uploadedFile?.size,
      fileType: uploadedFile?.type,
      uploadMethod,
      prompt: selectedPrompt,
      uploadTime: Date.now()
    };

    onComplete(results);
  };

  const startTask = () => {
    setShowInstructions(false);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setUploadMethod(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  if (showInstructions) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-orange-900 mb-4">
            Handwriting Sample Instructions
          </h3>
          <div className="text-left text-orange-800 space-y-3">
            <p className="flex items-start space-x-2">
              <span className="font-semibold">✍️</span>
              <span>Write 3-4 sentences by hand on paper about the given topic</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">📱</span>
              <span>Take a clear photo of your handwriting or scan it</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">📤</span>
              <span>Upload the image using camera or file selection</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">💡</span>
              <span>Ensure good lighting and that all text is clearly visible</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="font-semibold">📏</span>
              <span>Write in your natural handwriting style</span>
            </p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-blue-800">
            <strong>Accepted formats:</strong> JPG, PNG, HEIC images or PDF files (max 10MB)
          </p>
        </div>
        <Button onClick={startTask} className="bg-orange-600 hover:bg-orange-700">
          Start Handwriting Task
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      {/* Writing Prompt */}
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl border-2 border-amber-200">
        <div className="flex items-center space-x-4 mb-6">
          <PenTool className="w-8 h-8 text-amber-600" />
          <h3 className="text-2xl font-bold text-amber-900">Writing Prompt</h3>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-amber-200">
          <p className="text-lg text-gray-800 font-medium leading-relaxed">
            "{selectedPrompt}"
          </p>
        </div>
        
        <div className="mt-4 text-amber-700">
          <p className="font-medium">Instructions:</p>
          <ul className="text-sm space-y-1 mt-2">
            <li>• Write 3-4 sentences responding to this prompt</li>
            <li>• Use pen or pencil on paper</li>
            <li>• Write in your natural handwriting style</li>
            <li>• Don't worry about perfect spelling or grammar</li>
          </ul>
        </div>
      </div>
      {/* Upload Section */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-200">
        <div className="flex items-center space-x-4 mb-6">
          <Upload className="w-8 h-8 text-blue-600" />
          <h3 className="text-2xl font-bold text-blue-900">Upload Your Handwriting</h3>
        </div>

        {!uploadedFile ? (
          <div className="space-y-6">
            {/* Upload Options */}
            <div className="grid md:grid-cols-2 gap-4">
              <motion.button
                onClick={() => {
                  setUploadMethod('camera');
                  cameraInputRef?.current?.click();
                }}
                className="p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Camera className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <h4 className="font-semibold text-blue-900 mb-2">Take Photo</h4>
                <p className="text-sm text-blue-700">Use your device's camera</p>
              </motion.button>

              <motion.button
                onClick={() => {
                  setUploadMethod('file');
                  fileInputRef?.current?.click();
                }}
                className="p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <h4 className="font-semibold text-blue-900 mb-2">Choose File</h4>
                <p className="text-sm text-blue-700">Select from your device</p>
              </motion.button>
            </div>

            {/* Hidden file inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />

            {isUploading && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-blue-600 mt-2">Processing file...</p>
              </div>
            )}
          </div>
        ) : (
          /* File Uploaded */
          (<div className="space-y-6">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">File uploaded successfully!</p>
                  <p className="text-sm text-green-700">
                    {uploadedFile?.name} ({(uploadedFile?.size / 1024 / 1024)?.toFixed(2)} MB)
                  </p>
                </div>
              </div>
            </div>
            {/* Preview */}
            {previewUrl && (
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Preview:</h4>
                <img 
                  src={previewUrl} 
                  alt="Handwriting sample preview" 
                  className="max-w-full h-auto rounded-lg border border-gray-300"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            )}
            {/* Actions */}
            <div className="flex space-x-4">
              <Button
                onClick={resetUpload}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Upload Different File
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Submit Handwriting Sample</span>
              </Button>
            </div>
          </div>)
        )}
      </div>
      {/* Tips */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              Tips for Best Results
            </h3>
            <ul className="text-yellow-800 space-y-2">
              <li>• Ensure good lighting when taking the photo</li>
              <li>• Keep the camera steady and at a good angle</li>
              <li>• Make sure all text is clearly visible and in focus</li>
              <li>• Include the entire writing sample in the image</li>
              <li>• Use dark ink on light paper for best contrast</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HandwritingTask;